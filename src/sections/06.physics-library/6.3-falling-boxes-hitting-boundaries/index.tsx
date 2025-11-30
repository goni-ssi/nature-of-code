import { Canvas, type CanvasProps } from "@/common/components/canvas";
import { Vector } from "@/common/utils/vector";
import { Engine } from "matter-js";
import { useEffect, useRef } from "react";
import { Boundary } from "./boundary";
import { Box } from "./box";
import { random } from "@/common/utils/random";

const FallingBoxesHittingBoundaries = () => {
  const canvasRef = useRef<CanvasProps>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const engine = Engine.create();

    const boundaries: Boundary[] = [
      new Boundary({
        canvas,
        position: new Vector(250, (canvas.stageHeight / 5) * 4),
        width: 500,
        height: 50,
        engine,
      }),
      new Boundary({
        canvas,
        position: new Vector(
          canvas.stageWidth - 250,
          (canvas.stageHeight / 5) * 3
        ),
        width: 500,
        height: 50,
        engine,
      }),
    ];

    let boxes: Box[] = [];

    const interval = setInterval(() => {
      boxes.push(
        ...Array.from(
          { length: 2 },
          () =>
            new Box({
              canvas,
              position: new Vector(random(0, canvas.stageWidth), 0),
              width: 50,
              height: 50,
              engine,
            })
        )
      );
    }, 500);

    requestAnimationFrame(() => {
      draw();
    });

    const draw = () => {
      requestAnimationFrame(() => {
        canvas.ctx.clearRect(0, 0, canvas.stageWidth, canvas.stageHeight);

        Engine.update(engine);

        boundaries.forEach((boundary) => {
          boundary.draw();
        });

        boxes.forEach((box) => {
          box.draw();
        });

        draw();

        boxes = boxes.filter((box) => {
          if (box.body.position.y + box.height > canvas.stageHeight) {
            box.remove();

            return false;
          }

          return true;
        });
      });
    };

    return () => clearInterval(interval);
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default FallingBoxesHittingBoundaries;
