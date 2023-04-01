import styles from './../../assets/scss/modules/SceneCanvas.module.scss';
import map from './../../assets/img/gameMap.png';
import { useEffect } from 'react';
import Enemy from '../classes/Enemy';
import worldData from './../worlds/desert.json';
import PlacementTile from '../classes/PlacementTile';
import { Mouse } from '../../types';

const SceneCanvas = () => {
  const tileSize = 64;
  const enemies: Enemy[] = [];
  const placementTiles: PlacementTile[] = [];
  const mouse: Mouse = { x: 0, y: 0 };

  const initialize = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas!.getContext('2d');
    if (!ctx || !canvas) return;
    canvas.width = 1280;
    canvas.height = 768;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const placementTilesData2D = [];
    for (let i = 0; i < worldData.levels[0].placementTiles.length; i += 20) {
      placementTilesData2D.push(worldData.levels[0].placementTiles.slice(i, i + 20));
    }
    placementTilesData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 14) {
          placementTiles.push(new PlacementTile(ctx, { x: x * tileSize, y: y * tileSize }));
        }
      });
    });
    const image = new Image();
    image.src = map;
    image.onload = () => {
      animate();
    }
    for (let i = 1; i <= 10; i++) {
      const xOffset = i * 150;
      const enemy = new Enemy(ctx, { x: worldData.levels[0].waypoints[0].x - xOffset, y: worldData.levels[0].waypoints[0].y });
      enemies.push(enemy);
    }
    window.addEventListener('mousemove', mouseMove);
  }

  const mouseMove = (event: MouseEvent) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY - tileSize;
  }

  const animate = () => {
    requestAnimationFrame(animate);
    const canvas = document.querySelector('canvas');
    const ctx = canvas!.getContext('2d');
    const image = new Image();
    image.src = map;
    if (!ctx) return;
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = '#fff';
    enemies.forEach(enemy => enemy.update());
    placementTiles.forEach(tile => {
      tile.update(mouse);
    });
  }
  useEffect(() => {
    initialize();
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    }
  }, []);

  return (
    <canvas className={styles.sceneCanvas}></canvas>
  );
}

export default SceneCanvas;