// https://www.deviantart.com/notshurly/art/Transmutation-Circle-Tutorial-158371530

import { Vector } from "../../src";

let canvas = document.getElementById("nodeview") as HTMLCanvasElement;
let ctx = canvas.getContext("2d");

const drawCircle = (pos: Vector, radius: number) => {
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(pos.x(), pos.y(), radius, 0, Math.PI * 2);
  ctx.stroke();
};

const drawPolyVertexIntersections = (
  pos: Vector,
  radius: number,
  sides: number,
  rotation: number
) => {
  ctx.strokeStyle = "black";

  const angleIncrement = (Math.PI * 2) / sides;

  for (let vertex = 0; vertex < sides; vertex++) {
    ctx.beginPath();

    ctx.moveTo(pos.x(), pos.y());
    ctx.lineTo(
      pos.x() + radius * Math.cos(rotation + angleIncrement * vertex),
      pos.y() + radius * Math.sin(rotation + angleIncrement * vertex)
    );

    ctx.stroke();
  }
};

const drawPolyMidpointCircles = (
  pos: Vector,
  radius: number,
  sides: number,
  rotation: number,
  circleRadius: number
) => {
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";

  const angleIncrement = (Math.PI * 2) / sides;

  for (let vertex = 0; vertex < sides; vertex++) {
    ctx.beginPath();
    ctx.arc(
      pos.x() + radius * Math.cos(rotation + angleIncrement * vertex),
      pos.y() + radius * Math.sin(rotation + angleIncrement * vertex),
      circleRadius,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();
  }
};

const ThreePointArc = (initial: Vector, median: Vector, final: Vector) => {
  const control = median
    .scale(2)
    .subtract(initial.scale(0.5))
    .subtract(final.scale(0.5));

  ctx.beginPath();
  ctx.moveTo(initial.x(), initial.y());
  ctx.quadraticCurveTo(control.x(), control.y(), final.x(), final.y());
  ctx.stroke();
};

const drawPolyMidpointArcs = (
  pos: Vector,
  radius: number,
  sides: number,
  rotation: number,
  arcRadius: number
) => {
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";

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

    ThreePointArc(arcPointOne, arcPointMidpoint, arcPointTwo);
  }
};

const drawPolygon = (
  pos: Vector,
  radius: number,
  sides: number,
  rotation: number
) => {
  ctx.strokeStyle = "black";
  ctx.beginPath();

  const angleIncrement = (Math.PI * 2) / sides;

  ctx.moveTo(
    pos.x() + radius * Math.cos(rotation),
    pos.y() + radius * Math.sin(rotation)
  );

  for (let vertex = 1; vertex < sides; vertex++) {
    ctx.lineTo(
      pos.x() + radius * Math.cos(rotation + angleIncrement * vertex),
      pos.y() + radius * Math.sin(rotation + angleIncrement * vertex)
    );
  }

  ctx.closePath();

  ctx.stroke();
};

const draw = (width: number, height: number) => {
  const maxRadius = Math.min(width, height) * 0.48;
  const middleCords = new Vector(width / 2, height / 2);

  drawCircle(middleCords, maxRadius);
  drawCircle(middleCords, maxRadius * 0.95);

  drawCircle(middleCords, maxRadius * 0.8);
  drawPolygon(middleCords, maxRadius * 0.8, 6, Math.PI / 2);
  drawPolygon(middleCords, maxRadius * 0.8, 3, Math.PI / 2);

  drawPolyVertexIntersections(middleCords, maxRadius * 0.8, 6, Math.PI / 2);
  drawPolyMidpointArcs(
    middleCords,
    maxRadius * 0.8,
    6,
    Math.PI / 6,
    maxRadius / 3
  );

  drawPolyMidpointArcs(
    middleCords,
    maxRadius * 0.8,
    6,
    Math.PI / 6,
    maxRadius / 2.3
  );

  drawPolyMidpointCircles(
    middleCords,
    maxRadius * 0.4,
    3,
    Math.PI / 6,
    maxRadius / 8
  );

  //   TODO: Determine why 0.69 works
  drawCircle(middleCords, maxRadius * 0.69);

  drawCircle(middleCords, maxRadius * 0.2);
  drawCircle(middleCords, maxRadius * 0.15);
};

const resizeWindow = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  draw(canvas.width, canvas.height);
};
resizeWindow();
window.addEventListener("resize", () => resizeWindow());
