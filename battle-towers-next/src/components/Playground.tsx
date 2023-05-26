import { useEffect, useContext, useState, useRef } from 'react';
import { AppContext, AppContextType } from './AppContext';
import useSound from 'use-sound';

import styles from './../assets/scss/modules/Playground.module.scss';
// @ts-ignore
import lostLife from './../assets/audio/effects/lostLife.wav';
// @ts-ignore
import enemyDead from './../assets/audio/effects/enemyDead.wav';
// @ts-ignore
import enemyHit from './../assets/audio/effects/enemyHit.wav';
// @ts-ignore
import nextGamePart from './../assets/audio/effects/nextGamePart.wav';
// @ts-ignore
import desertSoundtrack from './../assets/audio/tracks/world1Soundtrack.mp3';
// @ts-ignore
import forestSoundtrack from './../assets/audio/tracks/world2Soundtrack.mp3';
// @ts-ignore
import underworldSoundtrack from './../assets/audio/tracks/world3Soundtrack.wav';
import Loading from './views/Loading';
import { Mouse } from '../../types';
import { CanvasBounding, ContextMenu, GamePart, GameResult, LogType } from '../../enums';
import Tower from '@/classes/towers/Tower';
import Enemy from '@/classes/enemies/Enemy';
import Explosion from '@/classes/Explosion';
import Substructure from '@/classes/Substructure';
import Scene from '@/classes/Scene';
import Player from '@/classes/Player';
import fillSubstructures from '@/scripts/fillSubstructures';
import spawnEnemies from '@/scripts/spawnEnemies';
import addToLogs from '@/scripts/addToLogs';
import mouseMove from '@/scripts/mouseMove';
import { animated, useSpring } from 'react-spring';
import TransitionInfo from './features/TransitionInfo';
import NewTowerMenu from './features/towerMenu/NewTowerMenu';
import UpgradeTowerMenu from './features/towerMenu/UpgradeTowerMenu';

interface PlaygroundProps {
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
}

