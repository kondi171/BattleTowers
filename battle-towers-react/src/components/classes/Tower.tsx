import { Position } from "../../types";
import Bullet from "./Bullet";
import Enemy from "./Enemy";

class Tower {
    private canvasRenderingContext: CanvasRenderingContext2D;
    private position: Position;
    private size: number = 128;
    private bullets: Bullet[];
    private radius: number;
    private target: Enemy | undefined;
    private frames: number;

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
        this.canvasRenderingContext = ctx;
        this.position = {
            x: x,
            y: y
        }
        this.bullets = [];
        this.radius = 250;
        // this.target = ???
        this.frames = 0;
    }

    public draw() {
        this.canvasRenderingContext.fillStyle = 'blue';
        this.canvasRenderingContext.fillRect(this.position.x, this.position.y, this.size, this.size);

        this.canvasRenderingContext.beginPath();
        this.canvasRenderingContext.arc(this.position.x + this.size / 2, this.position.y + this.size / 2, this.radius, 0, Math.PI * 2);
        this.canvasRenderingContext.fillStyle = `rgba(${255}, ${255}, ${255}, ${0.1})`;
        this.canvasRenderingContext.strokeStyle = `rgba(${255}, ${255}, ${255}, ${0.6})`;
        this.canvasRenderingContext.lineWidth = 2;
        this.canvasRenderingContext.fill();
        this.canvasRenderingContext.stroke();
    }

    public update() {
        this.draw();
        if (this.frames % 500 === 0 && this.target) {
            this.bullets.push(new Bullet(
                this.canvasRenderingContext,
                {
                    x: this.position.x + this.size / 2,
                    y: this.position.y + this.size / 2
                },
                this.target
            ));
        }
        this.frames++;
    }
    public getBullets() {
        return this.bullets;
    }
    public getBullet(index: number) {
        return this.bullets[index];
    }
    public getSize() {
        return this.size;
    }
    public getPosition() {
        return this.position;
    }
    public getRadius() {
        return this.radius;
    }
    public setTarget(enemy: Enemy | undefined) {
        this.target = enemy;
    }
}

export default Tower;