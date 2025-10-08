import { MousePointer } from "../../../common/class/mouse-pointer";
import { Vector } from "../../../common/utils/vector";

export class Mover {
  public ctx: CanvasRenderingContext2D;
  public position: Vector;
  public velocity: Vector;
  private mousePointer: MousePointer;

  constructor({
    ctx,
    position,
    velocity,
  }: {
    ctx: CanvasRenderingContext2D;
    position: Vector;
    velocity: Vector;
  }) {
    this.ctx = ctx;
    this.position = position;
    this.velocity = velocity;
    this.mousePointer = new MousePointer();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.closePath();

    this.update();
  }

  update() {
    const mousePosition = this.mousePointer.getPosition();
    const attractor = new Vector(mousePosition.x, mousePosition.y);

    attractor.subtract(this.position);
    attractor.normalize();
    attractor.multiply(0.2);

    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x, this.position.y);
    this.ctx.lineTo(mousePosition.x, mousePosition.y);
    this.ctx.strokeStyle = "red";
    this.ctx.stroke();
    this.ctx.closePath();

    this.velocity.add(attractor);
    this.velocity.limit(10);
    this.position.add(this.velocity);
  }
}
