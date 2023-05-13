import { Position } from "../../../types";
import Enemy from "./Enemy";
import scoutOrc from './../../assets/img/enemies/scoutOrc.png';
import scoutData from './../../resources/enemies/scout.json';
import { HealthBarDivider } from "../../../enums";

class ScoutOrc extends Enemy {
    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, waypoints: Position[]) {
        super(ctx, { x, y }, waypoints, scoutOrc.src);
        this.name = scoutData.name;
        this.health = scoutData.health;
        this.money = scoutData.money;
        this.speed = scoutData.speed;
        this.score = scoutData.score;
        // this.speed = 0;
        this.healthBarDivider = HealthBarDivider.SCOUT_ORC;
    }

    public update() {
        super.update();
    }
}
export default ScoutOrc;