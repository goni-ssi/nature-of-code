import type { CanvasProps } from "@/common/components/canvas";
import { Vector } from "@/common/utils/vector";
import { Particle } from "./particle";

export class Emitter {
  public canvas: CanvasProps;
  public position: Vector;
  public velocity: Vector;
  public particles: Particle[];

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

    this.particles = [
      ...this.particles,
      ...Array.from(
        { length: 3 },
        () =>
          new Particle({
            canvas: this.canvas,
            position: this.position.copy(),
            velocity: new Vector(Math.random() * 2 - 1, Math.random() * 2),
            lifespan: Math.random() * 1 + 0.5,
          })
      ),
    ].filter((particle) => particle.lifespan > 0);
  }
}
