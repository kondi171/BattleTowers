import { Position } from "./../../typescript/types";
import Tower from "./Tower";
import cannon1 from "./../../assets/img/towers/structures/cannon/cannon1.png";
import cannon2 from "./../../assets/img/towers/structures/cannon/cannon2.png";
import cannon3 from "./../../assets/img/towers/structures/cannon/cannon3.png";

import cannonBullet from './../../assets/img/towers/projectiles/cannon.png';
import cannonData from '../../resources/towers/cannon.json';
import cannonExplosion from './../../assets/img/towers/explosions/cannon_explosion.png';

class Cannon extends Tower {
  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
    super(
      ctx,
      { x: x, y: y },
      [cannon1, cannon2, cannon3],
      cannonBullet,
      cannonData
    );
    this.name = cannonData.name;
    this.damage = cannonData.levels[this.level - 1].damage;
    this.money = cannonData.levels[this.level - 1].money;
    this.speed = cannonData.levels[this.level - 1].speed;
    this.explosionImg = cannonExplosion;
    this.maxExplosionFrames = 4;
  }
}

export default Cannon;