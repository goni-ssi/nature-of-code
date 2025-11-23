import type { CanvasProps } from "@/common/components/canvas";
import type { Vector } from "@/common/utils/vector";

export class FlowField {
  public canvas: CanvasProps;
  public point: Vector;
  public resolution: number;
  public flow: Vector;

  constructor({
    canvas,
    flow,
    point,
    resolution,
  }: {
    canvas: CanvasProps;
    flow: Vector;
    point: Vector;
    resolution: number;
  }) {
    this.canvas = canvas;
    this.flow = flow;
    this.point = point;
    this.resolution = resolution;
  }

  draw() {
    const width = this.resolution / 2;
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(this.point.x + width, this.point.y + width);
    this.canvas.ctx.lineTo(
      this.point.x + width + this.flow.x * width,
      this.point.y + width + this.flow.y * width
    );
    this.canvas.ctx.strokeStyle = "red";
    this.canvas.ctx.lineWidth = 1;
    this.canvas.ctx.stroke();
    this.canvas.ctx.closePath();
  }

  lookup(point: Vector) {}
}
