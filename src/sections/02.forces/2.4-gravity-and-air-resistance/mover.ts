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
    color,
  }: {
    canvas: CanvasProps;
    position: Vector;
    mass: number;
    color: string;
  }) {
    this.canvas = canvas;
    this.position = position;
    this.mass = mass;
    this.radius = this.mass * 1.5;
    this.velocity = new Vector(0, 0);
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
    const gravityAcceleration = this.applyGravity(this.acceleration.copy());

    this.velocity.add(gravityAcceleration);

    const dragAcceleration = this.applyDrag(gravityAcceleration.copy());
    this.velocity.add(dragAcceleration);

    this.position.add(this.velocity);
    this.checkEdges();
  }

  applyGravity(acceleration: Vector) {
    const gravity = new Vector(0, 0.98);
    const force = gravity.multiply(this.mass);

    const gravityAcceleration = this.applyForce(force, acceleration.copy());
    return gravityAcceleration;
  }

  applyDrag(acceleration: Vector) {
    const dragCoefficient = 0.01;
    const crossSectionArea = (Math.PI * this.radius) / 100;
    const dragMagnitude = this.velocity.magnitude() ^ 2;
    const dragForce = this.velocity
      .copy()
      .multiply(-dragCoefficient * dragMagnitude * crossSectionArea);

    const dragAcceleration = this.applyForce(dragForce, acceleration.copy());
    return dragAcceleration;
  }

  checkEdges() {
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
      this.acceleration.x *= -1;
    }

    if (this.position.x + this.radius > this.canvas.stageWidth) {
      this.position.x = this.canvas.stageWidth - this.radius;
      this.velocity.x *= -1;
      this.acceleration.x *= -1;
    }

    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
      this.acceleration.y *= -1;
    }

    if (this.position.y + this.radius > this.canvas.stageHeight) {
      this.position.y = this.canvas.stageHeight - this.radius;
      this.velocity.y *= -1;
      this.acceleration.y *= -1;
    }

    return null;
  }

  applyForce(force: Vector, acceleration: Vector) {
    const accelerationByForce = force.divide(this.mass);
    return acceleration.add(accelerationByForce);
  }
}
