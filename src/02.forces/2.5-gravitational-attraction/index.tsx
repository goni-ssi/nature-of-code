import { useEffect, useRef } from "react";
import { Vector } from "../../common/utils/vector";
import { Mover } from "./mover";

export const GravitationalAttraction = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const pixelRatio = devicePixelRatio > 1 ? 2 : 1;
    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;

    ctx.canvas.width = stageWidth * pixelRatio;
    ctx.canvas.height = stageHeight * pixelRatio;

    ctx.scale(pixelRatio, pixelRatio);

    const movers = Array.from(
      { length: 10 },
      () =>
        new Mover({
          ctx,
          stageWidth,
          stageHeight,
          position: new Vector(
            Math.random() * stageWidth,
            Math.random() * stageHeight
          ),
          velocity: new Vector(Math.random() * 2, Math.random() * 2),
          mass: Math.random() * 20 + 10,
          color: "green",
        })
    );

    const animate = () => {
      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, stageWidth, stageHeight);

        movers.forEach((mover1) => {
          movers.forEach((mover2) => {
            if (mover1 !== mover2) {
              mover1.attract(mover2);
            }
          });
        });

        movers.forEach((mover) => {
          mover.draw();
        });

        animate();
      });
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} />;
};
