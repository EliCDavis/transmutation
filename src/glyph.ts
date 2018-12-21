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
      this.strokes = this.generateStrokes();
    } while (this.validStrokes(this.strokes) == false);
  }

  private validStrokes(strokes: Array<Stroke>): boolean {
    return strokes.length > 4;
  }

  private generateStrokes(): Array<Stroke> {
    const probabiliesForPoints = [
      [3 / 4, 2 / 3, 3 / 4],
      [2 / 3, 3 / 4, 2 / 3],
      [3 / 4, 2 / 3, 3 / 4]
    ];

    // initialize points
    let points = [
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ];

    let pointPoitions = [[], [], []];

    // Pick random points
    // let chosenPoints = new Array<Vector>();
    probabiliesForPoints.forEach((row, rowIndex) => {
      row.forEach((entry, entryIndex) => {
        if (this.random.nextFloat() > entry) {
          // chosenPoints.push(
          //   new Vector(entryIndex, rowIndex)
          //   // .add(
          //   //   Vector.random(this.random).scale(0.2)
          //   // )
          // );
          points[rowIndex][entryIndex] = true;
          pointPoitions[rowIndex][entryIndex] = new Vector(
            rowIndex + this.random.nextFloat() * 0.2,
            entryIndex + this.random.nextFloat() * 0.2
          ).scale(0.5);
        }
      });
    });

    const width = 3;
    const height = 3;

    let valid = (otherX: number, otherY: number): boolean => {
      const validX = otherX >= 0 && otherX < width;
      const validY = otherY >= 0 && otherY < height;
      return (
        validX &&
        validY &&
        points[otherX][otherY] &&
        this.random.nextFloat() > 0.5
      );
    };

    let pointsToString = (
      a: number,
      b: number,
      c: number,
      d: number
    ): string => {
      return `${a},${b},${c},${d}`;
    };

    // create potential strokes
    let potentialStrokes = {};
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (points[x][y] === false) {
          continue;
        }

        if (valid(x - 1, y)) {
          potentialStrokes[pointsToString(x - 1, y, x, y)] = true;
        }

        if (valid(x + 1, y)) {
          potentialStrokes[pointsToString(x, y, x + 1, y)] = true;
        }

        if (valid(x, y + 1)) {
          potentialStrokes[pointsToString(x, y, x, y + 1)] = true;
        }

        if (valid(x, y - 1)) {
          potentialStrokes[pointsToString(x, y - 1, x, y)] = true;
        }

        if (valid(x - 1, y + 1)) {
          potentialStrokes[pointsToString(x, y, x - 1, y + 1)] = true;
        }

        if (valid(x + 1, y + 1)) {
          potentialStrokes[pointsToString(x, y, x + 1, y + 1)] = true;
        }

        if (valid(x - 1, y - 1)) {
          potentialStrokes[pointsToString(x - 1, y - 1, x, y)] = true;
        }

        if (valid(x + 1, y - 1)) {
          potentialStrokes[pointsToString(x + 1, y - 1, x, y)] = true;
        }
      }
    }

    // Remove Triangles
    let allValid = (s: string[]): boolean => {
      for (let i = 0; i < s.length; i++) {
        if (s[i] in potentialStrokes === false) {
          return false;
        }
      }
      return true;
    };

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const topLeftTriangle = [
          pointsToString(x - 1, y, x, y),
          pointsToString(x, y - 1, x, y),
          pointsToString(x, y - 1, x - 1, y)
        ];

        if (allValid(topLeftTriangle)) {
          delete potentialStrokes[topLeftTriangle[2]];
        }

        const topRightTriangle = [
          pointsToString(x, y, x + 1, y),
          pointsToString(x, y - 1, x, y),
          pointsToString(x, y - 1, x + 1, y)
        ];

        if (allValid(topRightTriangle)) {
          delete potentialStrokes[topRightTriangle[2]];
        }

        const bottomLeftTriangle = [
          pointsToString(x - 1, y, x, y),
          pointsToString(x, y, x, y + 1),
          pointsToString(x - 1, y, x, y + 1)
        ];

        if (allValid(bottomLeftTriangle)) {
          delete potentialStrokes[bottomLeftTriangle[2]];
        }

        const bottomRightTriangle = [
          pointsToString(x, y, x + 1, y),
          pointsToString(x, y, x, y + 1),
          pointsToString(x + 1, y, x, y + 1)
        ];

        if (allValid(bottomRightTriangle)) {
          delete potentialStrokes[bottomRightTriangle[2]];
        }
      }
    }

    // Construct final strokes
    let strokes = new Array<Stroke>();
    Object.keys(potentialStrokes).forEach(function(key) {
      const nums = key.split(",");
      strokes.push(
        new Stroke(
          pointPoitions[parseInt(nums[0])][parseInt(nums[1])],
          pointPoitions[parseInt(nums[2])][parseInt(nums[3])]
        )
      );
    });

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
