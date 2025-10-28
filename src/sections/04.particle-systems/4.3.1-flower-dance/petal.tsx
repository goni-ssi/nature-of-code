import type { CanvasProps } from "@/common/components/canvas";
import { Vector } from "@/common/utils/vector";

export class Petal {
  public canvas: CanvasProps;
  public position: Vector;
  public velocity: Vector;
  public acceleration: Vector;
  public lifespan: number;
  public width: number;
  public height: number;
  public angle: number;

  constructor({
    canvas,
    position,
    velocity,
    lifespan,
    width,
    height,
  }: {
    canvas: CanvasProps;
    position: Vector;
    velocity: Vector;
    lifespan: number;
    width: number;
    height: number;
  }) {
    this.canvas = canvas;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = new Vector(0, 0);
    this.lifespan = lifespan;
    this.width = width;
    this.height = height;
    this.angle = 0;
  }

  draw() {
    this.canvas.ctx.save(); // 현재 캔버스 상태 저장
    this.canvas.ctx.translate(this.position.x, this.position.y); // 캔버스 원점을 꽃잎의 위치로 이동
    this.canvas.ctx.rotate(this.angle + (3 * Math.PI) / 2); // 지정된 각도만큼 회전

    // 베지어 곡선을 사용하여 꽃잎 모양 그리기
    this.canvas.ctx.beginPath();

    // 시작점 (아래쪽 뾰족한 부분)
    this.canvas.ctx.moveTo(0, this.height / 2);

    // 왼쪽 절반 (하트 모양의 왼쪽 곡선)
    // control points: (cp1x, cp1y), (cp2x, cp2y)
    // end point: (endx, endy)
    this.canvas.ctx.bezierCurveTo(
      -this.width / 2,
      this.height / 3, // 제어점 1
      -this.width / 3,
      -this.height / 2, // 제어점 2
      0,
      -this.height / 2.5 // 끝점 (윗부분 가운데)
    );

    // 오른쪽 절반 (하트 모양의 오른쪽 곡선)
    this.canvas.ctx.bezierCurveTo(
      this.width / 3,
      -this.height / 2, // 제어점 3
      this.width / 2,
      this.height / 3, // 제어점 4
      0,
      this.height / 2 // 끝점 (시작점으로 돌아감)
    );

    this.canvas.ctx.closePath();

    // 스타일 적용 및 채우기
    this.canvas.ctx.fillStyle = `rgba(255, 164, 179, ${this.lifespan})`;
    this.canvas.ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    this.canvas.ctx.shadowBlur = 5;
    this.canvas.ctx.fill();

    this.canvas.ctx.restore(); // 저장된 캔버스 상태 복원

    this.update();
  }

  update() {
    const gravity = new Vector(0, 0.01);

    this.acceleration.add(gravity);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.angle = Math.atan2(this.velocity.y, this.velocity.x);
    this.acceleration.multiply(0);
    this.lifespan -= 0.01;
  }
}
