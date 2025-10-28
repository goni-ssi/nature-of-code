import type { CanvasProps } from "@/common/components/canvas";
import { MousePointer } from "../../../common/class/mouse-pointer";
import { Vector } from "../../../common/utils/vector";

export class Mover {
  public canvas: CanvasProps;
  public position: Vector;
  public velocity: Vector;
  private mousePointer: MousePointer;
  private angle: number;
  private width: number;
  private height: number;

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
    this.angle = 0;
    this.width = 60;
    this.height = 20;
    this.mousePointer = new MousePointer({
      x: this.canvas.ctx.canvas.offsetLeft,
      y: this.canvas.ctx.canvas.offsetTop,
    });
  }

  draw() {
    const mousePosition = this.mousePointer.getPosition();
    const attractor = new Vector(mousePosition.x, mousePosition.y);

    this.drawRect();
    this.drawLine(attractor);
    this.update(attractor);
  }

  drawRect() {
    const centerX = this.position.x + this.width / 2;
    const centerY = this.position.y + this.height / 2;

    this.canvas.ctx.save();
    this.canvas.ctx.translate(centerX, centerY);
    this.canvas.ctx.rotate(this.angle);
    this.canvas.ctx.translate(-centerX, -centerY);

    this.canvas.ctx.beginPath();
    this.canvas.ctx.rect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.canvas.ctx.fillStyle = "green";
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();

    this.canvas.ctx.restore();
  }

  drawLine(attractor: Vector) {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    this.canvas.ctx.lineTo(attractor.x, attractor.y);
    this.canvas.ctx.strokeStyle = "red";
    this.canvas.ctx.stroke();
    this.canvas.ctx.closePath();
  }

  update(attractor: Vector) {
    attractor.subtract(this.position);
    attractor.normalize();
    attractor.multiply(0.2);

    this.angle = Math.atan2(attractor.y, attractor.x);

    this.velocity.add(attractor);
    this.velocity.limit(10);
    this.position.add(this.velocity);
  }
}
