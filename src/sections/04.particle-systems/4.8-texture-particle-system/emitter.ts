import type { CanvasProps } from "@/common/components/canvas";
import { Vector } from "@/common/utils/vector";
import type { Texture } from "./texture";
import { MousePointer } from "@/common/class/mouse-pointer";

export class Emitter {
  public canvas: CanvasProps;
  public position: Vector;
  public particles: Texture[];
  public mousePointer: MousePointer;

  constructor({ canvas, position }: { canvas: CanvasProps; position: Vector }) {
    this.canvas = canvas;
    this.position = position;
    this.particles = [];
    this.mousePointer = new MousePointer({
      x: this.canvas.ctx.canvas.offsetLeft,
      y: this.canvas.ctx.canvas.offsetTop,
    });
  }

  draw() {
    this.particles.forEach((particle) => particle.draw());
    this.update();
  }

  update() {
    const mouse = this.mousePointer.getPosition();
    this.particles.forEach((particle) =>
      particle.update(new Vector(mouse.x, mouse.y))
    );
    this.particles = this.particles.filter((particle) => particle.lifespan > 0);
  }

  addParticle(particle: Texture) {
    this.particles.push(particle);
  }
}
