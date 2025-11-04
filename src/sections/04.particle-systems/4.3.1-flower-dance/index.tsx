import { useEffect, useRef } from "react";
import { Vector } from "../../../common/utils/vector";

import { Canvas, type CanvasProps } from "@/common/components/canvas";
import { Emitter } from "./emitter";
import { Wind } from "./wind";

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

    let winds: Wind[] = [];
    const isMouseDownRef = { current: false };

    const mouseDownHandler = () => {
      winds.push(new Wind({ canvas, lifespan: 10 }));
      isMouseDownRef.current = true;
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      const lastWind = winds[winds.length - 1];

      if (lastWind && isMouseDownRef.current) {
        lastWind.addPosition(
          new Vector(
            event.clientX - canvas.ctx.canvas.offsetLeft,
            event.clientY - canvas.ctx.canvas.offsetTop
          )
        );
        lastWind.lifespan = 100;
      }
    };

    const mouseUpHandler = () => {
      isMouseDownRef.current = false;
    };

    canvas.ctx.canvas.addEventListener("mousedown", mouseDownHandler);
    canvas.ctx.canvas.addEventListener("mouseup", mouseUpHandler);
    canvas.ctx.canvas.addEventListener("mousemove", mouseMoveHandler);

    const animate = () => {
      requestAnimationFrame(() => {
        canvas.ctx.clearRect(0, 0, canvas.stageWidth, canvas.stageHeight);
        winds.forEach((wind) => wind.draw());
        winds = winds.filter((wind) => wind.lifespan > 0);
        emitter.draw();
        animate();
      });
    };

    animate();

    return () => {
      canvas.ctx.canvas.removeEventListener("mousedown", mouseDownHandler);
      canvas.ctx.canvas.removeEventListener("mouseup", mouseUpHandler);
      canvas.ctx.canvas.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default FlowerDance;
