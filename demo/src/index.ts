// https://www.deviantart.com/notshurly/art/Transmutation-Circle-Tutorial-158371530

import { Transmutation, Glyph } from "../../src";
import { Vector } from "../../src/vector";

const canvas = document.getElementById("Transmutation") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const transmutation = new Transmutation(canvas, Math.random() * 2147483647);

const book = new Array<Glyph>(100);

for (let i = 0; i < book.length; i++) {
  book[i] = new Glyph(i);
}

const drawBook = (width: number, height: number) => {
  const widthIncrement = (width - 100) / 10.0;
  const heightIncrement = (height - 100) / 10.0;
  const glyphDimension = new Vector(30, 40);
  for (let i = 0; i < book.length; i++) {
    book[i].Draw(
      ctx,
      new Vector(
        widthIncrement * (i % 10) + 50,
        heightIncrement * Math.floor(i / 10) + 50
      ),
      glyphDimension,
      1,
      "red"
    );
  }
};

const resizeWindow = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  transmutation.Draw(canvas.width, canvas.height);
  //drawBook(canvas.width, canvas.height);
};
resizeWindow();
window.addEventListener("resize", () => resizeWindow());
