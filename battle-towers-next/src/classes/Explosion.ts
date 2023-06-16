import { Position } from "@/typescript/types";
import Sprite from "./Sprite";

class Explosion extends Sprite {
  constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, imageSrc: string, frames = { max: 1 }) {
    super(ctx, { x: x, y: y }, imageSrc, frames);
  }
  protected draw() {
    const cropWidth = this.image.width / this.frames.max;
    const crop = {
      position: {
        x: cropWidth * this.frames.current,
        y: 0
      },
      width: cropWidth,
      height: this.image.height
    }
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
    this.frames.elapsed++;
    if (this.frames.elapsed % this.frames.hold === 0) {
      this.frames.current++;
      if (this.frames.current >= this.frames.max) this.frames.current = 0;
    }
  }

  public update() {
    this.draw();
  }
}
export default Explosion;