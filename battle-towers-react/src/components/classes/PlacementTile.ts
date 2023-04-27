import { Position, Color, Mouse } from '../../types';

class PlacementTile {
  private canvasRenderingContext: CanvasRenderingContext2D;
  private position: Position;
  private size: number = 128;
  private color: Color;
  private occupied: boolean;

  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
    this.canvasRenderingContext = ctx;
    this.position = {
      x: x,
      y: y
    }
    this.color = `rgba(${255}, ${255}, ${255}, ${0.1})`;
    this.occupied = false;
  }

  private draw() {
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
      this.color = `rgba(${0}, ${206}, ${0}, ${0.5})`;
    } else {
      this.color = `rgba(${255}, ${255}, ${255}, ${0.1})`;
    }
  }
  public getPosition() { return this.position; }
  public getSize() { return this.size; }
  public getOccupied() { return this.occupied; }
  public setOccupied(occupied: boolean) { this.occupied = occupied; }
}

export default PlacementTile;