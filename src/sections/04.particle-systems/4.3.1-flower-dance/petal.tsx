import type { CanvasProps } from "@/common/components/canvas";
import { Vector } from "@/common/utils/vector";

export class Petal {
  public canvas: CanvasProps;
  public position: Vector;
  public velocity: Vector;
  public acceleration: Vector;
  public lifespan: number;
  public width: number;
  public height: number;
  public angle: number;

  constructor({
    canvas,
    position,
    velocity,
    lifespan,
    width,
    height,
  }: {
    canvas: CanvasProps;
    position: Vector;
    velocity: Vector;
    lifespan: number;
    width: number;
    height: number;
  }) {
    this.canvas = canvas;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = new Vector(0, 0);
    this.lifespan = lifespan;
    this.width = width;
    this.height = height;
    this.angle = 0;
  }

  draw() {
    this.canvas.ctx.save();
    this.canvas.ctx.beginPath();
    this.canvas.ctx.translate(this.position.x, this.position.y - 50);
    this.canvas.ctx.rotate(this.angle);
    this.canvas.ctx.rect(0, 0, this.width, this.height);
    this.canvas.ctx.fillStyle = `rgba(255, 164, 179, ${this.lifespan})`;
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();

    this.canvas.ctx.restore();

    this.update();
  }

  update() {
    const gravity = new Vector(0, 0.01);

    this.acceleration.add(gravity);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.angle = Math.atan2(this.velocity.y, this.velocity.x);
    this.acceleration.multiply(0);
    this.lifespan -= 0.01;
  }
}
