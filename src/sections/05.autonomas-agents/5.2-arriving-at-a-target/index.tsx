import { useEffect, useRef } from "react";
import { Vector } from "../../../common/utils/vector";

import { Canvas, type CanvasProps } from "@/common/components/canvas";
import { Vehicle } from "./vehicle";

const SeekingATarget = () => {
  const canvasRef = useRef<CanvasProps>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const vehicle = new Vehicle({
      canvas,
      position: new Vector(canvas.stageWidth / 2, canvas.stageHeight / 6),
    });

    const animate = () => {
      requestAnimationFrame(() => {
        canvas.ctx.clearRect(0, 0, canvas.stageWidth, canvas.stageHeight);
        vehicle.seek();
        vehicle.update();
        vehicle.draw();
        animate();
      });
    };

    animate();
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default SeekingATarget;
