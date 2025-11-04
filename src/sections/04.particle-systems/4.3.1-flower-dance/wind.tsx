import type { CanvasProps } from "@/common/components/canvas";
import type { Vector } from "@/common/utils/vector";

export class Wind {
  public canvas: CanvasProps;
  public positions: Vector[];
  public lifespan: number;

  constructor({ canvas, lifespan }: { canvas: CanvasProps; lifespan: number }) {
    this.canvas = canvas;
    this.positions = [];
    this.lifespan = lifespan;
  }

  draw() {
    this.positions.forEach((position) => {
      this.canvas.ctx.beginPath();
      this.canvas.ctx.arc(position.x, position.y, 3, 0, Math.PI * 2);
      this.canvas.ctx.fillStyle = "red";
      this.canvas.ctx.fill();
      this.canvas.ctx.closePath();

      this.update();
    });
  }

  update() {
    this.lifespan -= 0.01;
  }

  addPosition(position: Vector) {
    this.positions.push(position);
  }
}
