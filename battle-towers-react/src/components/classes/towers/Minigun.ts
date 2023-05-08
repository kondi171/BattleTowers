import { Position } from "../../../types";
import Tower from "./Tower";
import minigun1 from "./../../../assets/img/towers/structures/minigun/MG1.png";
import minigun2 from "./../../../assets/img/towers/structures/minigun/MG2.png";
import minigun3 from "./../../../assets/img/towers/structures/minigun/MG3.png";

import minigunBullet from './../../../assets/img/towers/projectiles/minigun.png';
import minigunData from '../../resources/towers/minigun.json';
import minigunExplosion from './../../../assets/img/towers/explosions/minigun_explosion.png';

class Minigun extends Tower {
  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
    super(
      ctx,
      { x: x, y: y },
      [minigun1, minigun2, minigun3],
      minigunBullet,
      minigunData
    );
    this.name = minigunData.name;
    this.damage = minigunData.levels[this.level - 1].damage;
    this.money = minigunData.levels[this.level - 1].money;
    this.speed = minigunData.levels[this.level - 1].speed;
    this.explosionImg = minigunExplosion;
    this.maxExplosionFrames = 8;
  }
}

export default Minigun;