import worldData from './../worlds/desert.json';
import { Bounding, Position } from '../../types';

class Enemy {
  private canvasRenderingContext: CanvasRenderingContext2D;
  private position: Position;
  private bounding: Bounding;
  private waypointIndex: number;

  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
    this.canvasRenderingContext = ctx;
    this.position = {
      x: x,
      y: y
    }
    this.bounding = {
      width: 64,
      height: 64,
      radius: 64
    }
    this.waypointIndex = 0;
  }

  public draw() {
    this.canvasRenderingContext.fillStyle = 'red';
    // this.canvasRenderingContext.fillRect(this.position.x, this.position.y, this.bounding.width, this.bounding.height);
    this.canvasRenderingContext.beginPath();
    this.canvasRenderingContext.arc(this.position.x + this.bounding.width / 2, this.position.y + this.bounding.height / 2, this.bounding.radius, 0, Math.PI * 2);
    this.canvasRenderingContext.fill();
  }

  public update() {
    this.draw();
    const waypoint = worldData.levels[0].waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.position.y - (this.bounding.height / 2);
    const xDistance = waypoint.x - this.position.x - (this.bounding.width / 2);
    const angle = Math.atan2(yDistance, xDistance);
    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);
    if (
      Math.round(this.position.x + (this.bounding.width / 2)) === Math.round(waypoint.x) &&
      Math.round(this.position.y + (this.bounding.height / 2)) === Math.round(waypoint.y) &&
      this.waypointIndex < worldData.levels[0].waypoints.length - 1
    ) this.waypointIndex++;
  }

  public getPosition() { return this.position; }
  public getBounding() { return this.bounding; }
}

export default Enemy;
