import type { CanvasProps } from "@/common/components/canvas";
import { Vector } from "../../../common/utils/vector";

export class Mover {
  public canvas: CanvasProps;
  public position: Vector;
  public mass: number;
  public radius: number;
  public velocity: Vector;
  public acceleration: Vector;
  public color: string;

  constructor({
    canvas,
    position,
    mass,
    velocity,
    color,
  }: {
    canvas: CanvasProps;
    position: Vector;
    mass: number;
    velocity: Vector;
    color: string;
  }) {
    this.canvas = canvas;
    this.position = position;
    this.mass = mass;
    this.radius = this.mass * 1.5;
    this.velocity = velocity;
    this.acceleration = new Vector(0, 0);
    this.color = color;
  }

  draw() {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
    this.canvas.ctx.fillStyle = this.color;
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();

    this.update();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.multiply(0);
  }

  attract(mover: Mover) {
    const force = mover.position.copy().subtract(this.position);
    const distance = Math.min(Math.max(force.magnitude(), 1), 2);
    const G = 1;
    const magnitude = (G * this.mass * mover.mass) / (distance * distance);
    const attractionForce = force.normalize().multiply(magnitude);

    this.applyForce(attractionForce);
  }

  applyForce(force: Vector) {
    const accelerationByForce = force.divide(this.mass);
    return this.acceleration.add(accelerationByForce);
  }
}
