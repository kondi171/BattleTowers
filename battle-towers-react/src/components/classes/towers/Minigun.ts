import { Position } from "../../../types";
import Tower from "./Tower";
import minigun1 from "./../../../assets/img/towers/structures/minigun/MG1.png";
import minigun2 from "./../../../assets/img/towers/structures/minigun/MG2.png";
import minigun3 from "./../../../assets/img/towers/structures/minigun/MG3.png";

import minigunBullet from './../../../assets/img/towers/projectiles/minigun.png';
import minigunData from '../../resources/towers/minigun.json';
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
    this.damage = minigunData.levels[this.level].damage;
    this.money = minigunData.levels[this.level].money;
    this.speed = minigunData.levels[this.level].speed;
    // this.damage = 10;
    // this.money = 40;
    // this.speed = 30;
  }
}

export default Minigun;