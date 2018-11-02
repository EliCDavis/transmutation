// https://www.deviantart.com/notshurly/art/Transmutation-Circle-Tutorial-158371530

import { Transmutation, Glyph } from "../../src";

const canvas = document.getElementById("Transmutation") as HTMLCanvasElement;
const transmutation = new Transmutation(canvas, Math.random() * 2147483647);
const resizeWindow = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  transmutation.Draw(canvas.width, canvas.height);
};
resizeWindow();
window.addEventListener("resize", () => resizeWindow());
