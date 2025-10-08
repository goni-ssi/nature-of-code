import { useEffect, useRef, type HTMLProps } from "react";

export type CanvasProps = HTMLCanvasElement & {
  stageWidth: number;
  stageHeight: number;
  ctx: CanvasRenderingContext2D;
};

export const Canvas = ({ ref, ...props }: HTMLProps<CanvasProps>) => {
  const canvasRef = useRef<CanvasProps>(null);

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

    canvas.stageWidth = stageWidth;
    canvas.stageHeight = stageHeight;
    canvas.ctx = ctx;

    ctx.scale(pixelRatio, pixelRatio);
  }, []);

  return (
    <canvas
      ref={(el: CanvasProps) => {
        canvasRef.current = el;

        if (ref) {
          if (typeof ref === "function") {
            ref(el);
          } else {
            ref.current = el;
          }
        }
      }}
      {...props}
    />
  );
};
