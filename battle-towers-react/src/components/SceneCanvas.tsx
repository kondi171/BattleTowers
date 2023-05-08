import { useEffect, useContext, useState, useRef } from 'react';
import { AppContext, AppContextType } from './AppContext';

import { Mouse } from '../types';
import { ContextMenu, GamePart, GameResult, LogType, CanvasBounding } from '../enums';

import styles from './../assets/scss/modules/SceneCanvas.module.scss';

import Enemy from './classes/enemies/Enemy';
import Tower from './classes/towers/Tower';
import Substructure from './classes/Substructure';
import Scene from './classes/Scene';
import Player from './classes/Player';

import fillSubstructures from './scripts/fillSubstructures';
import spawnEnemies from './scripts/spawnEnemies';
import addToLogs from './scripts/addToLogs';
import mouseMove from './scripts/mouseMove';

import TransitionInfo from './features/TransitionInfo';
import NewTowerMenu from './features/gameMenus/NewTowerMenu';
import UpgradeTowerMenu from './features/gameMenus/UpgradeTowerMenu';
import Sprite from './classes/Sprite';
import cannonExplosion from './../assets/img/towers/explosions/cannon_explosion.png';
import Explosion from './classes/Explosion';

const numberOfEnemies = 6;

const SceneCanvas = () => {

  const { setWave, setLevel, setWorld, setLife, setMoney, setScore, setEndGame, logs, setLogs } = useContext(AppContext) as AppContextType;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null!);

  const [context2D, setContext2D] = useState<CanvasRenderingContext2D | null>(null);

  const [initCanvas, setInitCanvas] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [info, setInfo] = useState('');
  const [time, setTime] = useState(3);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const [contextMenuPosition, setContextMenuPosition] = useState<Mouse>({ x: -1000, y: 0 });
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [clickedTower, setClickedTower] = useState<Tower | null>(null);
  const [mousePosition, setMousePosition] = useState<Mouse>({ x: 0, y: 0 });
  const [mousePositionChanged, setMousePositionChanged] = useState(false);

  const [towers, setTowers] = useState<Tower[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);

  const [substructures, setSubstructures] = useState<Substructure[]>([]);
  const [currentSubstructure, setCurrentSubstructure] = useState<Substructure | null>(null);

  const [scene, setScene] = useState<Scene | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  const [gamePart, setGamePart] = useState<GamePart | null>(null);

  let activeSubstructure: Substructure | null = null;

  const initialize = () => {
    canvasRef.current!.width = CanvasBounding.WIDTH;
    canvasRef.current!.height = CanvasBounding.HEIGHT;
    context2D!.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    setLife(player!.getLife());
    setMoney(player!.getMoney());
    setScore(player!.getScore());
    setWave(scene!.getWave());
    setLevel(scene!.getLevel());
    setWorld(scene!.getWorldName());
    setSubstructures(fillSubstructures(context2D!, scene!));
    setEnemies(spawnEnemies(context2D!, scene!));
    setIsInitialized(true);
  }

  const checkSubstructure = (activeSubstructure: Substructure) => {
    setCurrentSubstructure(activeSubstructure);
    if (!activeSubstructure.getOccupied()) setContextMenu(ContextMenu.NEW_TOWER);
    else {
      const tower = towers.filter((tower) => tower.getPosition().x === activeSubstructure.getPosition().x && tower.getPosition().y === activeSubstructure.getPosition().y);
      setClickedTower(tower[0]);
      setContextMenu(ContextMenu.UPGRADE_TOWER);
    }
  }

  const placementClicked = () => {
    for (let i = 0; i < substructures.length; i++) {
      const tile = substructures[i];
      if (
        mousePosition.x > tile.getPosition().x &&
        mousePosition.x < tile.getPosition().x + tile.getSize() &&
        mousePosition.y > tile.getPosition().y &&
        mousePosition.y < tile.getPosition().y + tile.getSize()
      ) {
        activeSubstructure = tile
        break;
      }
    }
    if (activeSubstructure) {
      setContextMenuPosition({ x: mousePosition.x, y: mousePosition.y });
      checkSubstructure(activeSubstructure);
    } else {
      setContextMenuPosition({ x: -1000, y: 0 });
      setContextMenu(ContextMenu.NONE);
    }
  }

  const animate = () => {
    // console.log(explosions.length);
    animationRef.current = requestAnimationFrame(animate);
    const image = new Image();
    image.src = scene!.getCurrentMap();
    context2D!.drawImage(image, 0, 0);
    updateTower();
    updateEnemies();
    updateSubstructures();
    updateExplosions();
  }

  const updateEnemies = () => {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      enemy.update();
      decreasePlayerLife(enemy, i);
    }
  }

  const updateSubstructures = () => {
    // console.log(mousePosition);
    // const image = new Image();
    // image.src = scene!.getCurrentMap();
    // context2D!.drawImage(image, 0, 0);
    substructures.forEach(substructure => substructure.update(mousePosition));
  }

  const updateTower = () => {
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
        explosions.push(new Explosion(
          context2D!,
          { x: bullet.getEnemy().getPosition().x, y: bullet.getEnemy().getPosition().y },
          tower.getExplosionImg(),
          { max: tower.getMaxExplosionFrames() })
        );
        tower.getBullets().splice(i, 1);
        if (bullet.getEnemy().getHealth() <= 0) {
          const enemyIndex = enemies.findIndex((enemy) => {
            return bullet.getEnemy() === enemy;
          });
          if (enemyIndex > -1) {
            const targetedEnemy = enemies[enemyIndex];
            enemies.splice(enemyIndex, 1);
            addToLogs(logs, `${targetedEnemy.getName()} has been eliminated!`, LogType.SUCCESS);
            player!.setMoney(player!.getMoney() + targetedEnemy.getMoney());
            player!.setScore(player!.getScore() + targetedEnemy.getScore());
            setScore(player!.getScore());
            setMoney(player!.getMoney());
          }
        }
        if (enemies.length === 0) increaseWave();
      }
    }
  }
  const updateExplosions = () => {
    for (let i = explosions.length - 1; i >= 0; i--) {
      const explosion = explosions[i];
      explosion.update();
      if (explosion.getFrames().current >= explosion.getFrames().max - 1) explosions.splice(i, 1);
    }
  }

  const gameTransition = (part: GamePart) => {
    if (player!.getLife() <= 0) return;
    setInfo(part);
    setIsInfoVisible(true);
    setTimeout(() => {
      setIsInfoVisible(false);
      console.log('animate1');
      animate();
      if (part === GamePart.WAVE) {
        setWave(scene!.getWave());
        addToLogs(logs, 'Next Wave!', LogType.SUCCESS);
      } else if (part === GamePart.LEVEL) {
        setMoney(player!.getMoney());
        setLevel(scene!.getLevel());
        setWave(1);
        addToLogs(logs, 'Next Level!', LogType.SUCCESS);
      } else if (part === GamePart.WORLD) {
        setWave(1);
        setLevel(1);
        setWorld(scene!.getWorldName());
        setLife(player!.getLife());
        setMoney(player!.getMoney());
        addToLogs(logs, 'Next World!', LogType.SUCCESS);
      }
    }, 4000);

    let index = 3;
    const interval = setInterval(() => {
      if (index === 0) {
        clearInterval(interval);
        setTime(3);
      } else {
        index--;
        setTime(index);
      }
    }, 1000);
    setGamePart(null);
  }

  const gameReset = () => {
    cancelAnimationFrame(animationRef.current);
    scene!.setWave(1);
    scene!.setLevel(1);
    scene!.setWorld(1);
    setWave(1);
    setLevel(1);
    setWorld(scene!.getWorldName());
    logs.slice(0, logs.length);
    setLogs([]);
  }

  const decreasePlayerLife = (enemy: Enemy, index: number) => {
    const worldData = scene!.getCurrentWorldData();
    if (enemy.getWaypointIndex() === worldData.waypoints.length - 1) {
      player!.setLife(player!.getLife() - 1);
      addToLogs(logs, 'Lost life!', LogType.FAILURE);
      setLife(player!.getLife());
      enemies.splice(index, 1);
      if (player!.getLife() <= 0) {
        setEndGame(GameResult.DEFEAT);
        gameReset();
      }
      if (enemies.length === 0) increaseWave();
    }
  }

  const increaseWave = () => {
    if (scene!.getWave() >= 3) increaseLevel();
    else {
      setGamePart(GamePart.WAVE);
      scene!.setWave(scene!.getWave() + 1);
      setEnemies(spawnEnemies(context2D!, scene!));
    }
  }

  const increaseLevel = () => {
    if (scene!.getLevel() >= 3) changeWorld();
    else {
      setGamePart(GamePart.LEVEL);
      scene!.setLevel(scene!.getLevel() + 1);
      towers.splice(0, towers.length);
      setTowers([]);
      setEnemies(spawnEnemies(context2D!, scene!));
      activeSubstructure = null;
      setSubstructures(fillSubstructures(context2D!, scene!))
      scene!.setWave(1);
      player!.setMoney(player!.getMoney() + 100);
    }
  }

  const changeWorld = () => {
    if (scene!.getWorld() >= scene!.getWorldsLength()) {
      setEndGame(GameResult.WIN);
      player!.setScore(player!.getLife() * 100);
      setScore(player!.getScore());
      gameReset();
    } else {
      setGamePart(GamePart.WORLD);
      scene!.setWave(1);
      scene!.setLevel(1);
      scene!.setWorld(scene!.getWorld() + 1);
      towers.splice(0, towers.length);
      setTowers([]);
      activeSubstructure = null;
      setSubstructures(fillSubstructures(context2D!, scene!));
      setEnemies(spawnEnemies(context2D!, scene!));
      player!.setLife(player!.getLife() + 3);
      player!.setMoney(player!.getMoney() + 200);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');
    setContext2D(ctx);
    setInitCanvas(true);
  }, []);

  useEffect(() => {
    setScene(new Scene());
    setPlayer(new Player());
    if (initCanvas) {
      initialize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initCanvas]);

  useEffect(() => {
    if (isInitialized) {
      const image = new Image();
      image.src = scene!.getCurrentMap();
      image.onload = () => { animate(); console.log('animate2'); }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  useEffect(() => {
    if (initCanvas && gamePart) {
      cancelAnimationFrame(animationRef.current);
      gameTransition(gamePart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePart]);

  // useEffect(() => {
  //   if (isInitialized) {
  //     cancelAnimationFrame(animationRef.current);
  //     animate();

  //   }
  // }, [mousePosition]);

  return (
    <div className={styles.canvasWrapper}>
      {isInfoVisible && <TransitionInfo info={info} time={time} />}
      {contextMenu === ContextMenu.NEW_TOWER &&
        <NewTowerMenu
          contextMenuPosition={contextMenuPosition}
          currentSubstructure={currentSubstructure}
          setCurrentSubstructure={setCurrentSubstructure}
          setContextMenu={setContextMenu}
          context2D={context2D}
          towers={towers}
          player={player!}
        />
      }
      {contextMenu === ContextMenu.UPGRADE_TOWER &&
        <UpgradeTowerMenu
          contextMenuPosition={contextMenuPosition}
          setContextMenu={setContextMenu}
          currentSubstructure={currentSubstructure}
          towers={towers}
          currentTower={clickedTower}
          player={player!}
        />
      }
      <canvas ref={canvasRef} className={styles.sceneCanvas} onClick={placementClicked} onMouseMove={(event) => mouseMove({ event, setMousePosition, canvasRef })}></canvas>
    </div>
  );
}

export default SceneCanvas;