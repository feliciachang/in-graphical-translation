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
let circShape;
let useCircle;

function preload() {
  longLine = loadImage("static/images/cropped/cropped.jpg");
  circShape = loadImage("static/images/cropped/cropped.jpg");
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
  circleButton = createButton("use circles");
  circleButton.mousePressed(setCircleTru);
  circleButton.parent("use-circle");
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

function setCircleTru() {
  if (useCircle) {
    useCircle = false;
  } else {
    useCircle = true;
  }
}

async function processImage(file) {
  let data = {
    test: "my test",
    image: file.data,
  };
  backgroundImage = file.data;
  let response = await fetch("/create-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  imgurl = await response.text();

  circPost = await fetch("/create-circles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  circPost = await circPost.text();
  console.log(circPost);

  longLine = loadImage(imgurl);
  if (circPost !== undefined) {
    circShape = loadImage(circPost);
  }

  backgroundImage = loadImage(file.data);
}

function createGrid(len) {
  let gridWidth = Math.floor(canvasWidth / len);
  step = Math.floor(gridWidth / 4);
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
  } else {
    backphoto = false;
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
  let wordWidth = parseInt(tWidth.value());
  createWord(text, width, len, wordHeight, wordWidth);
}

function draw() {
  background(255);
  push();
  if (backphoto) {
    image(
      backgroundImage,
      0,
      0,
      canvasWidth,
      backgroundImage.height * (canvasWidth / backgroundImage.width)
    );
  }
  pop();
  //}
  text = input.value();
  text = text.toUpperCase();
  len = text.length;

  let wordHeight = parseInt(textHeight.value());
  let wordWidth = parseInt(tWidth.value());

  width = parseInt(imageSize.value());

  //createGrid(len);

  if (useCircle) {
    image(circShape, 0, 0);
    createWord(text, width, len, wordHeight, wordWidth, false);
  } else {
    createWord(text, width, len, wordHeight, wordWidth, true);
  }
}
