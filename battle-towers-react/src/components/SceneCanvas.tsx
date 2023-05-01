import { useEffect, useContext, useState, useRef } from 'react';
import { AppContext, AppContextType } from './AppContext';
import { Log, Mouse } from '../types';
import { ContextMenu, GamePart, GameResult, LogType, NewTower } from '../enums';
import styles from './../assets/scss/modules/SceneCanvas.module.scss';
import Enemy from './classes/enemies/Enemy';
import Tower from './classes/towers/Tower';
import PlacementTile from './classes/PlacementTile';
import Scene from './classes/Scene';
import Player from './classes/Player';
import fillPlacementTiles from './scripts/fillPlacementTiles';
import spawnEnemies from './scripts/spawnEnemies';
// import { getWave, updateEnemies, updatePlacementTiles, updateTower } from './scripts/updateCanvas';
import TransitionInfo from './features/TransitionInfo';
import Cannon from './classes/towers/Cannon';
import Minigun from './classes/towers/Minigun';
import MissileLauncher from './classes/towers/MissileLauncher';
import NewTowerMenu from './features/gameMenus/NewTowerMenu';
import UpgradeTowerMenu from './features/gameMenus/UpgradeTowerMenu';


const SceneCanvasTest = () => {

  const { setWave, setLevel, setWorld, setLife, setMoney, setScore, setEndGame, endGame, logs } = useContext(AppContext) as AppContextType;
  const [init, setInit] = useState<boolean>(false);
  const [info, setInfo] = useState<string>('');
  const [time, setTime] = useState<number>(3);
  const [contextMenuPosition, setContextMenuPosition] = useState<Mouse>({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const [newTower, setNewTower] = useState<NewTower | null>(null);
  const [activePlacementTile, setActivePlacementTile] = useState<PlacementTile | null>(null);
  const [context2D, setContext2D] = useState<CanvasRenderingContext2D | null>(null);
  const [towers, setTowers] = useState<Tower[]>([]);
  // const [placementTiles,setPlacementTiles] = useState<PlacementTile[]>([]);
  const canvasBounding = {
    width: 1280,
    height: 768,
  }

  const mouse: Mouse = { x: 0, y: 0 };
  let enemies: Enemy[] = [];
  let activeTile: PlacementTile | null = null;
  let placementTiles: PlacementTile[] = [];
  let scene: Scene;
  let player: Player;
  let animationID: number;

  const initialize = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas!.getContext('2d');
    if (!ctx || !canvas) return;
    setContext2D(ctx);
    canvas.width = canvasBounding.width;
    canvas.height = canvasBounding.height;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player = new Player();
    scene = new Scene();
    setLife(player.getLife());
    setMoney(player.getMoney());
    setScore(player.getScore());
    setWave(scene.getWave());
    setLevel(scene.getLevel());
    setWorld(scene.getWorldName());
    placementTiles = fillPlacementTiles(ctx, scene);
    const image = new Image();
    image.src = scene.getCurrentMap();
    image.onload = () => { animate(); }
    enemies = spawnEnemies(ctx, scene);
  }

  const checkPlacement = (activeTile: PlacementTile) => {
    setActivePlacementTile(activeTile);
    if (!activeTile.getOccupied()) setContextMenu(ContextMenu.NEW_TOWER);
    else setContextMenu(ContextMenu.UPGRADE_TOWER);
  }

  const addNewTower = () => {

    if (activePlacementTile && context2D) {
      if (newTower === NewTower.CANNON) towers.push(new Cannon(context2D, { x: activePlacementTile.getPosition().x, y: activePlacementTile.getPosition().y }));
      else if (newTower === NewTower.MINIGUN) towers.push(new Minigun(context2D, { x: activePlacementTile.getPosition().x, y: activePlacementTile.getPosition().y }));
      else if (newTower === NewTower.MISSILE) towers.push(new MissileLauncher(context2D, { x: activePlacementTile.getPosition().x, y: activePlacementTile.getPosition().y }));
      setContextMenu(ContextMenu.NONE);
      setNewTower(null);
      addToLogs('Tower has been placed!', LogType.SUCCESS);
      // console.log(towers.length);
      // activePlacementTile.setOccupied(true);
    }


    // activeTile.setOccupied(true);
    // player.setMoney(player.getMoney() - 50);
    // setMoney(player.getMoney());
    // } else addToLogs('Not enough money!', LogType.FAILURE);

  }

  const upgradeTower = () => { }

  const placementClicked = () => {
    if (activeTile) {
      setContextMenuPosition({ x: mouse.x, y: mouse.y });
      checkPlacement(activeTile);
    } else {
      setContextMenuPosition({ x: 0, y: 0 });
      setContextMenu(ContextMenu.NONE);
    }
  }

  const addToLogs = (content: string, type: LogType) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour12: false });
    logs.push({ content: content, type: type, time: timeString })
  }

  const mouseMove = (event: MouseEvent) => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const canvasTopOffset = canvas.getBoundingClientRect().top;
    const canvasLeftOffset = canvas.getBoundingClientRect().left;
    mouse.x = event.clientX - canvasLeftOffset;
    mouse.y = event.clientY - canvasTopOffset;
    activeTile = null;
    for (let i = 0; i < placementTiles.length; i++) {
      const tile = placementTiles[i];
      if (
        mouse.x > tile.getPosition().x &&
        mouse.x < tile.getPosition().x + tile.getSize() &&
        mouse.y > tile.getPosition().y &&
        mouse.y < tile.getPosition().y + tile.getSize()
      ) {
        activeTile = tile;
        break;
      }
    }
  }

  const animate = () => {
    animationID = requestAnimationFrame(animate);
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const ctx = canvas!.getContext('2d');
    const image = new Image();
    image.src = scene.getCurrentMap();
    if (!ctx) return;
    ctx.drawImage(image, 0, 0);
    updateTower(towers, enemies);
    updateEnemies(enemies);
    updatePlacementTiles(placementTiles, mouse);
  }

  const updateEnemies = (enemies: Enemy[]) => {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      enemy.update();
      decreasePlayerLife(enemy, i);
    }
  }

  const updatePlacementTiles = (placementTiles: PlacementTile[], mouse: Mouse) => {
    placementTiles.forEach(tile => tile.update(mouse));
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
        bullet.getEnemy().decreaseHealth(20);
        tower.getBullets().splice(i, 1);
        if (bullet.getEnemy().getHealth() <= 0) {
          const enemyIndex = enemies.findIndex((enemy) => {
            return bullet.getEnemy() === enemy;
          });
          if (enemyIndex > -1) {
            enemies.splice(enemyIndex, 1);
            player.setMoney(player.getMoney() + 20);
            player.setScore(player.getScore() + 8);
            setScore(player.getScore());
            setMoney(player.getMoney());
          }
        }
        if (enemies.length === 0) increaseWave();
      }
    }
  }

  const gameTransition = (part: GamePart) => {
    if (player.getLife() <= 0) return;
    cancelAnimationFrame(animationID);
    setInfo(part);
    setIsInfoVisible(true);
    setTimeout(() => {
      setIsInfoVisible(false);
      animationID = requestAnimationFrame(animate);
      if (part === GamePart.WAVE) {
        setWave(scene.getWave());
        addToLogs('Next Wave!', LogType.SUCCESS);
      }
      else if (part === GamePart.LEVEL) {
        setMoney(player.getMoney());
        setLevel(scene.getLevel());
        setWave(1);
        addToLogs('Next Level!', LogType.SUCCESS);
      } else if (part === GamePart.WORLD) {
        setWave(1);
        setLevel(1);
        setWorld(scene.getWorldName());
        setLife(player.getLife());
        setMoney(player.getMoney());
        addToLogs('Next World!', LogType.SUCCESS);
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
    if (scene.getWave() >= 3) increaseLevel(ctx);
    else {
      scene.setWave(scene.getWave() + 1);
      gameTransition(GamePart.WAVE);
    }
    enemies = spawnEnemies(ctx, scene);
  }

  const increaseLevel = (ctx: CanvasRenderingContext2D) => {
    if (scene.getLevel() >= 3) changeWorld(ctx);
    else {
      scene.setLevel(scene.getLevel() + 1);
      towers.splice(0, towers.length);
      placementTiles.splice(0, placementTiles.length);
      activeTile = null;
      placementTiles = fillPlacementTiles(ctx, scene);
      scene.setWave(1);
      player.setMoney(player.getMoney() + 100);
      gameTransition(GamePart.LEVEL);
    }
  }

  const changeWorld = (ctx: CanvasRenderingContext2D) => {
    if (scene.getWorld() >= scene.getWorldsLength()) {
      setEndGame(GameResult.WIN);
      player.setScore(player.getLife() * 100);
      setScore(player.getScore());
      gameReset();
    } else {
      scene.setWave(1);
      scene.setLevel(1);
      scene.setWorld(scene.getWorld() + 1);
      towers.splice(0, towers.length);
      placementTiles.splice(0, placementTiles.length);
      activeTile = null;
      placementTiles = fillPlacementTiles(ctx, scene);
      player.setLife(player.getLife() + 3);
      player.setMoney(player.getMoney() + 200);
      gameTransition(GamePart.WORLD);
    }
  }

  const gameReset = () => {
    cancelAnimationFrame(animationID);
    scene.setWave(1);
    scene.setLevel(1);
    scene.setWorld(1);
    setWave(1);
    setLevel(1);
    setWorld(scene.getWorldName());
  }

  const decreasePlayerLife = (enemy: Enemy, index: number) => {
    const worldData = scene.getCurrentWorldData();
    if (enemy.getWaypointIndex() === worldData.waypoints.length - 1) {
      player.setLife(player.getLife() - 1);
      addToLogs('Lost life!', LogType.FAILURE);
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
    setInit(true);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('click', placementClicked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (init) {

      window.addEventListener('click', placementClicked);
      window.addEventListener('mousemove', mouseMove);
      initialize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init]);

  useEffect(() => {
    if (newTower !== null) addNewTower();
  }, [newTower]);

  useEffect(() => {
    // if (contextMenu === ContextMenu.NONE) {
    // window.addEventListener('mousemove', mouseMove);
    // setContextMenuPosition({ x: 0, y: 0 });
    // console.log('elo');
    // }
    console.log(contextMenu);
  }, [contextMenu]);
  return (
    <div className={styles.canvasWrapper}>
      {isInfoVisible && <TransitionInfo info={info} time={time} />}
      {contextMenu === ContextMenu.NEW_TOWER && <NewTowerMenu contextMenuPosition={contextMenuPosition} setNewTower={setNewTower} />}
      {contextMenu === ContextMenu.UPGRADE_TOWER && <UpgradeTowerMenu contextMenuPosition={contextMenuPosition} />}
      <canvas className={styles.sceneCanvas}></canvas>
    </div>
  );
}

export default SceneCanvasTest;