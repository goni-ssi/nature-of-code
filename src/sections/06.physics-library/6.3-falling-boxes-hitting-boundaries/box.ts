import type { CanvasProps } from "@/common/components/canvas";
import type { Vector } from "@/common/utils/vector";
import { type Engine, type Body, Bodies, Composite } from "matter-js";

export class Box {
  public canvas: CanvasProps;
  public position: Vector;
  public width: number;
  public height: number;
  public engine: Engine;
  public body: Body;

  constructor({
    canvas,
    position,
    width,
    height,
    engine,
  }: {
    canvas: CanvasProps;
    position: Vector;
    width: number;
    height: number;
    engine: Engine;
  }) {
    this.canvas = canvas;
    this.position = position;
    this.width = width;
    this.height = height;
    this.engine = engine;
    this.body = Bodies.rectangle(position.x, position.y, width, height, {
      friction: 0.01,
      restitution: 0.75,
    });
    Composite.add(engine.world, this.body);
  }

  draw() {
    this.canvas.ctx.save();

    this.canvas.ctx.translate(this.body.position.x, this.body.position.y);
    this.canvas.ctx.rotate(this.body.angle);
    this.canvas.ctx.beginPath();
    this.canvas.ctx.rect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.canvas.ctx.fillStyle = "blue";
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();
    this.canvas.ctx.restore();
  }

  remove() {
    Composite.remove(this.engine.world, this.body);
  }
}
