import { Position, Color, Mouse } from '../../types';

class PlacementTile {
  private canvasRenderingContext: CanvasRenderingContext2D;
  private position: Position;
  private size: number;
  private color: Color;
  constructor(ctx: CanvasRenderingContext2D, position: Position) {
    this.position = position;
    this.canvasRenderingContext = ctx;
    this.size = 64;
    this.color = `rgba(${255}, ${255}, ${255}, ${0.1})`;
  }

  public draw() {
    this.canvasRenderingContext.fillStyle = this.color;
    this.canvasRenderingContext.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  public update(mouse: Mouse) {
    this.draw();
    if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.size &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.size
    ) {
      // console.log('colliding');
      // console.log(`x: ${mouse.x}; y: ${mouse.y}`);
      // console.log(`x: ${.x}; y: ${mouse.y}`);
      this.color = `rgba(${255}, ${255}, ${255}, ${1})`;
    }
  }
}

export default PlacementTile;