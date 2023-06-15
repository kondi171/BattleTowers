import type { Position } from "@/typescript/types";
import Enemy from "./Enemy";
import warriorOrc from '@/assets/img/enemies/warriorOrc.png';
import warriorData from './../../resources/enemies/warrior.json';
import { HealthBarDivider } from "@/typescript/enums";

class WarriorOrc extends Enemy {

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, waypoints: Position[]) {
        super(ctx, { x, y }, waypoints, warriorOrc);
        this.name = warriorData.name;
        this.health = warriorData.health;
        this.money = warriorData.money;
        this.speed = warriorData.speed;
        this.score = warriorData.score;
        // this.speed = 0;
        this.healthBarDivider = HealthBarDivider.WARRIOR_ORC;

    }

    public update() {
        super.update();
    }
}
export default WarriorOrc;