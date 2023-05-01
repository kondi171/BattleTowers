import { Position } from "../../../types";
import Tower from "./Tower";
import missile from "./../../../assets/img/towers/structures/missile/Missile_Launcher1.png";
import missileBullet from './../../../assets/img/towers/projectiles/missile.png';

class MissileLauncher extends Tower {
  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
    super(ctx, { x: x, y: y }, missile, missileBullet);
    this.damage = 40;
    this.money = 60;
    this.speed = 100;
  }
}

export default MissileLauncher;