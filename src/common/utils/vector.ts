export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  subtract(vector: Vector) {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  multiply(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  divide(scalar: number) {
    this.x /= scalar;
    this.y /= scalar;

    return this;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const magnitude = this.magnitude();

    if (magnitude === 0) return this;

    this.x /= magnitude;
    this.y /= magnitude;

    return this;
  }

  limit(max: number) {
    const magnitude = this.magnitude();
    if (magnitude > max) {
      this.normalize();
      this.multiply(max);
    }
  }

  copy() {
    return new Vector(this.x, this.y);
  }
}
