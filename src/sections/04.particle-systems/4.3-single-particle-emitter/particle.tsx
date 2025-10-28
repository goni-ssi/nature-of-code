import type { CanvasProps } from "@/common/components/canvas";
import { Vector } from "@/common/utils/vector";

export class Particle {
  public canvas: CanvasProps;
  public position: Vector;
  public velocity: Vector;
  public acceleration: Vector;
  public lifespan: number;

  constructor({
    canvas,
    position,
    velocity,
    lifespan,
  }: {
    canvas: CanvasProps;
    position: Vector;
    velocity: Vector;
    lifespan: number;
  }) {
    this.canvas = canvas;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = new Vector(0, 0);
    this.lifespan = lifespan;
  }

  draw() {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    this.canvas.ctx.fillStyle = `rgba(255, 100, 100, ${this.lifespan})`;
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();

    this.update();
  }

  update() {
    const gravity = new Vector(0, 0.01);
    this.acceleration.add(gravity);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.multiply(0);
    this.lifespan -= 0.01;
  }
}
