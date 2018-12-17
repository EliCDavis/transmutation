import { Vector } from "./vector";
import { BorderConfig, BorderType } from "./borderconfig";
import { Config } from "./config";
import { PolygonConfig } from "./PolygonConfig";
export { Transmutation };

class Transmutation {
  ctx: CanvasRenderingContext2D;

  canvas: HTMLCanvasElement;

  background: string;

  line: string;

  characterOn: number;

  config: Config;

  constructor(canvas: HTMLCanvasElement, config: Config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.background = "black";
    this.line = "red";
    this.characterOn = 0;
    this.config = config;
  }

  SetConfig(config: Config) {
    this.config = config;
  }

  DrawMiddle(
    maxRadius: number,
    middleCords: Vector,
    config: PolygonConfig,
    rotation: number
  ): number {
    const apothem = maxRadius * Math.cos(Math.PI / config.Sides());

    this.Polygon(
      middleCords,
      maxRadius,
      config.Sides() * 2,
      rotation + Math.PI / 2
    );
    this.Polygon(
      middleCords,
      maxRadius,
      config.Sides(),
      rotation + Math.PI / 2
    );

    this.PolyVertexIntersections(
      middleCords,
      maxRadius,
      config.Sides() * 2,
      rotation + (Math.PI / 2 + Math.PI / config.Sides()) // One thing to scramble
    );

    if (config.Arcs()) {
      this.PolyMidpointArcs(
        middleCords,
        maxRadius,
        config.Sides() * 2,
        rotation + (Math.PI / 2 + Math.PI / config.Sides()),
        maxRadius / 3
      );

      this.PolyMidpointArcs(
        middleCords,
        maxRadius,
        config.Sides() * 2,
        rotation + (Math.PI / 2 + Math.PI / config.Sides()),
        maxRadius / 3.5
      );
    }

    const midpointCircleRadius = maxRadius / 8;

    if (config.Circles()) {
      this.PolyMidpointCircles(
        middleCords,
        apothem,
        config.Sides(),
        rotation + (Math.PI / 2 + Math.PI / config.Sides()),
        midpointCircleRadius
      );
    }

    return (apothem - midpointCircleRadius) * 0.9;
  }

  DrawBorder(
    maxRadius: number,
    middleCords: Vector,
    border: BorderConfig,
    rotation: number
  ): number {
    let remainingRadius = 1;
    let direction = 1;
    border.GetBorderTypes().forEach((type: BorderType) => {
      switch (type) {
        case BorderType.Line:
          this.Circle(middleCords, maxRadius * remainingRadius);
          break;

        case BorderType.Text:
          this.CircleText(
            middleCords,
            maxRadius * remainingRadius,
            (maxRadius * remainingRadius) / 20,
            rotation * direction
          );
          direction *= -1;

          break;
      }

      remainingRadius -= 0.05;
    });

    return maxRadius * remainingRadius;
  }

  public Draw(width: number, height: number, rotation: number): void {
    this.characterOn = 0;
    this.Start();

    let direction = 1;

    const middleCords = new Vector(width / 2, height / 2);
    let maxRadius = this.DrawBorder(
      Math.min(width, height) * 0.48,
      middleCords,
      this.config.GetBorderConfig(),
      rotation * direction
    );

    direction *=
      this.config.GetBorderConfig().GetBorderTypes().length % 2 === 0 ? 1 : -1;

    this.config.GetPolygonConfigs().forEach(polyConfig => {
      maxRadius = this.DrawMiddle(
        maxRadius,
        middleCords,
        polyConfig,
        rotation * direction
      );
      direction *= -1;
    });

    this.ctx.beginPath();
    this.ctx.arc(middleCords.x(), middleCords.y(), maxRadius, 0, 2 * Math.PI);
    this.ctx.fill();

    maxRadius = this.DrawBorder(
      maxRadius,
      middleCords,
      this.config.GetInnerBoarderConfig(),
      rotation * direction
    );

    direction *=
      this.config.GetInnerBoarderConfig().GetBorderTypes().length % 2 === 0
        ? 1
        : -1;

    if (this.config.GetInnerPolygonConfig() != null) {
      this.DrawMiddle(
        maxRadius,
        middleCords,
        this.config.GetInnerPolygonConfig(),
        rotation * direction * -1
      );
    }
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
    const g = this.config
      .GetAlphabet()
      .Glyph(this.config.GetSentence().charAt(this.characterOn));

    if (g !== null) {
      g.Draw(this.ctx, pos, Vector.one().scale(size), angle, this.line);
    }

    this.characterOn =
      (this.characterOn + 1) % this.config.GetSentence().length;
  }

  SpecialSymbol(pos: Vector, size: number, angle: number): void {
    // new Glyph(this.random).Draw(
    //   this.ctx,
    //   pos,
    //   Vector.one().scale(size),
    //   angle,
    //   this.line
    // );
  }

  CircleText(pos: Vector, radius: number, fontSize: number, rotation: number) {
    const letters = (radius / fontSize) * 4;
    const angle = (Math.PI * 2) / letters;

    for (let i = 0; i < letters; i++) {
      const curAngle = angle * i + rotation;
      this.NextSymbol(
        pos.add(Vector.fromAngle(curAngle).scale(radius)),
        fontSize,
        curAngle
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
