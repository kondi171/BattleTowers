import { Position } from "../../types";
import Enemy from "./Enemy";

class Bullet {
    private canvasRenderingContext: CanvasRenderingContext2D;
    private position: Position;
    private velocity: Position;
    private radius: number;
    private speed: number;
    private enemy: Enemy;

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, enemy: Enemy) {
        this.canvasRenderingContext = ctx;
        this.position = {
            x: x,
            y: y
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.radius = 10;
        this.speed = 5;
        this.enemy = enemy;
    }

    public draw() {
        this.canvasRenderingContext.beginPath();
        this.canvasRenderingContext.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        this.canvasRenderingContext.fillStyle = 'orange';
        this.canvasRenderingContext.fill();
    }

    public update() {
        this.draw();
        if (this.enemy.getPosition().x < this.position.x - this.enemy.getBounding().width / 2) this.position.x -= this.speed;
        else if (this.enemy.getPosition().x > this.position.x - this.enemy.getBounding().width / 2) this.position.x += this.speed;
        if (this.enemy.getPosition().y < this.position.y - this.enemy.getBounding().height / 2) this.position.y -= this.speed;
        else if (this.enemy.getPosition().y > this.position.y - this.enemy.getBounding().height / 2) this.position.y += this.speed;

        // Fluent bullet strike
        // const angle = Math.atan2(
        //     this.enemy.getPosition().x - this.position.x,
        //     this.enemy.getPosition().y - this.position.y
        // );
        // console.log(`${enemies[0].getPosition().x.toFixed()}, ${enemies[0].getPosition().y.toFixed()} | ${this.position.x.toFixed()}, ${this.position.y.toFixed()}`);
        // this.velocity.x = Math.cos(angle);
        // this.velocity.y = Math.sin(angle);

        // this.position.x += this.velocity.x;
        // this.position.y += this.velocity.y;
    }
    public getPosition() { return this.position };
    public getRadius() { return this.radius };
}
export default Bullet;