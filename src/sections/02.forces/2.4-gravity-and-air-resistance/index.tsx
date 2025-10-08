import { Canvas, type CanvasProps } from "@/common/components/canvas";
import { useEffect, useRef } from "react";
import { Vector } from "../../../common/utils/vector";
import { Mover } from "./mover";

const GravityAndAirResistance = () => {
  const canvasRef = useRef<CanvasProps>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const mover1 = new Mover({
      canvas,

      position: new Vector(canvas.stageWidth / 3, canvas.stageHeight / 2),
      mass: 20,
      color: "green",
    });

    const mover2 = new Mover({
      canvas,
      position: new Vector((canvas.stageWidth / 3) * 2, canvas.stageHeight / 2),
      mass: 50,
      color: "orange",
    });

    const animate = () => {
      requestAnimationFrame(() => {
        canvas.ctx.clearRect(0, 0, canvas.stageWidth, canvas.stageHeight);
        mover1.draw();
        mover2.draw();
        animate();
      });
    };

    animate();
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default GravityAndAirResistance;
