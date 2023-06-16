import { StartingPoint } from './../typescript/enums';
import SoldierOrc from '../classes/enemies/SoldierOrc';
import Enemy from '../classes/enemies/Enemy';
import ScoutOrc from '../classes/enemies/ScoutOrc';
import WarriorOrc from '../classes/enemies/WarriorOrc';
import Scene from '../classes/Scene';

const spawnEnemies = (ctx: CanvasRenderingContext2D, scene: Scene) => {

  const soldierEnemy: Enemy[] = [];
  const scoutEnemy: Enemy[] = [];
  const warriorEnemy: Enemy[] = [];
  const worldData = scene.getCurrentWorldData();
  const soldierEnemyCount = worldData.enemies[scene.getWave() - 1].soldier;
  const scoutEnemyCount = worldData.enemies[scene.getWave() - 1].scout;
  const warriorEnemyCount = worldData.enemies[scene.getWave() - 1].warrior;
  const startingPoint = scene.getCurrentStartingPoint();
  const spaceBetween = 200;

  const spawn = (numberOfEnemies: number, type: string) => {
    for (let i = 1; i <= numberOfEnemies + 1; i++) {
      let xOffset = 0;
      let yOffset = 0;
      if (startingPoint === StartingPoint.LEFT) xOffset = i * spaceBetween;
      else if (startingPoint === StartingPoint.TOP) yOffset = i * spaceBetween;
      else if (startingPoint === StartingPoint.BOTTOM) yOffset = i * -spaceBetween;
      else if (startingPoint === StartingPoint.RIGHT) xOffset = i * -spaceBetween;
      if (type === 'Soldier') soldierEnemy.push(new SoldierOrc(ctx, { x: worldData.waypoints[0].x - xOffset, y: worldData.waypoints[0].y - yOffset }, worldData.waypoints));
      else if (type === 'Scout') scoutEnemy.push(new ScoutOrc(ctx, { x: worldData.waypoints[0].x - xOffset, y: worldData.waypoints[0].y - yOffset }, worldData.waypoints));
      else if (type === 'Warrior') warriorEnemy.push(new WarriorOrc(ctx, { x: worldData.waypoints[0].x - xOffset, y: worldData.waypoints[0].y - yOffset }, worldData.waypoints));
    }
    // remove firsts enemies of each type - bug fix
    if (type === 'Soldier') soldierEnemy.splice(0, 1);
    else if (type === 'Scout') scoutEnemy.splice(0, 1);
    else if (type === 'Warrior') warriorEnemy.splice(0, 1);
  }

  spawn(soldierEnemyCount, 'Soldier');
  spawn(scoutEnemyCount, 'Scout');
  spawn(warriorEnemyCount, 'Warrior');
  const enemies = [...soldierEnemy, ...scoutEnemy, ...warriorEnemy];
  for (let i = enemies.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [enemies[i], enemies[j]] = [enemies[j], enemies[i]];
  }
  return enemies;
}

export default spawnEnemies;