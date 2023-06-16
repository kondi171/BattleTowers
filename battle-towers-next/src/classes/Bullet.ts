import { Position } from "@/typescript/types";
import Enemy from "./enemies/Enemy";
import Sprite from "./Sprite";

class Bullet extends Sprite {

    private velocity: Position;
    private radius: number;
    private speed: number;
    private enemy: Enemy;
    private bulletCanon: HTMLImageElement;

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, enemy: Enemy, bulletImage: string) {
        super(ctx, { x: x, y: y }, bulletImage);
        this.velocity = {
            x: 0,
            y: 0
        }
        this.radius = 10;
        this.speed = 10;
        this.enemy = enemy;
        this.bulletCanon = new Image();
        this.bulletCanon.src = bulletImage;
    }
    protected draw(angle: number) {
        this.canvasRenderingContext.save();
        this.canvasRenderingContext.translate(this.position.x, this.position.y);
        this.canvasRenderingContext.rotate(angle);
        this.canvasRenderingContext.drawImage(this.bulletCanon, -this.image.width / 2, -this.image.height / 2);
        this.canvasRenderingContext.restore();
    }
    public update() {
        const angle = Math.atan2(
            this.enemy.getPosition().y - this.position.y + this.enemy.getBounding().height / 2,
            this.enemy.getPosition().x - this.position.x + this.enemy.getBounding().width / 2
        );
        this.draw(angle);
        this.velocity.x = Math.cos(angle) * this.speed;
        this.velocity.y = Math.sin(angle) * this.speed;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    public getPosition() { return this.position };
    public getRadius() { return this.radius };
    public getEnemy() { return this.enemy };
}

export default Bullet;