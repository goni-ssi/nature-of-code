import { MousePointer } from "@/common/class/mouse-pointer";
import type { CanvasProps } from "@/common/components/canvas";
import { Vector } from "@/common/utils/vector";

export class Vehicle {
  public canvas: CanvasProps;
  public position: Vector;
  public velocity: Vector;
  public acceleration: Vector;
  public size: number;
  private angle: number;
  private maxSpeed: number;
  private maxForce: number;
  private mousePointer: MousePointer;

  constructor({ canvas, position }: { canvas: CanvasProps; position: Vector }) {
    this.canvas = canvas;
    this.position = position;
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.size = 20;
    this.mousePointer = new MousePointer({
      x: this.canvas.ctx.canvas.offsetLeft,
      y: this.canvas.ctx.canvas.offsetTop,
    });
    this.maxSpeed = 10;
    this.maxForce = 0.2;
    this.angle = 0;
  }

  draw() {
    this.canvas.ctx.save();
    this.canvas.ctx.translate(this.position.x, this.position.y);
    this.canvas.ctx.rotate(this.angle);
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(0, -this.size / 2);
    this.canvas.ctx.lineTo(this.size, 0);
    this.canvas.ctx.lineTo(0, this.size / 2);
    this.canvas.ctx.lineTo(0, -this.size / 2);
    this.canvas.ctx.fillStyle = "red";
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();
    this.canvas.ctx.restore();

    this.update();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.multiply(0);
    this.angle = Math.atan2(this.velocity.y, this.velocity.x);
  }

  seek() {
    const mousePosition = this.mousePointer.getPosition();
    const target = new Vector(mousePosition.x, mousePosition.y);
    const desired = target.subtract(this.position);
    desired.setMagnitude(this.maxSpeed);

    const steer = desired.subtract(this.velocity);

    steer.limit(this.maxForce);
    this.acceleration.add(steer);
  }
}
