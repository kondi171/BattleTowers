import { Position } from "../../../types";
import Enemy from "./Enemy";
import warriorOrc from './../../../assets/img/sprites/enemies/warriorOrc.png';
import { HealthBarDivider } from "../../../enums";

class WarriorOrc extends Enemy {

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, waypoints: Position[]) {
        super(ctx, { x, y }, waypoints, warriorOrc);
        this.health = 200;
        this.speed = 2;
        this.healthBarDivider = HealthBarDivider.WARRIOR_ORC;
        this.enemyName = 'Warrior';
    }

    public update() {
        super.update();
    }
}
export default WarriorOrc;