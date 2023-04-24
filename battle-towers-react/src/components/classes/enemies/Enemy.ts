import { Direction } from '../../../enums';
import { Bounding, Position } from '../../../types';
import Sprite from '../Sprite';
import enemy from './../../../assets/img/sprites/enemies/commonOrc.png';

class Enemy extends Sprite {

  private waypoints: Position[];
  private bounding: Bounding;
  private waypointIndex: number;
  private health: number;
  private velocity: Position;
  private speed: number;
  private direction: Direction | null;

  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, waypoints: Position[]) {
    super(ctx, { x: x, y: y }, enemy, { max: 7 });
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
      if (this.frames.current >= this.frames.max - 1) this.frames.current = 0;
    }
  }

  private drawHealthBars() {
    this.canvasRenderingContext.fillStyle = '#cc0000';
    this.canvasRenderingContext.fillRect(this.position.x, this.position.y - 15, this.bounding.width, 10);

    this.canvasRenderingContext.fillStyle = '#00c700';
    this.canvasRenderingContext.fillRect(this.position.x, this.position.y - 15, this.bounding.width * this.health / 100, 10);
  }

  protected draw() {
    this.drawEnemy();
    this.drawHealthBars();
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
  public getHealth() { return this.health };
  public decreaseHealth(health: number) { this.health -= health };
  public getWaypointIndex() { return this.waypointIndex; }
}

export default Enemy;
