import { Position } from "../../types";
import Bullet from "./Bullet";

class Tower {
    private canvasRenderingContext: CanvasRenderingContext2D;
    private position: Position;
    private size: number = 128;
    private bullets: Bullet[];

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
        this.canvasRenderingContext = ctx;
        this.position = {
            x: x,
            y: y
        }
        this.bullets = [
            new Bullet(
                this.canvasRenderingContext,
                {
                    x: this.position.x + this.size / 2,
                    y: this.position.y + this.size / 2
                }
            )
        ];
    }
    public draw() {
        this.canvasRenderingContext.fillStyle = 'blue';
        this.canvasRenderingContext.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

    public getBullets() { return this.bullets; }
}

export default Tower;