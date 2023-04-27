import { Position } from "../../../types";
import Enemy from "./Enemy";
import scoutOrc from './../../../assets/img/enemies/scoutOrc.png';
import { HealthBarDivider } from "../../../enums";

class ScoutOrc extends Enemy {

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, waypoints: Position[]) {
        super(ctx, { x, y }, waypoints, scoutOrc);
        this.health = 50;
        this.speed = 6;
        this.healthBarDivider = HealthBarDivider.SCOUT_ORC;
        this.enemyName = 'Scout';
        this.score = 12;
    }

    public update() {
        super.update();
    }
}
export default ScoutOrc;