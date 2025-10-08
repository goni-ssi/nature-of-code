import { useEffect, useRef } from "react";
import { Vector } from "../../../common/utils/vector";
import { Mover } from "./mover";
import { Canvas, type CanvasProps } from "@/common/components/canvas";

const AcceleratingTowardTheMouse = () => {
  const canvasRef = useRef<CanvasProps>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const mover = new Mover({
      canvas,
      position: new Vector(0, 0),
      velocity: new Vector(4, 4),
    });

    const animate = () => {
      requestAnimationFrame(() => {
        canvas.ctx.clearRect(0, 0, canvas.stageWidth, canvas.stageHeight);
        mover.draw();
        animate();
      });
    };

    animate();
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default AcceleratingTowardTheMouse;
