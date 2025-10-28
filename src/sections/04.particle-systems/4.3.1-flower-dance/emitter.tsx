import type { CanvasProps } from "@/common/components/canvas";
import { Vector } from "@/common/utils/vector";
import { Petal } from "./petal";

export class Emitter {
  public canvas: CanvasProps;
  public position: Vector;
  public velocity: Vector;
  public particles: Petal[];

  constructor({
    canvas,
    position,
    velocity,
  }: {
    canvas: CanvasProps;
    position: Vector;
    velocity: Vector;
  }) {
    this.canvas = canvas;
    this.position = position;
    this.velocity = velocity;
    this.particles = [];
  }

  draw() {
    this.particles.forEach((particle) => particle.draw());

    const addPetal = Math.random() > 0.8;

    this.particles = addPetal
      ? [
          ...this.particles,
          new Petal({
            canvas: this.canvas,
            position: new Vector(Math.random() * this.canvas.stageWidth, -10),
            velocity: new Vector(Math.random() * 2 - 1, Math.random() * 2),
            lifespan: Math.random() * 1 + 2,
            width: 25,
            height: 25,
          }),
        ]
      : this.particles;
    this.particles = this.particles.filter((particle) => particle.lifespan > 0);
  }
}
