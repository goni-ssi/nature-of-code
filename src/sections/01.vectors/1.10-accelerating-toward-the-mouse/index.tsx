import { useEffect, useRef } from "react";
import { Vector } from "../../../common/utils/vector";
import { Mover } from "./mover";

const AcceleratingTowardTheMouse = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const pixelRatio = devicePixelRatio > 1 ? 2 : 1;
    const stageWidth = canvas.clientWidth;
    const stageHeight = canvas.clientHeight;

    ctx.canvas.width = stageWidth * pixelRatio;
    ctx.canvas.height = stageHeight * pixelRatio;

    ctx.scale(pixelRatio, pixelRatio);

    const mover = new Mover({
      ctx,
      position: new Vector(0, 0),
      velocity: new Vector(4, 4),
    });

    const animate = () => {
      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, stageWidth, stageHeight);
        mover.draw();
        animate();
      });
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default AcceleratingTowardTheMouse;
