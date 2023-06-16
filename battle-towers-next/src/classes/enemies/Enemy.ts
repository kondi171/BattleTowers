import { Direction, HealthBarDivider } from '@/typescript/enums';
import { Bounding, Position } from '@/typescript/types';
import Sprite from '../Sprite';

abstract class Enemy extends Sprite {

  private waypoints: Position[];
  private waypointIndex: number;
  private velocity: Position;
  private direction: Direction | null;
  protected bounding: Bounding;
  protected health: number;
  protected speed: number;
  protected healthBarDivider: HealthBarDivider;
  protected name: string;
  protected score: number;
  protected money: number;

  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, waypoints: Position[], imageSrc: string) {
    super(ctx, { x: x, y: y }, imageSrc, { max: 7 });
    this.waypoints = waypoints;
    this.bounding = {
      width: 64,
      height: 64,
      radius: 32
    }
    this.waypointIndex = 0;
    this.health = 100;
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.speed = 2;
    this.direction = null;
    this.healthBarDivider = HealthBarDivider.SOLDIER_ORC;
    this.name = '';
    this.score = 0;
    this.money = 0;
  }

  private drawEnemy() {
    const cropWidth = this.image.width / this.frames.max;
    const crop = {
      position: {
        x: cropWidth * this.frames.current,
        y: 0
      },
      width: cropWidth,
      height: this.image.height
    }

    if (this.waypointIndex !== this.waypoints.length - 2) {
      if (this.waypoints[this.waypointIndex].x < this.waypoints[this.waypointIndex + 1].x) this.direction = Direction.RIGHT
      else this.direction = Direction.LEFT
    }
    if (this.direction === Direction.RIGHT) {
      this.canvasRenderingContext.drawImage(
        this.image,
        crop.position.x,
        crop.position.y,
        crop.width,
        crop.height,
        this.position.x - 15,
        this.position.y,
        crop.width,
        crop.height
      );
    } else {
      this.canvasRenderingContext.scale(-1, 1);
      this.canvasRenderingContext.drawImage(
        this.image,
        crop.position.x,
        crop.position.y,
        crop.width,
        crop.height,
        -this.position.x - this.bounding.width - 15,
        this.position.y,
        crop.width,
        crop.height
      );
      this.canvasRenderingContext.scale(-1, 1);
    }

    this.frames.elapsed++;
    if (this.frames.elapsed % this.frames.hold === 0) {
      this.frames.current++;
      if (this.frames.current >= this.frames.max) this.frames.current = 0;
    }
  }

  private drawHealthBars() {
    const barHeight = 10;
    const borderRadius = 5;

    this.canvasRenderingContext.fillStyle = '#cc0000';
    this.fillHealthBars(
      this.canvasRenderingContext,
      this.position.x,
      this.position.y - barHeight - borderRadius,
      this.bounding.width,
      barHeight,
      borderRadius
    );

    this.canvasRenderingContext.fillStyle = '#00c700';
    this.fillHealthBars(
      this.canvasRenderingContext,
      this.position.x,
      this.position.y - barHeight - borderRadius,
      this.bounding.width * this.health / this.healthBarDivider,
      barHeight,
      borderRadius
    );
  }

  private drawHealthValue() {
    this.canvasRenderingContext.fillStyle = '#ffffff';
    this.canvasRenderingContext.font = 'bold 18px sans-serif';
    this.canvasRenderingContext.textAlign = 'center';
    this.canvasRenderingContext.fillText(
      `${this.health} / ${this.healthBarDivider}`,
      this.position.x + this.bounding.width / 2,
      this.position.y - 20
    );
  }
  private drawEnemyName() {
    this.canvasRenderingContext.fillStyle = '#cc0000';
    this.canvasRenderingContext.font = 'bold 18px sans-serif';
    this.canvasRenderingContext.textAlign = 'center';
    this.canvasRenderingContext.fillText(
      this.name,
      this.position.x + this.bounding.width / 2,
      this.position.y + 100
    );
  }

  private fillHealthBars(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }

  protected draw() {
    this.drawEnemy();
    this.drawHealthBars();
    this.drawHealthValue();
    this.drawEnemyName();
  }

  public update() {
    this.draw();
    const waypoint = this.waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.position.y - (this.bounding.height / 2);
    const xDistance = waypoint.x - this.position.x - (this.bounding.width / 2);
    const angle = Math.atan2(yDistance, xDistance);
    this.velocity.x = Math.cos(angle) * this.speed;
    this.velocity.y = Math.sin(angle) * this.speed;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      Math.abs(Math.round(this.position.x + (this.bounding.width / 2)) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.position.y + (this.bounding.height / 2)) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) &&
      this.waypointIndex < this.waypoints.length - 1
    ) this.waypointIndex++;
  }

  public getPosition() { return this.position; }
  public getBounding() { return this.bounding; }
  public getWaypointIndex() { return this.waypointIndex; }
  public decreaseHealth(health: number) { this.health -= health; }
  public getName() { return this.name };
  public getHealth() { return this.health; }
  public getMoney() { return this.money; }
  public getSpeed() { return this.speed; }
  public getScore() { return this.score; }
}

export default Enemy;
