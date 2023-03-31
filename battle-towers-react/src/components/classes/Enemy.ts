import worldData from './../worlds/desert.json';

type position = {
  x: number,
  y: number
};
type bounding = {
  width: number,
  height: number
};

class Enemy {
  private canvasRenderingContext: CanvasRenderingContext2D;
  private position: position;
  private bounding: bounding;
  private waypointIndex: number;

  constructor(ctx: CanvasRenderingContext2D, position: position) {
    this.position = position;
    this.bounding = {
      width: 64,
      height: 64,
    }
    this.canvasRenderingContext = ctx;
    this.waypointIndex = 0;
  }

  public draw() {
    this.canvasRenderingContext.fillStyle = 'red';
    this.canvasRenderingContext.fillRect(this.position.x, this.position.y, this.bounding.width, this.bounding.height);
  }

  public update() {
    this.draw();

    const waypoint = worldData.levels[0].waypoints[this.waypointIndex];
    // console.log(waypoint);
    const yDistance = waypoint.y - this.position.y - (this.bounding.height / 2);
    const xDistance = waypoint.x - this.position.x - (this.bounding.width / 2);
    const angle = Math.atan2(yDistance, xDistance);
    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);
    // console.log(Math.round(this.position.x), waypoint.x);
    if (
      Math.round(this.position.x + (this.bounding.width / 2)) === waypoint.x &&
      Math.round(this.position.y + (this.bounding.height / 2)) === waypoint.y &&
      this.waypointIndex < worldData.levels[0].waypoints.length - 1
    ) this.waypointIndex++;

  }
}

export default Enemy;