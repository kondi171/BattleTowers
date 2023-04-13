import styles from './../assets/scss/modules/SceneCanvas.module.scss';
import { useEffect, useContext } from 'react';
import Enemy from './classes/Enemy';
import Tower from './classes/Tower';
import PlacementTile from './classes/PlacementTile';
import Scene from './classes/Scene';
import { Mouse } from '../types';
import fillPlacementTiles from './scripts/fillPlacementTiles';
import spawnEnemies from './scripts/spawnEnemies';
// import { getWave, updateEnemies, updatePlacementTiles, updateTower } from './scripts/updateCanvas';
import { AppContext, AppContextType } from './AppContext';

const SceneCanvas = () => {

  const { setWave, setLevel, world, setWorld } = useContext(AppContext) as AppContextType;
  const towers: Tower[] = [];
  const mouse: Mouse = { x: 0, y: 0 };
  let enemies: Enemy[] = [];
  let activeTile: PlacementTile | null = null;
  let placementTiles: PlacementTile[] = [];
  let scene: Scene;

  const initialize = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas!.getContext('2d');
    if (!ctx || !canvas) return;
    canvas.width = 1280;
    canvas.height = 768;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    scene = new Scene();
    placementTiles = fillPlacementTiles(ctx, scene);

    const image = new Image();
    image.src = scene.getCurrentMap();
    image.onload = () => {
      animate();
    }

    enemies = spawnEnemies(ctx, scene);
    canvas.addEventListener('click', addTower);
    window.addEventListener('mousemove', mouseMove);
  }

  const addTower = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas!.getContext('2d');
    if (!ctx || !canvas) return;
    if (activeTile && !activeTile.getOccupied()) {
      towers.push(new Tower(ctx, { x: activeTile.getPosition().x, y: activeTile.getPosition().y }, enemies));
      activeTile.setOccupied(true);
    }
  }

  const mouseMove = (event: MouseEvent) => {
    const canvas = document.querySelector('canvas');
    const canvasTopOffset = canvas!.offsetTop;
    const canvasLeftOffset = canvas!.offsetLeft;
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
    requestAnimationFrame(animate);
    const canvas = document.querySelector('canvas');
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
          if (enemyIndex > -1) enemies.splice(enemyIndex, 1);
        }
        if (enemies.length === 0) increaseWave();
      }
    }
  }

  const increaseWave = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas!.getContext('2d');
    if (!ctx) return;
    if (scene.getWave() >= 3) increaseLevel(ctx);
    else scene.setWave(scene.getWave() + 1);
    setWave(scene.getWave());
    enemies = spawnEnemies(ctx, scene);
  }

  const increaseLevel = (ctx: CanvasRenderingContext2D) => {
    // const canvas = document.getElementById('canvas');
    // canvas?.classList.add('active');
    if (scene.getLevel() >= 3) changeWorld();
    else {
      setLevel(scene.getLevel() + 1);
      scene.setLevel(scene.getLevel() + 1);
      towers.splice(0, towers.length);
      placementTiles.splice(0, placementTiles.length);
      activeTile = null;
      placementTiles = fillPlacementTiles(ctx, scene);
      scene.setWave(1);
    }
  }

  const changeWorld = () => {
    console.log('World Change');
  }

  useEffect(() => {
    initialize();
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('click', addTower);
    }
  }, []);

  return (
    <canvas className={styles.sceneCanvas}></canvas>
  );
}

export default SceneCanvas;