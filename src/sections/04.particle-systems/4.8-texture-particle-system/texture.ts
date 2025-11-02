import type { CanvasProps } from "@/common/components/canvas";
import { randomGaussian } from "@/common/utils/gaussian";
import { Vector } from "@/common/utils/vector";

export class Texture {
  public canvas: CanvasProps;
  public position: Vector;
  public lifespan: number;
  public acceleration: Vector;
  public velocity: Vector;

  constructor({ canvas, position }: { canvas: CanvasProps; position: Vector }) {
    this.canvas = canvas;
    this.position = position;
    this.lifespan = 1.5;
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(
      randomGaussian(0, 0.5),
      randomGaussian(-0.5, 0.05)
    );
  }

  draw() {
    this.canvas.ctx.globalCompositeOperation = "lighter";
    this.canvas.ctx.beginPath();
    const gradient = this.canvas.ctx.createRadialGradient(
      this.position.x,
      this.position.y,
      0,
      this.position.x,
      this.position.y,
      10
    );
    gradient.addColorStop(0, `rgba(255, 30, 30, ${this.lifespan})`);
    gradient.addColorStop(1, "rgba(255, 30, 30, 0)");
    this.canvas.ctx.fillStyle = gradient;
    this.canvas.ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();

    this.lifespan -= 0.01;
  }

  update(mouse: Vector) {
    const force = mouse.copy().subtract(this.position);
    force.normalize();
    force.multiply(0.05);
    this.applyForce(force);

    this.acceleration.add(this.acceleration);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.multiply(0);
    this.lifespan -= 0.01;
  }

  applyForce(force: Vector) {
    this.acceleration.add(force);
  }
}
