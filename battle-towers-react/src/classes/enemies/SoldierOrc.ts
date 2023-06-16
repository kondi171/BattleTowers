import { Position } from "./../../typescript/types";
import Enemy from "./Enemy";
import soldierOrc from './../../assets/img/enemies/soldierOrc.png';
import soldierData from './../../resources/enemies/soldier.json';
import { HealthBarDivider } from "./../../typescript/enums";

class SoldierOrc extends Enemy {

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, waypoints: Position[]) {
        super(ctx, { x, y }, waypoints, soldierOrc);
        this.name = soldierData.name;
        this.health = soldierData.health;
        this.money = soldierData.money;
        this.speed = soldierData.speed;
        this.score = soldierData.score;
        this.healthBarDivider = HealthBarDivider.SOLDIER_ORC;
    }

    public update() {
        super.update();
    }
}
export default SoldierOrc;