const Playground = ({ isLoaded, setIsLoaded }: PlaygroundProps) => {

  const [playLostLife] = useSound(lostLife);
  const [playEnemyDead] = useSound(enemyDead);
  const [playEnemyHit] = useSound(enemyHit);
  const [playNextGamePart] = useSound(nextGamePart);

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
  const [tacticalMode, setTacticalMode] = useState(false);

  const [towers, setTowers] = useState<Tower[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);

  const [substructures, setSubstructures] = useState<Substructure[]>([]);
  const [currentSubstructure, setCurrentSubstructure] = useState<Substructure | null>(null);

  const [scene, setScene] = useState<Scene | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  const [gamePart, setGamePart] = useState<GamePart | null>(null);
  const [start, setStart] = useState(false);

  const [playDesert, { stop: stopDesert }] = useSound(desertSoundtrack, {
    volume: 0.5,
    interrupt: true,
    loop: true,
  });
  const [playForest, { stop: stopForest }] = useSound(forestSoundtrack, {
    volume: 0.5,
    interrupt: true,
    loop: true,
  });
  const [playUnderworld, { stop: stopUnderworld }] = useSound(underworldSoundtrack, {
    volume: 0.5,
    interrupt: true,
    loop: true,
  });

  const stateAnimation = useSpring({
    opacity: isLoaded ? 1 : 0,
    config: { duration: 400 },
    delay: 200
  });

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
    setExplosions([]);
    setIsInitialized(true);
    const image = new Image();
    image.src = scene!.getCurrentMap();
    context2D!.drawImage(image, 0, 0);
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
        activeSubstructure = tile;
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

  const animate = async () => {
    animationRef.current = requestAnimationFrame(animate);

    const image = new Image();
    image.src = scene!.getCurrentMap();

    // Wait for the image to load
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    context2D!.drawImage(image, 0, 0);
    updateTowers();
    updateEnemies();
    updateSubstructures({ x: 0, y: 0 });
    updateExplosions();
  };

  const refreshAssets = () => {
    const image = new Image();
    image.src = scene!.getCurrentMap();
    context2D!.drawImage(image, 0, 0);
    updateTowers();
    updateEnemies();
    updateSubstructures({ x: 0, y: 0 });
    updateExplosions();
  }

  const updateEnemies = () => {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      enemy.update();
      decreasePlayerLife(enemy, i);
    }
  }

  const updateSubstructures = (mouse: Mouse) => { substructures.forEach(substructure => substructure.update(mouse)); }

  const updateTowers = () => {
    towers.forEach(tower => {
      tower.update();
      tower.setTarget(null);
      const validEnemies = enemies.filter(enemy => {
        const xDifference = (enemy.getPosition().x + enemy.getBounding().width / 2) - tower.getPosition().x - tower.getSize() / 2;
        const yDifference = (enemy.getPosition().y + enemy.getBounding().height / 2) - tower.getPosition().y - tower.getSize() / 2;
        const distance = Math.hypot(xDifference, yDifference);
        return distance < enemy.getBounding().radius + tower.getRadius();
      });
      tower.setTarget(validEnemies[validEnemies.length - 1]);
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
        playEnemyHit();
        if (bullet.getEnemy().getHealth() <= 0) {
          const enemyIndex = enemies.findIndex((enemy) => {
            return bullet.getEnemy() === enemy;
          });
          if (enemyIndex > -1) {
            const targetedEnemy = enemies[enemyIndex];
            enemies.splice(enemyIndex, 1);
            playEnemyDead();
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
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    playNextGamePart();
    setIsInfoVisible(true);
    setInfo(part);
    if (part === GamePart.START && start) {
      if (scene!.getWorldName() === 'Desert') playDesert();
      if (scene!.getWorldName() === 'Forest') playForest();
      if (scene!.getWorldName() === 'Underworld') playUnderworld();
      setIsInfoVisible(false);
      animate();
    } else if ((part === GamePart.WAVE || part === GamePart.LEVEL) && start) {
      if (player!.getLife() <= 0) return;
      setTimeout(() => {
        setIsInfoVisible(false);
        animate();
        if (part === GamePart.WAVE) {
          setWave(scene!.getWave());
          addToLogs(logs, 'Next Wave!', LogType.SUCCESS);
        } else if (part === GamePart.LEVEL) {
          setMoney(player!.getMoney());
          setLevel(scene!.getLevel());
          setWave(1);
          addToLogs(logs, 'Next Level!', LogType.SUCCESS);
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
    } else if (part === GamePart.WORLD) {
      stopDesert();
      stopForest();
      stopUnderworld();
      if (scene!.getWorldName() === 'Desert') playDesert();
      if (scene!.getWorldName() === 'Forest') playForest();
      if (scene!.getWorldName() === 'Underworld') playUnderworld();
      setWave(1);
      setLevel(1);
      setWorld(scene!.getWorldName());
      setLife(player!.getLife());
      setMoney(player!.getMoney());
      addToLogs(logs, 'Next World!', LogType.SUCCESS);
      cancelAnimationFrame(animationRef.current);
    }
    setGamePart(null);
  }

  const gameReset = () => {
    stopDesert();
    stopForest();
    stopUnderworld();
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
      playLostLife();
      if (player!.getLife() <= 0) {
        setEndGame(GameResult.DEFEAT);
        gameReset();
      }
      if (enemies.length === 0) increaseWave();
    }
  }

  const increaseWave = () => {
    if (scene!.getWave() >= scene!.getCurrentWorldData().enemies.length) increaseLevel();
    else {
      setGamePart(GamePart.WAVE);
      scene!.setWave(scene!.getWave() + 1);
      setEnemies(spawnEnemies(context2D!, scene!));
    }
  }

  const increaseLevel = () => {
    if (scene!.getLevel() >= scene!.getMaps().length) changeWorld();
    else {
      setGamePart(GamePart.LEVEL);
      scene!.setLevel(scene!.getLevel() + 1);
      towers.splice(0, towers.length);
      setTowers([]);
      activeSubstructure = null;
      setSubstructures(fillSubstructures(context2D!, scene!))
      scene!.setWave(1);
      setEnemies(spawnEnemies(context2D!, scene!));
      player!.setMoney(((scene!.getWorld() * 100) + ((scene!.getLevel() - 1) * 20)));
      setContextMenu(null);
    }
  }

  const changeWorld = () => {
    if (scene!.getWorld() >= scene!.getWorldsLength()) {
      setEndGame(GameResult.WIN);
      player!.setScore(player!.getScore() + player!.getLife() * 100);
      setScore(player!.getScore());
      gameReset();
    } else {
      scene!.setWave(1);
      scene!.setLevel(1);
      scene!.setWorld(scene!.getWorld() + 1);
      towers.splice(0, towers.length);
      setTowers([]);
      activeSubstructure = null;
      setStart(false);
      setSubstructures(fillSubstructures(context2D!, scene!));
      setEnemies(spawnEnemies(context2D!, scene!));
      player!.setLife(player!.getLife() + 3);
      player!.setMoney(100 * scene!.getWorld());
      setContextMenu(null);
    }
  }

  const handleTacticalMode = () => {
    if (tacticalMode) animate();
    else cancelAnimationFrame(animationRef.current);
    setTacticalMode(!tacticalMode);
    refreshAssets();
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
    if (initCanvas) initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initCanvas]);

  useEffect(() => {
    if (isInitialized) {
      const image = new Image();
      image.src = scene!.getCurrentMap();
      image.onload = () => { gameTransition(GamePart.START); }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      if (start) gameTransition(GamePart.START);
      else gameTransition(GamePart.WORLD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  useEffect(() => {
    if (initCanvas && gamePart) {
      cancelAnimationFrame(animationRef.current);
      gameTransition(gamePart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePart]);

  useEffect(() => {
    if (isInitialized && tacticalMode) refreshAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [towers.length]);

  return (
    <div className={styles.canvasWrapper} >
      <div className={styles.tacticalModeBtn}>
        <i onClick={handleTacticalMode} className="fa fa-pause-circle-o" aria-hidden="true"></i>
      </div>
      <animated.div style={stateAnimation}>
        {tacticalMode && <span className={styles.tacticalMode}>Tactical Mode is Active</span>}
        {isInfoVisible &&
          <TransitionInfo
            info={info}
            time={time}
            start={start}
            setStart={setStart}
          />
        }
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
            refreshAssets={refreshAssets}
          />
        }
        <canvas ref={canvasRef} className={styles.sceneCanvas} onClick={placementClicked} onMouseMove={(event) => mouseMove({ event, canvasRef, tacticalMode, setMousePosition, updateSubstructures })} ></canvas>
      </animated.div>
      {!isLoaded && <Loading />}
    </div >
  );
}

export default Playground;