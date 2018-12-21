// https://www.deviantart.com/notshurly/art/Transmutation-Circle-Tutorial-158371530

import {
  Transmutation,
  Random,
  RandomConfig,
  Config,
  Alphabet
} from "../../src";
import { BorderType, BorderConfig } from "../../src/borderconfig";
import { PolygonConfig } from "../../src/PolygonConfig";
import { Vector } from "../../src/vector";

let sentenceToWrite =
  "My first name is a random set of numbers and letters \
And other alphanumerics that changes hourly forever";

let seed = Math.round(Math.random() * 2147483647); //

let random = new Random(seed);

let rotate = true;

const canvas = document.getElementById("Transmutation") as HTMLCanvasElement;

const transmutationConfig = RandomConfig(sentenceToWrite, random);

const transmutation = new Transmutation(canvas, transmutationConfig);

const resizeWindow = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  // var alphabet = new Alphabet(random);

  // var dimensions = Vector.one().scale(40);
  // var offset = Vector.one().scale(200);

  // for (let i = 0; i < 26; i++) {
  //   alphabet
  //     .Glyph(String.fromCharCode(65 + i))
  //     .Draw(
  //       canvas.getContext("2d"),
  //       new Vector(
  //         (i % 13) * (dimensions.x() + 15),
  //         Math.floor(i / 13) * (dimensions.y() + 15)
  //       ).add(offset),
  //       dimensions,
  //       0,
  //       "black"
  //     );
  // }

  transmutation.Draw(
    canvas.width,
    canvas.height,
    rotate ? new Date().getTime() / 10000 : 0
  );
  console.log(transmutation.GetCharacterOn());
  window.requestAnimationFrame(resizeWindow);
};

window.requestAnimationFrame(resizeWindow);

const $ = (id: string): any => {
  return document.getElementById(id);
};

const SetWindowVariables = (config: Config, sentence: string, seed: number) => {
  $("text-to-inscribe").innerText = sentence;
  $("seed").value = seed;
  $("outer-border").value = config.GetBorderConfig().Shorthand();
  $("inner-border").value = config.GetInnerBoarderConfig().Shorthand();
  $("polygons").value = config
    .GetPolygonConfigs()
    .map(x => x.Shorthand())
    .reduce((p, c) => p + c);

  if (config.GetInnerPolygonConfig() !== null) {
    $("inner-polygon-sides").value = config.GetInnerPolygonConfig().Sides();
    $(
      "inner-polygon-circles"
    ).checked = config.GetInnerPolygonConfig().Circles();
    $("inner-polygon-arcs").checked = config.GetInnerPolygonConfig().Arcs();
  } else {
    $("inner-polygon-sides").value = 0;
  }
};

SetWindowVariables(transmutationConfig, sentenceToWrite, seed);

$("random-circle").onclick = () => {
  let newSeed = Math.round(Math.random() * 2147483647);
  let newConfig = RandomConfig(sentenceToWrite, new Random(newSeed));
  transmutation.SetConfig(newConfig);
  SetWindowVariables(newConfig, sentenceToWrite, newSeed);
};

const borderFromString = (input: string): BorderConfig => {
  let out = new Array<BorderType>();
  for (var i = 0; i < input.length; i++) {
    if (input.charAt(i) === "L") {
      out.push(BorderType.Line);
    } else if (input.charAt(i) === "S") {
      out.push(BorderType.Space);
    } else if (input.charAt(i) === "T") {
      out.push(BorderType.Text);
    }
  }
  return new BorderConfig(out);
};

const polygonFromString = (input: string): PolygonConfig => {
  const sides = parseInt(input.charAt(0));
  const circles = input.charAt(1) === "T" ? true : false;
  const arcs = input.charAt(2) === "T" ? true : false;

  if (isNaN(sides)) {
  } else if (sides <= 2) {
  }
  return new PolygonConfig(sides, circles, arcs);
};

const polygonsFromString = (input: string): Array<PolygonConfig> => {
  let output = new Array<PolygonConfig>();
  let remainingInput = input.toUpperCase();

  while (remainingInput.length >= 3) {
    output.push(polygonFromString(remainingInput));
    remainingInput = remainingInput.substr(3);
  }

  return output;
};

const buildCircleFromForm = () => {
  let newSeed = $("seed").value;
  sentenceToWrite = $("text-to-inscribe").value;

  let outerBorder = borderFromString($("outer-border").value.toUpperCase());

  let innerBorder = borderFromString($("inner-border").value.toUpperCase());

  let polygons = polygonsFromString($("polygons").value);

  let innerPolygon = null;
  if ($("inner-polygon-sides").value > 2) {
    innerPolygon = new PolygonConfig(
      $("inner-polygon-sides").value,
      $("inner-polygon-circles").checked,
      $("inner-polygon-arcs").checked
    );
  }

  let newConfig = new Config(
    new Alphabet(new Random(newSeed)),
    sentenceToWrite,
    outerBorder,
    polygons,
    innerBorder,
    innerPolygon,
    $("symbol-scale").value < 0.1 ? 0.1 : $("symbol-scale").value,
    "black"
  );
  transmutation.SetConfig(newConfig);
};

$("text-to-inscribe").oninput = buildCircleFromForm;
$("seed").oninput = buildCircleFromForm;
$("inner-border").oninput = buildCircleFromForm;
$("outer-border").oninput = buildCircleFromForm;
$("polygons").oninput = buildCircleFromForm;
$("inner-polygon-sides").oninput = buildCircleFromForm;
$("inner-polygon-circles").oninput = buildCircleFromForm;
$("inner-polygon-arcs").oninput = buildCircleFromForm;
$("symbol-scale").oninput = buildCircleFromForm;

$("animate").oninput = () => {
  rotate = $("animate").checked;
};
