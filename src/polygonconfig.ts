import { Random } from "./random";

export { PolygonConfig, RandomPolygonConfig };

class PolygonConfig {
  constructor(
    private sides: number,
    private circles: boolean,
    private arcs: boolean
  ) {}

  Sides(): number {
    return this.sides;
  }

  Circles(): boolean {
    return this.circles;
  }

  Arcs(): boolean {
    return this.arcs;
  }
}

function RandomPolygonConfig(random: Random): PolygonConfig {
  return new PolygonConfig(
    3 + Math.round(random.nextFloat() * 5),
    random.nextFloat() >= 0.5,
    random.nextFloat() >= 0.5
  );
}
