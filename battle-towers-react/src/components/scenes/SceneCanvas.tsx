import styles from './../../assets/scss/modules/SceneCanvas.module.scss';
import map from './../../assets/img/gameMap.png';
import { useEffect, useRef, useState } from 'react';
import Enemy from '../classes/Enemy';
import worldData from './../worlds/desert.json';

const SceneCanvas = () => {
  const enemies: Enemy[] = [];

  const initialize = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas!.getContext('2d');
    if (!ctx || !canvas) return;
    canvas.width = 1280;
    canvas.height = 768;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
  }
  useEffect(() => {

    initialize();
  }, []);

  return (
    <canvas className={styles.sceneCanvas}></canvas>
  );
}

export default SceneCanvas;