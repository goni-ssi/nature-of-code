import { useEffect, useRef } from "react";

import { Canvas, type CanvasProps } from "@/common/components/canvas";
import { Texture } from "./texture";
import { Vector } from "@/common/utils/vector";
import { Emitter } from "./emitter";
import { randomGaussian } from "@/common/utils/gaussian";

const TextureParticleSystem = () => {
  const canvasRef = useRef<CanvasProps>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    canvas.style.backgroundColor = "black";

    const emitter = new Emitter({
      canvas,
      position: new Vector(canvas.stageWidth / 2, canvas.stageHeight / 2),
    });

    const animate = () => {
      requestAnimationFrame(() => {
        canvas.ctx.clearRect(0, 0, canvas.stageWidth, canvas.stageHeight);
        const textures = Array.from(
          { length: 3 },
          () =>
            new Texture({
              canvas,
              position: new Vector(
                canvas.stageWidth / 2 + randomGaussian(0, 2),
                canvas.stageHeight / 2
              ),
            })
        );
        textures.forEach((texture) => emitter.addParticle(texture));
        emitter.draw();
        animate();
      });
    };

    animate();
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default TextureParticleSystem;
