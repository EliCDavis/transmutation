// https://www.deviantart.com/notshurly/art/Transmutation-Circle-Tutorial-158371530

import { Vector, Transmutation } from "../../src";

const canvas = document.getElementById("Transmutation") as HTMLCanvasElement;
const transmutation = new Transmutation(canvas);

const RandomBorder = (maxRadius: number, middleCords: Vector): number => {
  transmutation.Circle(middleCords, maxRadius);
  let remainingRadius = 1;
  const circles = Math.random() * 3 + 1;
  for (let i = 0; i < circles; i++) {
    remainingRadius -= 0.05;
    if (Math.random() >= 0.5) {
      transmutation.Circle(middleCords, maxRadius * remainingRadius);
    } else {
      transmutation.CircleText(
        middleCords,
        maxRadius * remainingRadius,
        (maxRadius * remainingRadius) / 15
      );
    }
  }
  remainingRadius -= 0.05;
  transmutation.Circle(middleCords, maxRadius * remainingRadius);

  return maxRadius * remainingRadius;
};

const RandomMiddle = (maxRadius: number, middleCords: Vector): number => {
  const sides = 3 + Math.round(Math.random() * 5);
  const apothem = maxRadius * Math.cos(Math.PI / sides);

  transmutation.Polygon(middleCords, maxRadius, sides * 2, Math.PI / 2);
  transmutation.Polygon(middleCords, maxRadius, sides, Math.PI / 2);

  transmutation.PolyVertexIntersections(
    middleCords,
    maxRadius,
    sides * 2,
    Math.PI / 2 + Math.PI / sides // One thing to scramble
  );

  transmutation.PolyMidpointArcs(
    middleCords,
    maxRadius,
    sides * 2,
    Math.PI / 2 + Math.PI / sides,
    maxRadius / 2.6
  );

  transmutation.PolyMidpointArcs(
    middleCords,
    maxRadius,
    sides * 2,
    Math.PI / 2 + Math.PI / sides,
    maxRadius / 2.3
  );

  const midpointCircleRadius = maxRadius / 8;

  transmutation.PolyMidpointCircles(
    middleCords,
    apothem,
    sides,
    Math.PI / 2 + Math.PI / sides,
    midpointCircleRadius
  );

  return (apothem - midpointCircleRadius) * 0.9;
};

const DrawInner = (maxRadius: number, middleCords: Vector) => {
  const circles = 1 + Math.round(Math.random() * 2);
  let remainingRadius = 1;
  for (let i = 0; i < circles; i++) {
    var radius = 0.3 * Math.random();

    if (Math.random() >= 0.5) {
      transmutation.CircleText(
        middleCords,
        remainingRadius * maxRadius,
        (maxRadius * remainingRadius) / 5
      );
    } else {
      transmutation.Circle(middleCords, remainingRadius * maxRadius);
    }

    remainingRadius -= radius;
  }
};

const draw = (width: number, height: number) => {
  transmutation.Start();

  const middleCords = new Vector(width / 2, height / 2);
  let maxRadius = RandomBorder(Math.min(width, height) * 0.48, middleCords);

  const middleSections = 1 + Math.round(Math.random() * 2);

  for (let i = 0; i < middleSections; i++) {
    maxRadius = RandomMiddle(maxRadius, middleCords);
  }

  DrawInner(maxRadius, middleCords);
};

const resizeWindow = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  draw(canvas.width, canvas.height);
};
resizeWindow();
window.addEventListener("resize", () => resizeWindow());
