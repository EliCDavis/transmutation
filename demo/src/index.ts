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
  const maxRadius = Math.min(width, height) * 0.4;
  const middleCords = new Vector(width / 2, height / 2);

  drawCircle(middleCords, maxRadius);
  drawCircle(middleCords, maxRadius - 40);
  drawPolygon(middleCords, maxRadius - 40, 5, 0);
  drawPolygon(middleCords, maxRadius - 40, 5, Math.PI);
  drawCircle(middleCords, maxRadius * 0.5);
  drawPolygon(middleCords, maxRadius * 0.5, 3, Math.PI);
  drawPolygon(middleCords, maxRadius * 0.5, 3, 0);
};

const resizeWindow = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  draw(canvas.width, canvas.height);
};
resizeWindow();
window.addEventListener("resize", () => resizeWindow());
