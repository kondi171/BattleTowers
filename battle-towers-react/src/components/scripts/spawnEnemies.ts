import { StartingPoint } from '../../enums';
import SoldierOrc from '../classes/enemies/SoldierOrc';
import Enemy from '../classes/enemies/Enemy';
import ScoutOrc from '../classes/enemies/ScoutOrc';
import WarriorOrc from '../classes/enemies/WarriorOrc';
import Scene from '../classes/Scene';

const spawnEnemies = (ctx: CanvasRenderingContext2D, scene: Scene) => {
  const numberOfEnemies = 2;
  const enemies: Enemy[] = [];
  const worldData = scene.getCurrentWorldData();

  const startingPoint = scene.getCurrentStartingPoint();
  const spaceBetween = 200;
  for (let i = 1; i <= numberOfEnemies + 1; i++) {
    let xOffset = 0;
    let yOffset = 0;

    if (startingPoint === StartingPoint.LEFT) xOffset = i * spaceBetween;
    else if (startingPoint === StartingPoint.TOP) yOffset = i * spaceBetween;
    else if (startingPoint === StartingPoint.BOTTOM) yOffset = i * -spaceBetween;
    else if (startingPoint === StartingPoint.RIGHT) xOffset = i * -spaceBetween;
    const enemy1 = new SoldierOrc(ctx, { x: worldData.waypoints[0].x - xOffset, y: worldData.waypoints[0].y - yOffset }, worldData.waypoints);
    const enemy2 = new ScoutOrc(ctx, { x: worldData.waypoints[0].x - xOffset, y: worldData.waypoints[0].y - yOffset }, worldData.waypoints);
    const enemy3 = new WarriorOrc(ctx, { x: worldData.waypoints[0].x - xOffset, y: worldData.waypoints[0].y - yOffset }, worldData.waypoints);
    enemies.push(enemy1, enemy2, enemy3);
  }

  enemies.splice(0, 1);
  return enemies;
}

export default spawnEnemies;