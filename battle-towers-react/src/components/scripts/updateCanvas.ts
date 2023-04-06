import { Mouse } from "../../types";
import Enemy from "../classes/Enemy";
import PlacementTile from "../classes/PlacementTile";
import Tower from "../classes/Tower";

export const updateEnemies = (enemies: Enemy[]) => {
  enemies.forEach(enemy => enemy.update());
}

export const updatePlacementTiles = (placementTiles: PlacementTile[], mouse: Mouse) => {
  placementTiles.forEach(tile => tile.update(mouse));
}

export const updateTower = (towers: Tower[], enemies: Enemy[]) => {
  towers.forEach(tower => {
    tower.update();
    tower.setTarget(null);
    const validEnemies = enemies.filter((enemy, i) => {
      const xDifference = (enemy.getPosition().x + enemy.getBounding().width / 2) - tower.getPosition().x;
      const yDifference = (enemy.getPosition().y + enemy.getBounding().height / 2) - tower.getPosition().y;
      const distance = Math.hypot(xDifference, yDifference);
      return distance < enemy.getBounding().radius + tower.getRadius();
    });
    tower.setTarget(validEnemies[0]);
    for (let i = tower.getBullets().length - 1; i >= 0; i--) {
      const bullet = tower.getBullet(i);
      bullet.update();
      const xDifference = (bullet.getEnemy().getPosition().x + bullet.getEnemy().getBounding().width / 2) - bullet.getPosition().x;
      const yDifference = (bullet.getEnemy().getPosition().y + bullet.getEnemy().getBounding().height / 2) - bullet.getPosition().y;
      const distance = Math.hypot(xDifference, yDifference);
      if (distance < bullet.getEnemy().getBounding().radius) {
        // console.log('colliding');
        tower.getBullets().splice(i, 1);
      }
    }
  });
  // towers.forEach(tower => {
  //   tower.update();
  //   tower.setTarget(undefined);
  //   const validEnemies = enemies.filter((enemy, i) => {
  //     const xDifference = (enemies[i].getPosition().x + enemies[i].getBounding().width / 2) - tower.getPosition().x + tower.getSize() / 2;
  //     const yDifference = (enemies[i].getPosition().y + enemies[i].getBounding().height / 2) - tower.getPosition().y + tower.getSize() / 2;
  //     const distance = Math.hypot(xDifference, yDifference);
  //     return distance < enemy.getBounding().radius + tower.getRadius();
  //   });
  //   tower.setTarget(validEnemies[0]);
  //   for (let i = tower.getBullets().length - 1; i > 0; i--) {
  //     const bullet = tower.getBullet(i);
  //     bullet.update();
  //     console.log(tower.getBullets());
  //     // const xDifference = (enemies[i + 1].getPosition().x + enemies[i + 1].getBounding().width / 2) - bullet.getPosition().x;
  //     // const yDifference = (enemies[i + 1].getPosition().y + enemies[i + 1].getBounding().height / 2) - bullet.getPosition().y;
  //     // const distance = Math.hypot(xDifference, yDifference);
  //     // if (distance < enemies[i].getBounding().radius + bullet.getRadius()) {
  //     //   bullet.getEnemy().decreaseHealth(20);
  //     //   if (bullet.getEnemy().getHealth() <= 0) {
  //     //     const enemyIndex = enemies.findIndex((enemy) => {
  //     //       return bullet.getEnemy() === enemy;
  //     //     });
  //     //     if (enemyIndex > -1) enemies.splice(enemyIndex, 1);
  //     //   }
  //     //   console.log(bullet.getEnemy().getHealth());
  //     //   tower.getBullets().splice(i, 1);
  //     // }
  //   }
  // });
}