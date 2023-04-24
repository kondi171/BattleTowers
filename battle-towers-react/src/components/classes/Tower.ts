import { Position } from "../../types";
import Bullet from "./Bullet";
import Enemy from "./enemies/Enemy";

class Tower {
    private canvasRenderingContext: CanvasRenderingContext2D;
    private position: Position;
    private size: number;
    private bullets: Bullet[];
    private radius: number;
    private target: Enemy | null;
    private frames: number;

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, enemies: Enemy[]) {
        this.canvasRenderingContext = ctx;
        this.position = {
            x: x,
            y: y
        }
        this.size = 128;
        this.bullets = [];
        this.radius = 250;
        this.frames = 0;
        this.target = null;
    }

    private drawBlastField() {
        this.canvasRenderingContext.beginPath();
        // this.canvasRenderingContext.globalAlpha = 0.9;
        this.canvasRenderingContext.arc(this.position.x + this.size / 2, this.position.y + this.size / 2, this.radius, 0, Math.PI * 2);
        this.canvasRenderingContext.fillStyle = `rgba(${0}, ${0}, ${255}, ${0.1})`;
        this.canvasRenderingContext.strokeStyle = `rgba(${0}, ${0}, ${255}, ${0.6})`;
        this.canvasRenderingContext.lineWidth = 2;
        this.canvasRenderingContext.fill();
        this.canvasRenderingContext.stroke();
    }

    private drawTower() {
        this.canvasRenderingContext.fillStyle = 'blue';
        this.canvasRenderingContext.fillRect(this.position.x, this.position.y, this.size, this.size);
    }
    protected draw() {
        this.drawTower();
        this.drawBlastField();
    }

    public update() {
        this.draw();
        if (this.frames % 100 === 0 && this.target) {
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
    public setTarget(enemy: Enemy | null) {
        this.target = enemy;
    }
}

export default Tower;