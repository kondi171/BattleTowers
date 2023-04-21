import { useEffect, useContext, useState } from 'react';
import { AppContext, AppContextType } from './AppContext';
import { Mouse } from '../types';
import { GameResult } from '../enums';
import styles from './../assets/scss/modules/SceneCanvas.module.scss';
import Enemy from './classes/Enemy';
import Tower from './classes/Tower';
import PlacementTile from './classes/PlacementTile';
import Scene from './classes/Scene';
import Player from './classes/Player';
import fillPlacementTiles from './scripts/fillPlacementTiles';
import spawnEnemies from './scripts/spawnEnemies';
// import { getWave, updateEnemies, updatePlacementTiles, updateTower } from './scripts/updateCanvas';
import TransitionInfo from './features/TransitionInfo';

const SceneCanvas = () => {

  const { setWave, setLevel, setWorld, setLife, setMoney, setScore, setEndGame, endGame } = useContext(AppContext) as AppContextType;
  const [init, setInit] = useState<boolean>(false);
  const [info, setInfo] = useState<string>('');
  const [time, setTime] = useState<number>(3);
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const canvasBounding = {
    width: 1280,
    height: 768,
  }
  const towers: Tower[] = [];
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

  const addTower = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    if (activeTile && !activeTile.getOccupied()) {
      if (player.getMoney() >= 50) {
        towers.push(new Tower(ctx, { x: activeTile.getPosition().x, y: activeTile.getPosition().y }, enemies));
        activeTile.setOccupied(true);
        player.setMoney(player.getMoney() - 50);
        setMoney(player.getMoney());
      }
    }
  }

  const mouseMove = (event: MouseEvent) => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const canvasTopOffset = canvas.getBoundingClientRect().top;
    const canvasLeftOffset = canvas.getBoundingClientRect().left;
    mouse.x = event.clientX - canvasLeftOffset;
    mouse.y = event.clientY - canvasTopOffset;
    activeTile = null;
    // Bounding Error!
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

  const gameTransition = (info: string) => {
    if (player.getLife() <= 0) return;
    cancelAnimationFrame(animationID);
    setInfo(info);
    setIsInfoVisible(true);
    setTimeout(() => {
      setIsInfoVisible(false);
      animationID = requestAnimationFrame(animate);
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
      gameTransition('wave');
    }
    setWave(scene.getWave());
    enemies = spawnEnemies(ctx, scene);
  }

  const increaseLevel = (ctx: CanvasRenderingContext2D) => {
    if (scene.getLevel() >= 3) changeWorld(ctx);
    else {
      gameTransition('level');
      setLevel(scene.getLevel() + 1);
      scene.setLevel(scene.getLevel() + 1);
      towers.splice(0, towers.length);
      placementTiles.splice(0, placementTiles.length);
      activeTile = null;
      placementTiles = fillPlacementTiles(ctx, scene);
      scene.setWave(1);
      player.setMoney(player.getMoney() + 100);
      setMoney(player.getMoney());
    }
  }

  const changeWorld = (ctx: CanvasRenderingContext2D) => {
    if (scene.getWorld() >= scene.getWorldsLength()) {
      setEndGame(GameResult.WIN);
      gameReset();
    } else {
      gameTransition('world');
      scene.setWave(1);
      scene.setLevel(1);
      scene.setWorld(scene.getWorld() + 1);
      setWave(1);
      setLevel(1);
      setWorld(scene.getWorldName());
      towers.splice(0, towers.length);
      placementTiles.splice(0, placementTiles.length);
      activeTile = null;
      placementTiles = fillPlacementTiles(ctx, scene);
      player.setLife(player.getLife() + 3);
      setLife(player.getLife());
      player.setMoney(player.getMoney() + 100);
      setMoney(player.getMoney());
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
      setLife(player.getLife());
      enemies.splice(index, 1);
      if (player.getLife() <= 0) {
        setEndGame(GameResult.DEFEAT);
        gameReset();
      }
      if (enemies.length === 0) increaseWave();
    }
  }

  window.addEventListener('click', addTower);
  window.addEventListener('mousemove', mouseMove);

  useEffect(() => {
    setInit(true);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('click', addTower);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (init) initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init]);

  return (
    <div className={styles.canvasWrapper}>
      {isInfoVisible && <TransitionInfo info={info} time={time} />}
      <canvas className={styles.sceneCanvas}></canvas>
    </div>

  );
}

export default SceneCanvas;