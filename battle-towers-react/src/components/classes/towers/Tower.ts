import { Position, TowerData } from "../../../types";
import Bullet from "../Bullet";
import Sprite from "../Sprite";
import Enemy from "../enemies/Enemy";

// import minigun from "./../../../assets/img/towers/structures/minigun/MG1.png";


class Tower extends Sprite {

    private size: number;
    private bullets: Bullet[];
    private radius: number;
    private target: Enemy | null;
    private bulletFrames: number;
    private towerData: TowerData;
    private towerImages: string[];
    protected bulletImage: HTMLImageElement;
    protected name: string;
    protected damage: number;
    protected money: number;
    protected speed: number;
    protected level: number;

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, towerImages: string[], bulletImg: string, towerData: TowerData) {
        super(ctx, { x: 0, y: 0 }, towerImages[0]);
        this.canvasRenderingContext = ctx;
        this.position = {
            x: x,
            y: y
        }
        this.size = 128;
        this.bullets = [];
        this.radius = 250;
        this.bulletFrames = 0;
        this.target = null;
        this.name = '';
        this.damage = 0;
        this.money = 0;
        this.speed = 0;
        this.level = 1;
        this.bulletImage = new Image();
        this.bulletImage.src = bulletImg;
        this.towerData = towerData;
        this.towerImages = towerImages;
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
        if (this.target) {
            const angle = Math.atan2(
                this.target.getPosition().y - this.position.y + this.target.getBounding().height / 2,
                this.target.getPosition().x - this.position.x + this.target.getBounding().width / 2
            );
            this.canvasRenderingContext.save();
            this.canvasRenderingContext.translate(this.position.x + this.size / 2, this.position.y + this.size / 2);
            this.canvasRenderingContext.rotate(angle);
            this.canvasRenderingContext.drawImage(this.image, -this.size / 4, -this.size / 4, this.size, this.size / 2);
            this.canvasRenderingContext.restore();
        } else this.canvasRenderingContext.drawImage(this.image, this.position.x + this.size / 4, this.position.y + this.size / 4, this.size, this.size / 2);
    }
    protected draw() {
        this.drawTower();
        this.drawBlastField();
    }

    public update() {
        this.draw();

        if (this.bulletFrames % (this.speed * 10) === 0 && this.target) {
            const angle = Math.atan2(
                this.target.getPosition().y - this.position.y + this.target.getBounding().height / 2,
                this.target.getPosition().x - this.position.x + this.target.getBounding().width / 2
            );
            const bulletX = this.position.x + this.size / 2 + Math.cos(angle) * (this.size / 2 + 50);
            const bulletY = this.position.y + this.size / 2 + Math.sin(angle) * (this.size / 2 + 20);
            this.bullets.push(new Bullet(
                this.canvasRenderingContext,
                { x: bulletX, y: bulletY },
                this.target,
                this.bulletImage.src
            ));
        }

        this.bulletFrames++;
    }

    public upgradeTower() {
        this.level += 1;
        this.damage = this.towerData.levels[this.level - 1].damage;
        this.money = this.towerData.levels[this.level - 1].money;
        this.speed = this.towerData.levels[this.level - 1].speed;
        this.image.src = this.towerImages[this.level - 1];
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
    public getDamage() {
        return this.damage;
    }
    public getMoney() {
        return this.money;
    }
    public getSpeed() {
        return this.speed;
    }
    public getName() {
        return this.name;
    }
    public getCurrentLevelInfo() {
        const currentLevel = {
            level: this.level,
            damage: this.towerData.levels[this.level - 1].damage,
            money: this.towerData.levels[this.level - 1].money,
            speed: this.towerData.levels[this.level - 1].speed,
            image: this.towerImages[this.level - 1]
        }
        return currentLevel;
    }
    public getNextLevelInfo() {
        const currentLevel = {
            level: this.level + 1,
            damage: this.towerData.levels[this.level].damage,
            money: this.towerData.levels[this.level].money,
            speed: this.towerData.levels[this.level].speed,
            image: this.towerImages[this.level]
        }
        return currentLevel;
    }
}

export default Tower;