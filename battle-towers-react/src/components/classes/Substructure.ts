import { Position, Color, Mouse } from '../../types';

class Substructure {
  private canvasRenderingContext: CanvasRenderingContext2D;
  private position: Position;
  private radius: number = 64;
  private fieldColor: Color;
  private borderColor: Color;
  private occupied: boolean;
  private size: number = 128;
  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position) {
    this.canvasRenderingContext = ctx;
    this.position = {
      x: x,
      y: y
    }
    this.fieldColor = `rgba(${0}, ${206}, ${0}, ${0})`;
    this.borderColor = `rgba(${0}, ${206}, ${0}, ${0})`;
    this.occupied = false;
  }

  private draw() {
    this.canvasRenderingContext.beginPath();
    this.canvasRenderingContext.arc(this.position.x + this.radius, this.position.y + this.radius, this.radius * 1.55, 0, 2 * Math.PI);
    this.canvasRenderingContext.fillStyle = this.fieldColor;
    this.canvasRenderingContext.strokeStyle = this.borderColor;
    this.canvasRenderingContext.lineWidth = 2;
    this.canvasRenderingContext.fill();
    this.canvasRenderingContext.stroke();
  }

  public update(mouse: Mouse) {
    this.draw();
    const distance = Math.sqrt(Math.pow(mouse.x - (this.position.x + this.radius), 2) + Math.pow(mouse.y - (this.position.y + this.radius), 2));
    if (distance <= this.radius) {
      // const alpha = 0.5 - distance / (2 * this.radius);
      this.fieldColor = `rgba(${0}, ${206}, ${0}, ${0.3})`;
      this.borderColor = `rgba(${0}, ${206}, ${0}, ${0.6})`;
    } else {
      this.fieldColor = `rgba(${0}, ${206}, ${0}, ${0})`;
      this.borderColor = `rgba(${0}, ${206}, ${0}, ${0})`;
    }
  }
  public getPosition() { return this.position; }
  public getRadius() { return this.radius; }
  public getOccupied() { return this.occupied; }
  public setOccupied(occupied: boolean) { this.occupied = occupied; }
  public getSize() { return this.size; }
}

export default Substructure;