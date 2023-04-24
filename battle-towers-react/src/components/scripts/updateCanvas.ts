import { Mouse } from "../../types";
import Enemy from "../classes/enemies/Enemy";
import PlacementTile from "../classes/PlacementTile";
import Tower from "../classes/Tower";
import World from "../classes/Scene";

let endWave = false;

export const restartEndWave = () => {
  endWave = true;
}

export const getWave = () => {
  return endWave;
}

export const updateEnemies = (enemies: Enemy[]) => {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    enemy.update();
  }
}

export const updatePlacementTiles = (placementTiles: PlacementTile[], mouse: Mouse) => {
  placementTiles.forEach(tile => tile.update(mouse));
}

export const updateTower = (towers: Tower[], enemies: Enemy[]) => {
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
      if (enemies.length === 0) {
        endWave = true;
      }
    }
  }
}