import { Position } from "../../../types";
import Enemy from "./Enemy";
import soldierOrc from './../../../assets/img/enemies/soldierOrc.png';
import { HealthBarDivider } from "../../../enums";

class SoldierOrc extends Enemy {

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, waypoints: Position[]) {
        super(ctx, { x, y }, waypoints, soldierOrc);
        this.health = 100;
        this.speed = 4;
        this.healthBarDivider = HealthBarDivider.SOLDIER_ORC;
        this.enemyName = 'Soldier';
    }

    public update() {
        super.update();
    }
}
export default SoldierOrc;