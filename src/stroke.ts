import { Vector } from "./vector";

export { Stroke };

/**
 * I have found some alphabet dimensions to be ~4 units in height and ~units in
 * width
 */
class Stroke {
  constructor(private start: Vector, private end: Vector) {}

  public Draw(
    ctx: CanvasRenderingContext2D,
    center: Vector,
    dimensions: Vector,
    rotation: number
  ): void {
    const halfOne = Vector.one().scale(0.5);
    const reAdjust = center.subtract(dimensions.scale(0.5));

    const startCentered = this.start.subtract(halfOne);
    const originalStartAngle = Math.atan2(startCentered.y(), startCentered.x());

    let scaledStart = new Vector(
      startCentered.magnitude() * Math.cos(rotation + originalStartAngle),
      startCentered.magnitude() * Math.sin(rotation + originalStartAngle)
    ).add(halfOne);

    scaledStart = new Vector(
      scaledStart.x() * dimensions.x(),
      scaledStart.y() * dimensions.y()
    ).add(reAdjust);

    const endCentered = this.end.subtract(halfOne);
    const originalEndAngle = Math.atan2(endCentered.y(), endCentered.x());

    let scaledEnd = new Vector(
      endCentered.magnitude() * Math.cos(rotation + originalEndAngle),
      endCentered.magnitude() * Math.sin(rotation + originalEndAngle)
    ).add(halfOne);

    scaledEnd = new Vector(
      scaledEnd.x() * dimensions.x(),
      scaledEnd.y() * dimensions.y()
    ).add(reAdjust);

    //const temp = ctx.lineWidth;
    //ctx.lineWidth = dimensions.magnitude() / 20;
    ctx.beginPath();

    ctx.lineTo(scaledStart.x(), scaledStart.y());
    ctx.lineTo(scaledEnd.x(), scaledEnd.y());
    ctx.closePath();

    ctx.stroke();
    //ctx.lineWidth = temp;
  }
}
