import { Vector } from "../../common/utils/vector";

export class Mover {
  public ctx: CanvasRenderingContext2D;
  public position: Vector;
  public mass: number;
  public radius: number;
  public velocity: Vector;
  public acceleration: Vector;
  public stageWidth: number;
  public stageHeight: number;
  public color: string;

  constructor({
    ctx,
    position,
    mass,
    stageWidth,
    stageHeight,
    velocity,
    color,
  }: {
    ctx: CanvasRenderingContext2D;
    position: Vector;
    mass: number;
    stageWidth: number;
    velocity: Vector;
    stageHeight: number;
    color: string;
  }) {
    this.ctx = ctx;
    this.position = position;
    this.mass = mass;
    this.radius = this.mass * 1.5;
    this.velocity = velocity;
    this.acceleration = new Vector(0, 0);
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.color = color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();

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
