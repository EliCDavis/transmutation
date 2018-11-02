import { Random } from "./random";
export { Vector };

/**
 * Immutable
 */
class Vector {
  constructor(private _x: number, private _y: number) {}

  public add(otherVector: Vector): Vector {
    return new Vector(this._x + otherVector._x, this._y + otherVector._y);
  }

  public subtract(otherVector: Vector): Vector {
    return new Vector(this._x - otherVector._x, this._y - otherVector._y);
  }

  public x() {
    return this._x;
  }

  public y() {
    return this._y;
  }

  /**
   * Scale the vector's coordinates by some amount
   * @param amount what we want to multiply the vector by
   */
  public scale(amount: number): Vector {
    return new Vector(this._x * amount, this._y * amount);
  }

  /**
   * Determines how far two points are from one another.
   * @param otherPoint The point we're going to see how far away we're from
   */
  public dist(otherPoint: Vector): number {
    return Math.abs(
      Math.sqrt(
        Math.pow(otherPoint._x - this._x, 2) +
          Math.pow(otherPoint._y - this._y, 2)
      )
    );
  }

  public midpoint(otherPoint): Vector {
    return new Vector(
      (otherPoint._x + this._x) / 2,
      (otherPoint._y + this._y) / 2
    );
  }

  public normal(): Vector {
    return this.scale(1.0 / this.magnitude());
  }

  public magnitude(): number {
    return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
  }

  public static random(seed: Random): Vector {
    return new Vector(seed.nextFloat(), seed.nextFloat());
  }

  public static one(): Vector {
    return new Vector(1.0, 1.0);
  }

  public static fromAngle(angle: number): Vector {
    return new Vector(Math.cos(angle), Math.sin(angle));
  }
}
