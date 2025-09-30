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

  constructor({
    ctx,
    position,
    mass,
    stageWidth,
    stageHeight,
  }: {
    ctx: CanvasRenderingContext2D;
    position: Vector;
    mass: number;
    stageWidth: number;
    stageHeight: number;
  }) {
    this.ctx = ctx;
    this.position = position;
    this.mass = mass;
    this.radius = this.mass * 1.5;
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.closePath();

    this.update();
  }

  update() {
    const gravityAcceleration = new Vector(0, 0.98);
    const force = gravityAcceleration.multiply(this.mass);
    // 중력가속도는 9.8 m/s^2 로 고정
    const acceleration = this.applyForce(force, this.acceleration.copy());

    this.velocity.add(acceleration);
    this.position.add(this.velocity);
    this.checkEdges();
  }

  checkEdges() {
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
      this.acceleration.x *= -1;
    }

    if (this.position.x + this.radius > this.stageWidth) {
      this.position.x = this.stageWidth - this.radius;
      this.velocity.x *= -1;
      this.acceleration.x *= -1;
    }

    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
      this.acceleration.y *= -1;
    }

    if (this.position.y + this.radius > this.stageHeight) {
      this.position.y = this.stageHeight - this.radius;
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
