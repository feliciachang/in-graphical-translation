// import createWord from "./createWord.js";
let longLine;
let input, button, text;
let len;
let canvasWidth;
let canvasHeight;
let width;
let step;
let backgroundImage;
let canvasTop = 10;
let backphoto;
let positionWithMouse;

function preload() {
  backgroundImage = loadImage("static/images/cropped/flybackground.jpg");
  longLine = loadImage("static/images/cropped/cropped.jpg");
}

function setup() {
  const canvas = createCanvas(windowWidth - 500, windowHeight);
  background(255);
  canvas.parent("sketch-holder");
  image_input = createFileInput(processImage);
  image_input.parent("add-file");
  input = createInput("");
  input.parent("text-input");
  textHeight = createInput("100");
  textHeight.parent("text-height");
  tWidth = createInput("100");
  tWidth.parent("text-width");
  imageSize = createInput("10");
  imageSize.parent("image-size");
  button = createButton("submit");
  button.mousePressed(turnText);
  button.parent("text-input");
  back = createButton("Add Background");
  back.mousePressed(addBackground);
  back.parent("add-background");
  reduceSize = createButton("Reduce Size");
  reduceSize.mousePressed(reduceWordSize);
  reduceSize.parent("reduce-size");

  background("white");
  stroke("purple");
  fill("purple");

  angleMode(DEGREES);

  canvasWidth = windowWidth - 500;
  canvasHeight = 200;
  width = 10;
  backphoto = false;
}

async function processImage(file) {
  console.log(file);
  let data = {
    test: "my test",
    image: file.data,
  };
  console.log(data);
  let response = await fetch("http://127.0.0.1:5000/create-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  imgurl = await response.text();
  console.log(imgurl);
  longLine = loadImage(imgurl);
}

function createGrid(len) {
  let gridWidth = Math.floor(canvasWidth / len);
  step = Math.floor(gridWidth / 4);
  console.log(step);
  let stepper = 5;
  print(gridWidth, step, stepper);
  for (let count = 0; count < len; count++) {
    for (let i = 0; i < 4; i++) {
      circle(stepper, 5, 5);
      circle(stepper, 105, 5);
      circle(stepper, 205, 5);
      circle(stepper, 305, 5);
      circle(stepper, 405, 5);
      stepper += step;
    }
  }
}

function getHeight(width) {
  return (longLine.height * width) / longLine.width;
}

function addBackground() {
  if (backphoto === false || backphoto === undefined) {
    backphoto = true;
    for (let i = 0; i < canvasWidth; i = i + 500) {
      image(backgroundImage, i, 0, 700, 700);
    }
    turnText();
  } else {
    backphoto = false;
    turnText();
  }
}

function toVector() {
  vec = true;
  draw();
}

function turnText() {
  //if (backphoto !== true) {
  background(255);
  //}
  text = input.value();
  text = text.toUpperCase();
  len = text.length;

  let wordHeight = parseInt(textHeight.value());
  console.log(tWidth.value());
  let wordWidth = parseInt(tWidth.value());

  createGrid(len);
  createWord(text, width, len, wordHeight, wordWidth);
}

function reduceWordSize() {
  background(255);
  text = input.value();
  text = text.toUpperCase();
  len = text.length;
  let wordHeight = parseInt(textHeight.value());
  console.log(tWidth.value());
  let wordWidth = parseInt(tWidth.value());
  createWord(text, width, len, wordHeight, wordWidth);
}

function draw() {
  background(255);
  //}
  text = input.value();
  text = text.toUpperCase();
  len = text.length;

  let wordHeight = parseInt(textHeight.value());
  console.log(tWidth.value());
  let wordWidth = parseInt(tWidth.value());

  width = parseInt(imageSize.value());

  createGrid(len);
  createWord(text, width, len, wordHeight, wordWidth);
}
