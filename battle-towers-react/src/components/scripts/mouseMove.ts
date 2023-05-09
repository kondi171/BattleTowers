import { Mouse } from "../../types";

interface MouseMoveParameters {
  event: React.MouseEvent<HTMLCanvasElement>;
  setMousePosition: React.Dispatch<React.SetStateAction<Mouse>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const mouseMove = ({ event, setMousePosition, canvasRef }: MouseMoveParameters) => {
  const canvasTopOffset = canvasRef.current!.getBoundingClientRect().top;
  const canvasLeftOffset = canvasRef.current!.getBoundingClientRect().left;
  const x = event.clientX - canvasLeftOffset;
  const y = event.clientY - canvasTopOffset;
  setMousePosition({ x, y });
};

export default mouseMove;