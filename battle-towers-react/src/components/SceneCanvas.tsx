import { useEffect, useContext, useState, useRef } from 'react';
import { AppContext, AppContextType } from './AppContext';
import { Log, Mouse } from '../types';
import { ContextMenu, GamePart, GameResult, LogType, NewTower } from '../enums';
import styles from './../assets/scss/modules/SceneCanvas.module.scss';
import Enemy from './classes/enemies/Enemy';
import Tower from './classes/towers/Tower';
import Substructure from './classes/Substructure';
import Scene from './classes/Scene';
import Player from './classes/Player';
import fillSubstructures from './scripts/fillSubstructures';
import spawnEnemies from './scripts/spawnEnemies';
// import { getWave, updateEnemies, updatesubstructures, updateTower } from './scripts/updateCanvas';
import TransitionInfo from './features/TransitionInfo';
import Cannon from './classes/towers/Cannon';
import Minigun from './classes/towers/Minigun';
import MissileLauncher from './classes/towers/Missile';
import NewTowerMenu from './features/gameMenus/NewTowerMenu';
import UpgradeTowerMenu from './features/gameMenus/UpgradeTowerMenu';
import addToLogs from './scripts/addToLogs';


const SceneCanvas = () => {

  const { setWave, setLevel, setWorld, setLife, setMoney, setScore, setEndGame, logs } = useContext(AppContext) as AppContextType;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context2D, setContext2D] = useState<CanvasRenderingContext2D | null>(null);

  const [init, setInit] = useState<boolean>(false);
  const [info, setInfo] = useState<string>('');
  const [time, setTime] = useState<number>(3);
  const [contextMenuPosition, setContextMenuPosition] = useState<Mouse>({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const [newTower, setNewTower] = useState<NewTower | null>(null);
  const [currentSubstructure, setCurrentSubstructure] = useState<Substructure | null>(null);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [scene, setScene] = useState<Scene>(new Scene());
  const [substructures, setSubstructures] = useState<Substructure[]>([]);
  const [clickedTower, setClickedTower] = useState<Tower | null>(null);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [player, setPlayer] = useState<Player>(new Player());

  const canvasBounding = {
    width: 1280,
    height: 768,
  }

  const mouse: Mouse = { x: 0, y: 0 };
  // let enemies: Enemy[] = [];
  let activeSubstructure: Substructure | null = null;
  // let substructures: PlacementTile[] = [];
  // let scene: Scene;
  // let player: Player;
  let animationID: number;

  const initialize = () => {
    canvasRef.current!.width = canvasBounding.width;
    canvasRef.current!.height = canvasBounding.height;
    context2D!.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    // player = new Player();
    // scene = new Scene();
    setLife(player.getLife());
    setMoney(player.getMoney());
    setScore(player.getScore());
    setWave(scene!.getWave());
    setLevel(scene!.getLevel());
    setWorld(scene!.getWorldName());
    setSubstructures(fillSubstructures(context2D!, scene!));
    setEnemies(spawnEnemies(context2D!, scene!));
  }

  const checkPlacement = (activeSubstructure: Substructure) => {
    setCurrentSubstructure(activeSubstructure);
    if (!activeSubstructure.getOccupied()) setContextMenu(ContextMenu.NEW_TOWER);
    else {
      const tower = towers.filter((tower) => tower.getPosition().x === activeSubstructure.getPosition().x && tower.getPosition().y === activeSubstructure.getPosition().y);
      setClickedTower(tower[0]);
      setContextMenu(ContextMenu.UPGRADE_TOWER);
    }
  }

  const addNewTower = () => {
    let tower: Tower | null = null;
    if (currentSubstructure && context2D) {
      if (newTower === NewTower.CANNON) tower = new Cannon(context2D, { x: currentSubstructure.getPosition().x, y: currentSubstructure.getPosition().y });
      else if (newTower === NewTower.MINIGUN) tower = new Minigun(context2D, { x: currentSubstructure.getPosition().x, y: currentSubstructure.getPosition().y });
      else if (newTower === NewTower.MISSILE) tower = new MissileLauncher(context2D, { x: currentSubstructure.getPosition().x, y: currentSubstructure.getPosition().y });
      if (tower) {
        if (tower?.getMoney() < player.getMoney()) {
          player.setMoney(player.getMoney() - tower!.getMoney());
          setMoney(player.getMoney());
          towers.push(tower!);
          setContextMenu(ContextMenu.NONE);
          setNewTower(null);
          addToLogs(logs, `${tower?.getName()} has been placed!`, LogType.SUCCESS);
          currentSubstructure.setOccupied(true);
          setCurrentSubstructure(null);
        } else addToLogs(logs, 'Not enough money!', LogType.FAILURE);
      }
    }
  }

  const placementClicked = () => {
    if (activeSubstructure) {
      setContextMenuPosition({ x: mouse.x, y: mouse.y });
      checkPlacement(activeSubstructure);
    } else {
      setContextMenuPosition({ x: 0, y: 0 });
      setContextMenu(ContextMenu.NONE);
    }
  }

  const mouseMove = (event: MouseEvent) => {
    const canvasTopOffset = canvasRef.current!.getBoundingClientRect().top;
    const canvasLeftOffset = canvasRef.current!.getBoundingClientRect().left;
    mouse.x = event.clientX - canvasLeftOffset;
    mouse.y = event.clientY - canvasTopOffset;
    activeSubstructure = null;
    for (let i = 0; i < substructures.length; i++) {
      const tile = substructures[i];
      if (
        mouse.x > tile.getPosition().x &&
        mouse.x < tile.getPosition().x + tile.getSize() &&
        mouse.y > tile.getPosition().y &&
        mouse.y < tile.getPosition().y + tile.getSize()
      ) {
        activeSubstructure = tile;
        break;
      }
    }
  }

  const animate = () => {
    animationID = requestAnimationFrame(animate);
    const image = new Image();
    image.src = scene!.getCurrentMap();
    context2D!.drawImage(image, 0, 0);
    updateTower(towers, enemies);
    updateEnemies(enemies);
    updateSubstructures(substructures, mouse);
  }

  const updateEnemies = (enemies: Enemy[]) => {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      enemy.update();
      decreasePlayerLife(enemy, i);
    }
  }

  const updateSubstructures = (substructures: Substructure[], mouse: Mouse) => {
    substructures.forEach(substructure => substructure.update(mouse));
  }

  const updateTower = (towers: Tower[], enemies: Enemy[]) => {
    towers.forEach(tower => {
      tower.update();
      tower.setTarget(null);
      const validEnemies = enemies.filter(enemy => {
        const xDifference = (enemy.getPosition().x + enemy.getBounding().width / 2) - tower.getPosition().x - tower.getSize() / 2;
        const yDifference = (enemy.getPosition().y + enemy.getBounding().height / 2) - tower.getPosition().y - tower.getSize() / 2;
        const distance = Math.hypot(xDifference, yDifference);
        return distance < enemy.getBounding().radius + tower.getRadius();
      });
      tower.setTarget(validEnemies[0]);
      updateBullet(tower, enemies);
    });
  }

  const updateBullet = (tower: Tower, enemies: Enemy[]) => {
    for (let i = tower.getBullets().length - 1; i >= 0; i--) {
      const bullet = tower.getBullet(i);
      bullet.update();
      const xDifference = (bullet.getEnemy().getPosition().x + bullet.getEnemy().getBounding().width / 2) - bullet.getPosition().x;
      const yDifference = (bullet.getEnemy().getPosition().y + bullet.getEnemy().getBounding().height / 2) - bullet.getPosition().y;
      const distance = Math.hypot(xDifference, yDifference);
      if (distance < bullet.getEnemy().getBounding().radius) {
        bullet.getEnemy().decreaseHealth(tower.getDamage());
        tower.getBullets().splice(i, 1);
        if (bullet.getEnemy().getHealth() <= 0) {
          const enemyIndex = enemies.findIndex((enemy) => {
            return bullet.getEnemy() === enemy;
          });
          if (enemyIndex > -1) {
            const targetedEnemy = enemies[enemyIndex];
            enemies.splice(enemyIndex, 1);
            addToLogs(logs, `${targetedEnemy.getName()} has been eliminated!`, LogType.SUCCESS);
            player.setMoney(player.getMoney() + targetedEnemy.getMoney());
            player.setScore(player.getScore() + targetedEnemy.getScore());
            setScore(player.getScore());
            setMoney(player.getMoney());
          }
        }
        if (enemies.length === 0) increaseWave();
      }
    }
  }

  const gameTransition = (part: GamePart) => {
    // console.log(enemies.length);
    if (player.getLife() <= 0) return;
    cancelAnimationFrame(animationID);
    setInfo(part);
    setIsInfoVisible(true);
    setTimeout(() => {
      setIsInfoVisible(false);
      animationID = requestAnimationFrame(animate);
      if (part === GamePart.WAVE) {
        setWave(scene!.getWave());
        addToLogs(logs, 'Next Wave!', LogType.SUCCESS);
      } else if (part === GamePart.LEVEL) {
        setMoney(player.getMoney());
        setLevel(scene!.getLevel());
        setWave(1);
        addToLogs(logs, 'Next Level!', LogType.SUCCESS);
      } else if (part === GamePart.WORLD) {
        setWave(1);
        setLevel(1);
        setWorld(scene!.getWorldName());
        setLife(player.getLife());
        setMoney(player.getMoney());
        addToLogs(logs, 'Next World!', LogType.SUCCESS);
      }
    }, 4000);

    let index = 3;
    const interval = setInterval(() => {
      if (index === 0) {
        clearInterval(interval);
        setTime(3);
      }
      else {
        index--;
        setTime(index);
      }
    }, 1000);
  }

  const increaseWave = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas!.getContext('2d');
    if (!ctx) return;
    if (scene!.getWave() >= 3) increaseLevel(ctx);
    else {
      scene!.setWave(scene!.getWave() + 1);

    }
    setEnemies(spawnEnemies(context2D!, scene!));
  }

  const increaseLevel = (ctx: CanvasRenderingContext2D) => {
    if (scene!.getLevel() >= 3) changeWorld(ctx);
    else {
      scene!.setLevel(scene!.getLevel() + 1);
      setTowers([]);
      activeSubstructure = null;
      setSubstructures(fillSubstructures(context2D!, scene!))
      scene!.setWave(1);
      player.setMoney(player.getMoney() + 100);
      gameTransition(GamePart.LEVEL);
    }
  }

  const changeWorld = (ctx: CanvasRenderingContext2D) => {
    if (scene!.getWorld() >= scene!.getWorldsLength()) {
      setEndGame(GameResult.WIN);
      player.setScore(player.getLife() * 100);
      setScore(player.getScore());
      gameReset();
    } else {
      scene!.setWave(1);
      scene!.setLevel(1);
      scene!.setWorld(scene!.getWorld() + 1);
      towers.splice(0, towers.length);
      activeSubstructure = null;
      setSubstructures(fillSubstructures(context2D!, scene!))
      player.setLife(player.getLife() + 3);
      player.setMoney(player.getMoney() + 200);
      gameTransition(GamePart.WORLD);
    }
  }

  const gameReset = () => {
    cancelAnimationFrame(animationID);
    scene!.setWave(1);
    scene!.setLevel(1);
    scene!.setWorld(1);
    setWave(1);
    setLevel(1);
    setWorld(scene!.getWorldName());
  }

  const decreasePlayerLife = (enemy: Enemy, index: number) => {
    const worldData = scene!.getCurrentWorldData();
    if (enemy.getWaypointIndex() === worldData.waypoints.length - 1) {
      player.setLife(player.getLife() - 1);
      addToLogs(logs, 'Lost life!', LogType.FAILURE);
      setLife(player.getLife());
      enemies.splice(index, 1);
      if (player.getLife() <= 0) {
        setEndGame(GameResult.DEFEAT);
        gameReset();
      }
      if (enemies.length === 0) increaseWave();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');
    setContext2D(ctx);
    setInit(true);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('click', placementClicked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // setScene();
    // console.log(object);
    if (init) initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init]);

  useEffect(() => {
    if (init && substructures.length !== 0) {
      const image = new Image();
      image.src = scene!.getCurrentMap();
      image.onload = () => { animate(); }
      window.addEventListener('click', placementClicked);
      window.addEventListener('mousemove', mouseMove);
    }
  }, [init, substructures]);

  useEffect(() => {
    if (newTower !== null) addNewTower();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTower]);



  return (
    <div className={styles.canvasWrapper}>
      {isInfoVisible && <TransitionInfo info={info} time={time} />}
      {contextMenu === ContextMenu.NEW_TOWER && <NewTowerMenu contextMenuPosition={contextMenuPosition} setNewTower={setNewTower} />}
      {contextMenu === ContextMenu.UPGRADE_TOWER &&
        <UpgradeTowerMenu
          contextMenuPosition={contextMenuPosition}
          currentSubstructure={currentSubstructure}
          towers={towers}
          currentTower={clickedTower}
          player={player}
        />
      }
      <canvas ref={canvasRef} className={styles.sceneCanvas}></canvas>
    </div>
  );
}

export default SceneCanvas;