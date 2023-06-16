import { Mouse } from "./../typescript/types";

interface MouseMoveParameters {
  event: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  tacticalMode: boolean;
  setMousePosition: React.Dispatch<React.SetStateAction<Mouse>>;
  updateSubstructures: (mouse: Mouse) => void;
}

const mouseMove = ({ event, canvasRef, tacticalMode, setMousePosition, updateSubstructures }: MouseMoveParameters) => {
  const canvasTopOffset = canvasRef.current!.getBoundingClientRect().top;
  const canvasLeftOffset = canvasRef.current!.getBoundingClientRect().left;
  const x = event.clientX - canvasLeftOffset;
  const y = event.clientY - canvasTopOffset;
  setMousePosition({ x, y });
  if (tacticalMode) return;
  updateSubstructures({ x, y });
};

export default mouseMove;