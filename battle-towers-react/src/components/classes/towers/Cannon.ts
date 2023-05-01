import { Position } from "../../../types";
import Tower from "./Tower";
import cannon from "./../../../assets/img/towers/structures/cannon/Cannon1.png";
import cannonBullet from './../../../assets/img/towers/projectiles/cannon.png';

class Cannon extends Tower {
  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
    super(ctx, { x: x, y: y }, cannon, cannonBullet);
    this.damage = 20;
    this.money = 20;
    this.speed = 50;
  }
}

export default Cannon;