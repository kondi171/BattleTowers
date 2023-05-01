import { Position } from "../../../types";
import Tower from "./Tower";
import missile1 from "./../../../assets/img/towers/structures/missile/Missile_Launcher1.png";
import missile2 from "./../../../assets/img/towers/structures/missile/Missile_Launcher2.png";
import missile3 from "./../../../assets/img/towers/structures/missile/Missile_Launcher3.png";

import missileBullet from './../../../assets/img/towers/projectiles/missile.png';
import missileData from '../../resources/towers/missile.json';

class MissileLauncher extends Tower {
  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
    super(
      ctx, { x: x, y: y },
      [missile1, missile2, missile3],
      missileBullet,
      missileData
    );
    this.name = missileData.name;
    this.damage = missileData.levels[this.level].damage;
    this.money = missileData.levels[this.level].money;
    this.speed = missileData.levels[this.level].speed;
    // this.damage = 40;
    // this.money = 60;
    // this.speed = 100;
  }
}

export default MissileLauncher;