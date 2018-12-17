import { Random } from "./random";

export { BorderConfig, BorderType, RandomBorderConfig };

enum BorderType {
  Line,
  Text
}

class BorderConfig {
  constructor(private borders: Array<BorderType>) {}

  GetBorderTypes(): Array<BorderType> {
    return this.borders;
  }

  Shorthand(): string {
    return this.borders
      .map(type => (type === BorderType.Line ? "L" : "T"))
      .reduce((previous: any, current: any) => {
        return previous + current;
      });
  }
}

function RandomBorderConfig(random: Random): BorderConfig {
  let circles = random.nextFloat() * 3 + 2;

  let borders = new Array<BorderType>();
  for (let c = 0; c < circles; c++) {
    borders[c] = random.nextFloat() >= 0.5 ? BorderType.Text : BorderType.Line;
  }

  return new BorderConfig(borders);
}
