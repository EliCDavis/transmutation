import { BorderConfig, RandomBorderConfig } from "./borderconfig";
import { Random } from "./random";
import { Alphabet } from ".";
import { PolygonConfig, RandomPolygonConfig } from "./PolygonConfig";

export { Config, RandomConfig };

class Config {
  constructor(
    private alphabet: Alphabet,
    private sentence: string,
    private borderConfig: BorderConfig,
    private polgonConfigs: Array<PolygonConfig>,
    private innerBoarderConfig: BorderConfig,
    private innerPolygonConfig: PolygonConfig,
    private textSize: number,
    private lineColor: string
  ) {}

  GetSentence(): string {
    return this.sentence.replace(/\s+/g, "");
  }

  GetBorderConfig(): BorderConfig {
    return this.borderConfig;
  }

  GetInnerBoarderConfig(): BorderConfig {
    return this.innerBoarderConfig;
  }

  GetAlphabet(): Alphabet {
    return this.alphabet;
  }

  GetPolygonConfigs(): Array<PolygonConfig> {
    return this.polgonConfigs;
  }

  GetInnerPolygonConfig(): PolygonConfig {
    return this.innerPolygonConfig;
  }

  GetTextScale(): number {
    return this.textSize;
  }

  GetLineColor(): string {
    return this.lineColor;
  }
}

function RandomConfig(sentence: string, random: Random): Config {
  const numPolys = 1 + Math.round(random.nextFloat() * 2);
  let polys = new Array<PolygonConfig>(numPolys);
  for (let p = 0; p < numPolys; p++) {
    polys[p] = RandomPolygonConfig(random);
  }

  return new Config(
    new Alphabet(random),
    sentence,
    RandomBorderConfig(random),
    polys,
    RandomBorderConfig(random),
    random.nextFloat() > 0.5
      ? null
      : new PolygonConfig(
          3 + Math.round(random.nextFloat() * 3),
          random.nextFloat() >= 0.5,
          random.nextFloat() >= 0.5
        ),
    1,
    "red"
  );
}
