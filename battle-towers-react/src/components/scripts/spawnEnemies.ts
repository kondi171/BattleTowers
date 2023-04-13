import Enemy from '../classes/Enemy';
import Scene from '../classes/Scene';

const spawnEnemies = (ctx: CanvasRenderingContext2D, scene: Scene) => {
  const numberOfEnemies = 2;
  const enemies: Enemy[] = [];
  const worldData = scene.getCurrentWorldData();
  const level = scene.getLevel() - 1;
  for (let i = 1; i <= numberOfEnemies + 1; i++) {
    const xOffset = i * 150;
    const enemy = new Enemy(ctx, { x: worldData.waypoints[level].x - xOffset, y: worldData.waypoints[level].y }, worldData.waypoints);
    enemies.push(enemy);
  }
  enemies.splice(0, 1);
  return enemies;
}

export default spawnEnemies;