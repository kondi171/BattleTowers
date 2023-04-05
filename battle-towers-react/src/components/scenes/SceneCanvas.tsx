import styles from './../../assets/scss/modules/SceneCanvas.module.scss';
import map from './../../assets/img/gameMap.png';
import { useState, useEffect } from 'react';
import Enemy from '../classes/Enemy';
import worldData from './../worlds/desert.json';
import PlacementTile from '../classes/PlacementTile';
import { Mouse } from '../../types';
import Tower from '../classes/Tower';

const SceneCanvas = () => {

  const tileSize = 64;
  const enemies: Enemy[] = [];
  const placementTiles: PlacementTile[] = [];
  const towers: Tower[] = [];
  const mouse: Mouse = { x: 0, y: 0 };
  let activeTile: null | PlacementTile = null;

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
    canvas.addEventListener('click', addTower);
    window.addEventListener('mousemove', mouseMove);
  }

  const addTower = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas!.getContext('2d');
    // console.log(enemies);
    if (!ctx || !canvas) return;
    if (activeTile && !activeTile.getOccupied()) {
      towers.push(new Tower(ctx, { x: activeTile.getPosition().x, y: activeTile.getPosition().y }));
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
    image.src = map;
    if (!ctx) return;
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = '#fff';
    enemies.forEach(enemy => enemy.update());
    placementTiles.forEach(tile => tile.update(mouse));
    towers.forEach(tower => {
      tower.update();
      tower.setTarget(undefined);
      const validEnemies = enemies.filter((enemy, i) => {
        const xDifference = (enemies[i].getPosition().x + enemies[i].getBounding().width / 2) - tower.getPosition().x + tower.getSize() / 2;
        const yDifference = (enemies[i].getPosition().y + enemies[i].getBounding().height / 2) - tower.getPosition().y + tower.getSize() / 2;
        const distance = Math.hypot(xDifference, yDifference);
        return distance < enemy.getBounding().radius + tower.getRadius();
      });
      tower.setTarget(validEnemies[0]);
      console.log(validEnemies);
      for (let i = tower.getBullets().length - 1; i >= 0; i--) {
        const bullet = tower.getBullet(i);
        bullet.update();
        const xDifference = (enemies[i + 1].getPosition().x + enemies[i + 1].getBounding().width / 2) - bullet.getPosition().x;
        const yDifference = (enemies[i + 1].getPosition().y + enemies[i + 1].getBounding().height / 2) - bullet.getPosition().y;
        const distance = Math.hypot(xDifference, yDifference);
        if (distance < enemies[i + 1].getBounding().radius + bullet.getRadius()) {
          tower.getBullets().splice(i, 1);
        }
      }
    });
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