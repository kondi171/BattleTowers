import styles from './../assets/scss/modules/SceneCanvas.module.scss';
import map from './../assets/img/gameMap.png';
import { useEffect, useContext } from 'react';
import Enemy from './classes/Enemy';
import PlacementTile from './classes/PlacementTile';
import { Mouse } from '../types';
import Tower from './classes/Tower';
import fillPlacementTiles from './scripts/fillPlacementTiles';
import spawnEnemies from './scripts/spawnEnemies';
import { updateEnemies, updatePlacementTiles, updateTower } from './scripts/updateCanvas';
import { AppContext, AppContextType } from './AppContext';

const SceneCanvas = () => {

  const { wave, setWave } = useContext(AppContext) as AppContextType;
  const towers: Tower[] = [];
  const mouse: Mouse = { x: 0, y: 0 };
  let enemies: Enemy[] = [];
  let activeTile: PlacementTile | null = null;
  let placementTiles: PlacementTile[] = [];

  const initialize = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas!.getContext('2d');
    if (!ctx || !canvas) return;
    canvas.width = 1280;
    canvas.height = 768;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    placementTiles = fillPlacementTiles(ctx);

    const image = new Image();
    image.src = map;
    image.onload = () => {
      animate();
    }

    enemies = spawnEnemies(ctx, 2);
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
    image.src = map;

    if (!ctx) return;
    ctx.drawImage(image, 0, 0);
    updateTower(towers, enemies);
    updateEnemies(enemies);
    updatePlacementTiles(placementTiles, mouse);
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