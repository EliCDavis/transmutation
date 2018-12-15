import { Vector } from "./vector";
import { Random } from "./random";
import { Glyph } from "./glyph";
import { Alphabet } from "./alphabet";
export { Transmutation };

class Transmutation {
  random: Random;

  ctx: CanvasRenderingContext2D;

  canvas: HTMLCanvasElement;

  background: string;

  line: string;

  sentenceToWrite: string;

  characterOn: number;

  alphabet: Alphabet;

  constructor(canvas: HTMLCanvasElement, randomSeed: number, sentence: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.random = new Random(randomSeed);
    this.background = "black";
    this.line = "red";

    this.alphabet = new Alphabet(this.random);
    this.sentenceToWrite = sentence;
    this.characterOn = 0;
  }

  RandomMiddle(maxRadius: number, middleCords: Vector): number {
    const sides = 3 + Math.round(this.random.nextFloat() * 5);
    const apothem = maxRadius * Math.cos(Math.PI / sides);

    this.Polygon(middleCords, maxRadius, sides * 2, Math.PI / 2);
    this.Polygon(middleCords, maxRadius, sides, Math.PI / 2);

    this.PolyVertexIntersections(
      middleCords,
      maxRadius,
      sides * 2,
      Math.PI / 2 + Math.PI / sides // One thing to scramble
    );

    if (this.random.nextFloat() > 0.5) {
      this.PolyMidpointArcs(
        middleCords,
        maxRadius,
        sides * 2,
        Math.PI / 2 + Math.PI / sides,
        maxRadius / 3
      );

      this.PolyMidpointArcs(
        middleCords,
        maxRadius,
        sides * 2,
        Math.PI / 2 + Math.PI / sides,
        maxRadius / 3.5
      );
    }

    const midpointCircleRadius = maxRadius / 8;

    if (this.random.nextFloat() < 0.5) {
      this.PolyMidpointCircles(
        middleCords,
        apothem,
        sides,
        Math.PI / 2 + Math.PI / sides,
        midpointCircleRadius
      );
    }

    return (apothem - midpointCircleRadius) * 0.9;
  }

  RandomBorder(maxRadius: number, middleCords: Vector): number {
    this.Circle(middleCords, maxRadius);
    let remainingRadius = 1;
    const circles = this.random.nextFloat() * 3 + 1;
    for (let i = 0; i < circles; i++) {
      remainingRadius -= 0.05;
      if (this.random.nextFloat() >= 0.5) {
        this.Circle(middleCords, maxRadius * remainingRadius);
      } else {
        this.CircleText(
          middleCords,
          maxRadius * remainingRadius,
          (maxRadius * remainingRadius) / 20
        );
      }
    }
    remainingRadius -= 0.05;
    this.Circle(middleCords, maxRadius * remainingRadius);

    return maxRadius * remainingRadius;
  }

  DrawInner(maxRadius: number, middleCords: Vector) {
    const circles = 1 + Math.round(this.random.nextFloat() * 2);
    let remainingRadius = 1;
    for (let i = 0; i < circles; i++) {
      var radius = 0.3 * this.random.nextFloat();

      if (this.random.nextFloat() >= 0.5) {
        this.CircleText(
          middleCords,
          remainingRadius * maxRadius,
          (maxRadius * remainingRadius) / 5
        );
      } else {
        this.Circle(middleCords, remainingRadius * maxRadius);
      }

      remainingRadius -= radius;
    }
  }

  Draw(width: number, height: number): void {
    this.Start();

    const middleCords = new Vector(width / 2, height / 2);
    let maxRadius = this.RandomBorder(
      Math.min(width, height) * 0.48,
      middleCords
    );

    const middleSections = 1 + Math.round(this.random.nextFloat() * 2);

    for (let i = 0; i < middleSections; i++) {
      maxRadius = this.RandomMiddle(maxRadius, middleCords);
    }

    this.DrawInner(maxRadius, middleCords);
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
      const adjustedPos = Vector.fromAngle(angle)
        .scale(radius)
        .add(pos);
      this.ctx.beginPath();
      this.ctx.arc(
        adjustedPos.x(),
        adjustedPos.y(),
        circleRadius,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      this.ctx.stroke();
      this.SpecialSymbol(adjustedPos, circleRadius, angle);
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

  NextSymbol(pos: Vector, size: number, angle: number): void {
    const g = this.alphabet.Glyph(
      this.sentenceToWrite.charAt(this.characterOn)
    );
    if (g !== null) {
      g.Draw(this.ctx, pos, Vector.one().scale(size), angle, this.line);
    }
    this.characterOn = (this.characterOn + 1) % this.sentenceToWrite.length;
  }

  SpecialSymbol(pos: Vector, size: number, angle: number): void {
    new Glyph(this.random).Draw(
      this.ctx,
      pos,
      Vector.one().scale(size),
      angle,
      this.line
    );
  }

  CircleText(pos: Vector, radius: number, fontSize: number) {
    const letters = (radius / fontSize) * 4;
    const angle = (Math.PI * 2) / letters;

    for (let i = 0; i < letters; i++) {
      this.NextSymbol(
        pos.add(Vector.fromAngle(angle * i).scale(radius)),
        fontSize,
        angle * i
      );
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
