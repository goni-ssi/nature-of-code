import { useEffect, useRef } from "react";
import { Vector } from "../../../common/utils/vector";
import { Mover } from "./mover";

const NBodies = () => {
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

    const movers = Array.from(
      { length: 5 },
      () =>
        new Mover({
          ctx,
          stageWidth,
          stageHeight,
          position: new Vector(
            Math.random() * stageWidth,
            Math.random() * stageHeight
          ),
          velocity: new Vector(Math.random(), Math.random()),
          mass: Math.random() * 20 + 10,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
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

export default NBodies;
