import { useEffect, useRef } from "react";
import { Vector } from "../../../common/utils/vector";
import { Mover } from "./mover";

const GravityAndAirResistance = () => {
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

    const mover1 = new Mover({
      ctx,
      stageWidth,
      stageHeight,
      position: new Vector(stageWidth / 3, stageHeight / 2),
      mass: 20,
      color: "green",
    });

    const mover2 = new Mover({
      ctx,
      stageWidth,
      stageHeight,
      position: new Vector((stageWidth / 3) * 2, stageHeight / 2),
      mass: 50,
      color: "orange",
    });

    const animate = () => {
      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, stageWidth, stageHeight);
        mover1.draw();
        mover2.draw();
        animate();
      });
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default GravityAndAirResistance;
