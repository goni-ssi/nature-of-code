import { useEffect, useRef } from "react";
import { Vector } from "../../../common/utils/vector";
import { Mover } from "./mover";
import { Canvas, type CanvasProps } from "@/common/components/canvas";
import { random } from "es-toolkit";

const NBodies = () => {
  const canvasRef = useRef<CanvasProps>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const movers = [
      ...Array.from(
        { length: 5 },
        () =>
          new Mover({
            canvas,
            position: new Vector(
              random((canvas.stageWidth / 5) * 1, (canvas.stageWidth / 5) * 4),
              random((canvas.stageHeight / 5) * 1, (canvas.stageHeight / 5) * 4)
            ),
            velocity: new Vector(Math.random(), Math.random()),
            mass: Math.random() * 20 + 10,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
          })
      ),
    ];

    const animate = () => {
      requestAnimationFrame(() => {
        canvas.ctx.clearRect(0, 0, canvas.stageWidth, canvas.stageHeight);

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

  return <Canvas ref={canvasRef} />;
};

export default NBodies;
