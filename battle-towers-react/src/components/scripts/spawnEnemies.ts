import Enemy from '../classes/Enemy';
import worldData from './../worlds/desert.json';

const spawnEnemies = (ctx: CanvasRenderingContext2D, numberOfEnemies: number) => {
  const enemies: Enemy[] = [];
  for (let i = 1; i <= numberOfEnemies + 1; i++) {
    const xOffset = i * 150;
    const enemy = new Enemy(ctx, { x: worldData.levels[0].waypoints[0].x - xOffset, y: worldData.levels[0].waypoints[0].y });
    enemies.push(enemy);
  }
  enemies.splice(0, 1);
  return enemies;
}

export default spawnEnemies;