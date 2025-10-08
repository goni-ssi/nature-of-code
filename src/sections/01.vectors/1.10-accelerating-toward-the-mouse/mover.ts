import type { CanvasProps } from "@/common/components/canvas";
import { MousePointer } from "../../../common/class/mouse-pointer";
import { Vector } from "../../../common/utils/vector";

export class Mover {
  public canvas: CanvasProps;
  public position: Vector;
  public velocity: Vector;
  private mousePointer: MousePointer;

  constructor({
    canvas,
    position,
    velocity,
  }: {
    canvas: CanvasProps;
    position: Vector;
    velocity: Vector;
  }) {
    this.canvas = canvas;
    this.position = position;
    this.velocity = velocity;
    this.mousePointer = new MousePointer({
      x: this.canvas.ctx.canvas.offsetLeft,
      y: this.canvas.ctx.canvas.offsetTop,
    });
  }

  draw() {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
    this.canvas.ctx.fillStyle = "green";
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();

    this.update();
  }

  update() {
    const mousePosition = this.mousePointer.getPosition();
    const attractor = new Vector(mousePosition.x, mousePosition.y);

    attractor.subtract(this.position);
    attractor.normalize();
    attractor.multiply(0.2);

    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(this.position.x, this.position.y);
    this.canvas.ctx.lineTo(mousePosition.x, mousePosition.y);
    this.canvas.ctx.strokeStyle = "red";
    this.canvas.ctx.stroke();
    this.canvas.ctx.closePath();

    this.velocity.add(attractor);
    this.velocity.limit(10);
    this.position.add(this.velocity);
  }
}
