import { Vector } from "./vector";

export { Transmutation };

const characters = "ᏰፈᎴᏋᎦᏠᏝᏁᎧᎮᎤᏕᏖᏬᏉᏇጀፚ";

class Transmutation {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  background: string;

  line: string;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.background = "black";
    this.line = "red";
  }

  Start(): void {
    this.ctx.fillStyle = this.background;
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
  }

  Polygon(pos: Vector, radius: number, sides: number, rotation: number): void {
    this.ctx.strokeStyle = this.line;
    this.ctx.beginPath();
    const angleIncrement = (Math.PI * 2) / sides;

    for (let vertex = 0; vertex < sides; vertex++) {
      this.ctx.lineTo(
        pos.x() + radius * Math.cos(rotation + angleIncrement * vertex),
        pos.y() + radius * Math.sin(rotation + angleIncrement * vertex)
      );
    }

    // this.ctx.lineTo(
    //   pos.x() + radius * Math.cos(rotation + angleIncrement * sides - 1),
    //   pos.y() + radius * Math.sin(rotation + angleIncrement * sides - 1)
    // );

    this.ctx.closePath();

    this.ctx.stroke();
  }

  PolyMidpointCircles(
    pos: Vector,
    radius: number,
    sides: number,
    rotation: number,
    circleRadius: number
  ) {
    const angleIncrement = (Math.PI * 2) / sides;

    for (let vertex = 0; vertex < sides; vertex++) {
      this.ctx.strokeStyle = this.line;
      this.ctx.fillStyle = this.background;
      const angle = rotation + angleIncrement * vertex;
      this.ctx.beginPath();
      this.ctx.arc(
        pos.x() + radius * Math.cos(angle),
        pos.y() + radius * Math.sin(angle),
        circleRadius,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      this.ctx.stroke();
      this.RotatedSymbol(
        pos,
        radius,
        circleRadius,
        angle + 0.09,
        this.RandomSymbol()
      );
    }
  }

  PolyVertexIntersections(
    pos: Vector,
    radius: number,
    sides: number,
    rotation: number
  ) {
    this.ctx.strokeStyle = this.line;

    const angleIncrement = (Math.PI * 2) / sides;

    for (let vertex = 0; vertex < sides; vertex++) {
      this.ctx.beginPath();

      this.ctx.moveTo(pos.x(), pos.y());
      this.ctx.lineTo(
        pos.x() + radius * Math.cos(rotation + angleIncrement * vertex),
        pos.y() + radius * Math.sin(rotation + angleIncrement * vertex)
      );

      this.ctx.stroke();
    }
  }

  RotatedSymbol(
    pos: Vector,
    radius: number,
    fontSize: number,
    angle: number,
    character: string
  ) {
    this.ctx.font = Math.round(fontSize) + "px serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = this.line;
    this.ctx.save();
    this.ctx.translate(pos.x(), pos.y());
    this.ctx.rotate(angle);
    this.ctx.fillText(character, radius, 0);
    this.ctx.restore();
  }

  RandomSymbol(): string {
    return characters[Math.floor(Math.random() * characters.length)];
  }

  CircleText(pos: Vector, radius: number, fontSize: number) {
    const letters = (radius / fontSize) * 4;
    const angle = (Math.PI * 2) / letters;

    for (let i = 0; i < letters; i++) {
      this.RotatedSymbol(pos, radius, fontSize, angle * i, this.RandomSymbol());
    }
  }

  Circle(pos: Vector, radius: number) {
    this.ctx.strokeStyle = this.line;
    this.ctx.beginPath();
    this.ctx.arc(pos.x(), pos.y(), radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  ThreePointArc(initial: Vector, median: Vector, final: Vector) {
    const control = median
      .scale(2)
      .subtract(initial.scale(0.5))
      .subtract(final.scale(0.5));

    this.ctx.beginPath();
    this.ctx.moveTo(initial.x(), initial.y());
    this.ctx.quadraticCurveTo(control.x(), control.y(), final.x(), final.y());
    this.ctx.stroke();
  }

  PolyMidpointArcs(
    pos: Vector,
    radius: number,
    sides: number,
    rotation: number,
    arcRadius: number
  ) {
    this.ctx.strokeStyle = this.line;
    this.ctx.fillStyle = this.background;

    const angleIncrement = (Math.PI * 2) / sides;

    for (let vertex = 2; vertex <= sides; vertex += 2) {
      const pointOne = new Vector(
        pos.x() + radius * Math.cos(rotation + angleIncrement * (vertex - 2)),
        pos.y() + radius * Math.sin(rotation + angleIncrement * (vertex - 2))
      );

      const pointTwo = new Vector(
        pos.x() + radius * Math.cos(rotation + angleIncrement * (vertex - 1)),
        pos.y() + radius * Math.sin(rotation + angleIncrement * (vertex - 1))
      );

      const pointThree = new Vector(
        pos.x() + radius * Math.cos(rotation + angleIncrement * vertex),
        pos.y() + radius * Math.sin(rotation + angleIncrement * vertex)
      );

      const arcPointOne = pointTwo.add(
        pointOne
          .subtract(pointTwo)
          .normal()
          .scale(arcRadius)
      );
      const arcPointTwo = pointTwo.add(
        pointThree
          .subtract(pointTwo)
          .normal()
          .scale(arcRadius)
      );
      const arcPointMidpoint = pointTwo.add(
        pos
          .subtract(pointTwo)
          .normal()
          .scale(arcRadius)
      );

      this.ThreePointArc(arcPointOne, arcPointMidpoint, arcPointTwo);
    }
  }
}
