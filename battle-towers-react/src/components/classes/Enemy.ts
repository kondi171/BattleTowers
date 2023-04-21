import { Bounding, Position } from '../../types';

class Enemy {
  private canvasRenderingContext: CanvasRenderingContext2D;
  private waypoints: Position[];
  private position: Position;
  private bounding: Bounding;
  private waypointIndex: number;
  private health: number;
  private velocity: Position;
  private speed: number;
  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, waypoints: Position[]) {
    this.canvasRenderingContext = ctx;
    this.waypoints = waypoints;
    this.position = {
      x: x,
      y: y
    }
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
    this.speed = 3;
    // this.speed = 10;
  }

  private drawEnemy() {
    this.canvasRenderingContext.fillStyle = 'red';
    // this.canvasRenderingContext.fillRect(this.position.x, this.position.y, this.bounding.width, this.bounding.height);
    this.canvasRenderingContext.beginPath();
    this.canvasRenderingContext.arc(this.position.x + this.bounding.width / 2, this.position.y + this.bounding.height / 2, this.bounding.radius, 0, Math.PI * 2);
    this.canvasRenderingContext.fill();
  }

  private drawHealthBars() {
    this.canvasRenderingContext.fillStyle = '#cc0000';
    this.canvasRenderingContext.fillRect(this.position.x, this.position.y - 15, this.bounding.width, 10);

    this.canvasRenderingContext.fillStyle = '#00c700';
    this.canvasRenderingContext.fillRect(this.position.x, this.position.y - 15, this.bounding.width * this.health / 100, 10);
  }

  private draw() {
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
