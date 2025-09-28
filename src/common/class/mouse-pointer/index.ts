export class MousePointer {
  private x: number;
  private y: number;

  constructor() {
    this.x = 0;
    this.y = 0;

    document.addEventListener("mousemove", (event) => {
      this.x = event.clientX;
      this.y = event.clientY;
    });
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}
