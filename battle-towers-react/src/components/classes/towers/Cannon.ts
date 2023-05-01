import { Position } from "../../../types";
import Tower from "./Tower";
import cannon1 from "./../../../assets/img/towers/structures/cannon/Cannon1.png";
import cannon2 from "./../../../assets/img/towers/structures/cannon/Cannon2.png";
import cannon3 from "./../../../assets/img/towers/structures/cannon/Cannon3.png";
import cannonBullet from './../../../assets/img/towers/projectiles/cannon.png';
import cannonData from '../../resources/towers/cannon.json';

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
    this.damage = cannonData.levels[this.level].damage;
    this.money = cannonData.levels[this.level].money;
    this.speed = cannonData.levels[this.level].speed;
  }

}

export default Cannon;