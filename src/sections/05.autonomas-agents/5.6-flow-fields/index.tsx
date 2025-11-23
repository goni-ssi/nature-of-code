import { useEffect, useRef } from "react";
import { Vector } from "../../../common/utils/vector";

import { Canvas, type CanvasProps } from "@/common/components/canvas";
import { FlowField } from "./flow-field";

const FlowFields = () => {
  const canvasRef = useRef<CanvasProps>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const resolution = 40;
    const cols = Math.floor(canvas.stageWidth / resolution);
    const rows = Math.floor(canvas.stageHeight / resolution);
    const flowFields: FlowField[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const center = new Vector(
          canvas.stageWidth / 2,
          canvas.stageHeight / 2
        );
        const current = new Vector(i * resolution, j * resolution);
        const direction = center.subtract(current);
        const rotated = direction.rotate(Math.PI / 2);
        const flow = rotated.normalize();

        if (i === 0) {
          console.log(flow);
        }

        flowFields.push(
          new FlowField({
            canvas,
            flow,
            point: new Vector(i * resolution, j * resolution),
            resolution,
          })
        );
      }
    }

    const animate = () => {
      requestAnimationFrame(() => {
        canvas.ctx.clearRect(0, 0, canvas.stageWidth, canvas.stageHeight);

        flowFields.forEach((flowField) => {
          flowField.draw();
        });

        animate();
      });
    };

    animate();
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default FlowFields;
