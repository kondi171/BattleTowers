import { StartingPoint } from '../../enums';
import Enemy from '../classes/Enemy';
import Scene from '../classes/Scene';

const spawnEnemies = (ctx: CanvasRenderingContext2D, scene: Scene) => {
  const numberOfEnemies = 4;
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
    const enemy = new Enemy(ctx, { x: worldData.waypoints[0].x - xOffset, y: worldData.waypoints[0].y - yOffset }, worldData.waypoints);
    enemies.push(enemy);
  }

  enemies.splice(0, 1);
  return enemies;
}

export default spawnEnemies;