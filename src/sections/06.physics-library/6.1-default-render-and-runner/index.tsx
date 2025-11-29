import { Canvas, type CanvasProps } from "@/common/components/canvas";
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Render,
  Runner,
  Vector,
} from "matter-js";
import { useEffect, useRef } from "react";

const DefaultRenderAndRunner = () => {
  const canvasRef = useRef<CanvasProps>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const engine = Engine.create();

    const render = Render.create({
      canvas: canvas,
      engine,
      options: { width: canvas.stageWidth, height: canvas.stageHeight },
    });
    Render.run(render);

    const options = { friction: 0.01, restitution: 0.75 };
    const box = Bodies.rectangle(100, 100, 50, 50, options);

    Body.setVelocity(box, Vector.create(5, 0));
    Body.setAngularVelocity(box, 0.1);

    Composite.add(engine.world, box);

    const ground = Bodies.rectangle(
      canvas.stageWidth / 2,
      canvas.stageHeight - 5,
      canvas.stageWidth,
      10,
      {
        isStatic: true,
      }
    );
    Composite.add(engine.world, ground);

    const runner = Runner.create();

    Runner.run(runner, engine);
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default DefaultRenderAndRunner;
