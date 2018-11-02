import { Vector } from "./vector";
import { Random } from "./random";
import { Stroke } from "./stroke";

export { Glyph };

/**
 * I have found some alphabet dimensions to be ~4 units in height and ~units in
 * width
 */
class Glyph {
  private strokes: Array<Stroke>;

  constructor(private random: Random) {
    do {
      this.strokes = this.generateStrokes(this.random);
    } while (this.validStrokes(this.strokes) == false);
  }

  private validStrokes(strokes: Array<Stroke>): boolean {
    return strokes.length > 4;
  }

  private generateStrokes(random: Random): Array<Stroke> {
    const probabilies = [
      [3 / 4, 2 / 3, 3 / 4],
      [2 / 3, 3 / 4, 2 / 3],
      [3 / 4, 2 / 3, 3 / 4]
    ];

    // Pick random points
    let chosenPoints = new Array<Vector>();
    probabilies.forEach((row, rowIndex) => {
      row.forEach((entry, entryIndex) => {
        if (this.random.nextFloat() > entry) {
          chosenPoints.push(
            new Vector(entryIndex, rowIndex).add(
              Vector.random(this.random).scale(0.2)
            )
          );
        }
      });
    });

    // Build strokes
    let pointsAdded = new Array<number>();
    let strokes = new Array<Stroke>();
    for (let pointIndex = 0; pointIndex < chosenPoints.length; pointIndex++) {
      for (
        let otherPointsIndex = pointIndex + 1;
        otherPointsIndex < chosenPoints.length;
        otherPointsIndex++
      ) {
        const dist = chosenPoints[pointIndex].dist(
          chosenPoints[otherPointsIndex]
        );
        if (dist > 0.9 && this.random.nextFloat() > dist - 0.5) {
          strokes.push(
            new Stroke(
              chosenPoints[pointIndex].scale(0.5),
              chosenPoints[otherPointsIndex].scale(0.5)
            )
          );
          if (pointsAdded.indexOf(pointIndex) == -1) {
            pointsAdded.push(pointIndex);
          }
          if (pointsAdded.indexOf(otherPointsIndex) == -1) {
            pointsAdded.push(otherPointsIndex);
          }
        }
      }
    }

    for (let pointIndex = 0; pointIndex < chosenPoints.length; pointIndex++) {
      if (
        pointsAdded.indexOf(pointIndex) === -1 &&
        this.random.nextFloat() > 0.8
      ) {
        strokes.push(
          new Stroke(
            chosenPoints[pointIndex].scale(0.5),
            chosenPoints[pointIndex].scale(0.55)
          )
        );
        break;
      }
    }

    return strokes;
  }

  Draw(
    ctx: CanvasRenderingContext2D,
    center: Vector,
    dimensions: Vector,
    rotation: number,
    strokeStyle: string
  ) {
    ctx.strokeStyle = strokeStyle;
    this.strokes.forEach(stroke => {
      stroke.Draw(ctx, center, dimensions, rotation);
    });
  }
}
