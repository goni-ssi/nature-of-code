export class MousePointer {
  private x: number;
  private y: number;

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;

    document.addEventListener("mousemove", (event) => {
      this.x = event.clientX - x;
      this.y = event.clientY - y;
    });
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}
