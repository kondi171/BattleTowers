import { Frames, Position } from '../../types';

abstract class Sprite {
    protected canvasRenderingContext: CanvasRenderingContext2D;
    protected position: Position;
    protected image: HTMLImageElement;
    protected frames: Frames;

    constructor(ctx: CanvasRenderingContext2D, { x = 0, y = 0 }: Position, imageSrc: string, frames = { max: 1 }) {
        this.canvasRenderingContext = ctx;
        this.position = {
            x: x,
            y: y
        };
        this.image = new Image();
        this.image.src = imageSrc;
        this.frames = {
            max: frames.max,
            current: 0,
            elapsed: 0,
            hold: 4
        }
    }
    protected abstract draw(angle?: number): void;
    public abstract update(): void;
}

export default Sprite;