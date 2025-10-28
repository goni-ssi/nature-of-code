import { useEffect, useRef } from "react";
import { Vector } from "../../../common/utils/vector";

import { Canvas, type CanvasProps } from "@/common/components/canvas";
import { Emitter } from "./emitter";

const FlowerDance = () => {
  const canvasRef = useRef<CanvasProps>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const emitter = new Emitter({
      canvas,
      position: new Vector(canvas.stageWidth / 2, canvas.stageHeight / 6),
      velocity: new Vector(0, 0),
    });

    const animate = () => {
      requestAnimationFrame(() => {
        canvas.ctx.clearRect(0, 0, canvas.stageWidth, canvas.stageHeight);
        emitter.draw();
        animate();
      });
    };

    animate();
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default FlowerDance;
