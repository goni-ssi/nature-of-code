import type { CanvasProps } from "@/common/components/canvas";
import type { Vector } from "@/common/utils/vector";
import { Bodies, Composite, Engine, type Body } from "matter-js";

export class Boundary {
  public canvas: CanvasProps;
  public position: Vector;
  public width: number;
  public height: number;
  public engine: Engine;
  private body: Body;

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
      isStatic: true,
    });
    Composite.add(engine.world, this.body);
  }

  draw() {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.rect(
      this.position.x - this.width / 2,
      this.position.y - this.height / 2,
      this.width,
      this.height
    );
    this.canvas.ctx.fillStyle = "red";
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();
  }
}
