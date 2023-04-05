import { Position } from "../../types";
import Enemy from "./Enemy";

class Bullet {
    private canvasRenderingContext: CanvasRenderingContext2D;
    private position: Position;
    private velocity: Position;

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
        this.canvasRenderingContext = ctx;
        this.position = {
            x: x,
            y: y
        }
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    public draw() {
        this.canvasRenderingContext.beginPath();
        this.canvasRenderingContext.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
        this.canvasRenderingContext.fillStyle = 'orange';
        this.canvasRenderingContext.fill();
    }

    public update(enemies: Enemy[]) {
        this.draw();
        const angle = Math.atan2(
            enemies[1].getPosition().x - this.position.x,
            enemies[1].getPosition().y - this.position.y
        );
        console.log(enemies[1].getPosition().x.toFixed(), enemies[1].getPosition().y.toFixed());
        this.velocity.x = Math.cos(angle);
        this.velocity.y = Math.sin(angle);

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
export default Bullet;