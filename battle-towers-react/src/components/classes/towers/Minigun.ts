import { Position } from "../../../types";
import Tower from "./Tower";
import minigun from "./../../../assets/img/towers/structures/minigun/MG1.png";
import minigunBullet from './../../../assets/img/towers/projectiles/minigun.png';

class Minigun extends Tower {
  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
    super(ctx, { x: x, y: y }, minigun, minigunBullet);
    this.damage = 10;
    this.money = 40;
    this.speed = 30;
  }
}

export default Minigun;