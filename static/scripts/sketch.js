let longLine;
let shortLine;
let circ;
let input, button, text;
let len;
let canvasWidth = 2000;
let canvasHeight = 200;
let step;
let sascha;
let vec = false;
let backphoto = false;

function preload() {
  sascha = loadImage("static/images/cropped/flybackground.jpg");
  fly = loadImage("static/images/cropped/fly.jpg");
  pilar = loadImage("static/images/cropped/pilar.jpg");
  gah = loadImage("static/images/cropped/gah.png");
  shortLine = loadImage("static/images/cropped/line2.png");
  circ = loadImage("static/images/cropped/circle.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput("");
  button = createButton("submit");
  button.mousePressed(draw);
  toggle = createButton("To Vector");
  toggle.mousePressed(toVector);
  back = createButton("Add Background");
  back.mousePressed(addBackground);
  background("white");
  stroke("purple");
  fill("purple");

  angleMode(DEGREES);
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

function topH(x, width, height) {
  push();
  for (let i = x; i < x + 200; i = i + height) {
    push();
    translate(i, canvasTop);
    rotate(-90);
    translate(-i, -canvasTop);
    image(
      longLine,
      i,
      canvasTop,
      width,
      (longLine.height * width) / longLine.width
    );
    pop();
  }
  pop();
}
function halfMiddleH(x, width, height) {
  push();
  for (let i = Math.floor(x + 200 / 2); i < x + 200; i = i + height) {
    push();
    translate(i, 200);
    rotate(-90);
    translate(-i, -200);
    image(longLine, i, 200, width, (longLine.height * width) / longLine.width);
    pop();
  }
  pop();
}

function middleH(x, width, height) {
  push();
  for (let i = x; i < x + 200; i = i + height) {
    push();
    translate(i, canvasHeight / 2);
    rotate(-90);
    translate(-i, -canvasHeight / 2);
    image(
      longLine,
      i,
      canvasHeight / 2,
      width,
      (longLine.height * width) / longLine.width
    );
    pop();
  }
  pop();
}

function bottomH(x, width, height) {
  push();
  for (let i = x; i < x + 200; i = i + height) {
    push();
    translate(i, canvasHeight);
    rotate(-90);
    translate(-i, -canvasHeight);
    image(
      longLine,
      i,
      canvasHeight,
      width,
      (longLine.height * width) / longLine.width
    );
    pop();
  }
  pop();
}

function left(x, width, height, start, end) {
  for (let i = start; i < end; i = i + height) {
    image(longLine, x, i, width, (longLine.height * width) / longLine.width);
  }
}

function middle(x, width, height, start, end) {
  for (let i = start; i < end; i = i + height) {
    image(
      longLine,
      x + 100,
      i,
      width + 20,
      (longLine.height * (width + 20)) / longLine.width
    );
  }
}

function diagonal(x, width, height, leftToRight, start, end) {
  if (leftToRight) {
    for (let i = start; i < end; i = i + width) {
      image(longLine, x, i, width, (longLine.height * width) / longLine.width);
      x += width;
    }
  } else {
    for (let i = start; i < end; i = i + width) {
      image(
        longLine,
        x + 200,
        i,
        width,
        (longLine.height * width) / longLine.width
      );
      x -= width;
    }
  }
}

function right(x, width, height, start, end) {
  for (let i = start; i < end; i = i + height) {
    image(
      longLine,
      x + 200,
      i,
      width,
      (longLine.height * width) / longLine.width
    );
  }
}

function createWord(text) {
  let width = 10;
  let height = (longLine.height * width) / longLine.width;
  //let height = mouseY / 10;
  for (let i = 0; i < text.length; i++) {
    let x = 300 * i + mouseX / 10;
    switch (text[i]) {
      case "A":
        left(x, width, height, canvasTop, canvasHeight);
        right(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height);
        middleH(x, width, height);
        break;
      case "B":
        left(x, width, height, canvasTop, canvasHeight);
        right(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height);
        middleH(x, width, height);
        bottomH(x, width, height);
        break;
      case "C":
        left(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height, canvasTop, canvasHeight);
        bottomH(x, width, height);
        break;
      case "D":
        left(x, width, height, canvasTop, canvasHeight);
        right(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height);
        bottomH(x, width, height);
        break;
      case "E":
        left(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height);
        middleH(x, width, height);
        bottomH(x, width, height);
        break;
      case "F":
        left(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height);
        middleH(x, width, height);
        break;
      case "G":
        left(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height);
        bottomH(x, width, height);
        halfMiddleH(x, width, height);
        right(x, width, height, canvasHeight / 2, canvasHeight);
        break;
      case "H":
        left(x, width, height, canvasTop, canvasHeight);
        right(x, width, height, canvasTop, canvasHeight);
        middleH(x, width, height);
        break;
      case "I":
        middle(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height);
        bottomH(x, width, height);
        break;
      case "J":
        topH(x, width, height);
        right(x, width, height, canvasTop, canvasHeight);
        bottomH(x, width, height);
        left(x, width, height, canvasHeight / 2, canvasHeight);
        break;
      case "K":
        left(x, width, height, canvasTop, canvasHeight);
        diagonal(x, width, height, true, canvasHeight / 2, canvasHeight);
        diagonal(x, width, height, false, canvasTop, canvasHeight / 2);
        break;
      case "L":
        left(x, width, height, canvasTop, canvasHeight);
        bottomH(x, width, height);
        break;
      case "M":
        left(x, width, height, canvasTop, canvasHeight);
        middle(x, width, height, canvasTop, canvasHeight);
        right(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height);
        break;
      case "N":
        left(x, width, height, canvasTop, canvasHeight);
        diagonal(x, width, height, true, canvasTop, canvasHeight);
        right(x, width, height, canvasTop, canvasHeight);
        break;
      case "O":
        left(x, width, height, canvasTop, canvasHeight);
        right(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height);
        bottomH(x, width, height);
        diagonal(x, width, height, false, canvasTop, canvasHeight);
        break;
      case "P":
        left(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height);
        right(x, width, height, canvasTop, canvasHeight / 2);
        middleH(x, width, height);
        break;
      case "Q":
        break;
      case "R":
        left(x, width, height, canvasTop, canvasHeight);
        topH(x, width, height);
        middleH(x, width, height);
        right(x, width, height, canvasTop, canvasHeight / 2);
        diagonal(x, width, height, true, canvasHeight / 2, canvasHeight);
        break;
      case "S":
        left(x, width, height, canvasTop, canvasHeight / 2);
        topH(x, width, height);
        middleH(x, width, height);
        bottomH(x, width, height);
        right(x, width, height, canvasHeight / 2, canvasHeight);
        break;
      case "T":
        topH(x, width, height);
        middle(x, width, height, canvasTop, canvasHeight);
        break;
      case "U":
        left(x, width, height, canvasTop, canvasHeight);
        bottomH(x, width, height);
        right(x, width, height, canvasTop, canvasHeight);
        break;
      case "V":
        diagonal(x, width, height, true, canvasTop, canvasHeight);
        diagonal(x, width, height, false, canvasTop, canvasHeight);
        break;
      case "W":
        left(x, width, height, canvasTop, canvasHeight);
        middle(x, width, height, canvasTop, canvasHeight);
        right(x, width, height, canvasTop, canvasHeight);
        bottomH(x, width, height);
        break;
      case "X":
        diagonal(x, width, height, true, canvasTop, canvasHeight);
        diagonal(x, width, height, false, canvasTop, canvasHeight);
        break;
      case "Y":
        diagonal(x, width, height, true);
        diagonal(x, width, height, false);
        middle(x, width, height, canvasHeight / 2, canvasHeight);
        break;
      case "Z":
        topH(x, width, height);
        diagonal(x, width, false, canvasTop, canvasHeight);
        bottomH(x, width, height);
        break;
    }
  }
}

function getHeight(width) {
  return (longLine.height * width) / longLine.width;
}

function topHT(x, y) {
  rect(x, y, 160, 90);
}
function bottomHT(x, y) {
  rect(x, y, 160, 90);
}
function leftT(x, y) {
  rect(x, y, 30, 240);
}
function leftHalfT(x, y) {
  rect(x, y, 30, 140);
}
function rightT(x, y) {
  rect(x, y, 20, 244);
}
function rightHalfT(x, y) {
  rect(x, y, 20, 140);
}
function middleHT(x, y) {
  rect(x, y, 160, 18);
}

function createThickWord(text) {
  let topwidth = 90;
  let bottomwidth = 90;
  let rightwidth = 18;
  let middlewidth = 18;
  let leftwidth = 30;

  let topheight = 160;
  let sideheight = 244;
  //let height = mouseY / 10;
  for (let i = 0; i < text.length; i++) {
    let x = 200 * i + 5;
    switch (text[i]) {
      case "A":
        leftHalfT(x, 100);
        rightHalfT(x + 140, 100);
        topHT(x, 0);
        middleHT(x, 100);
        break;
      case "B":
        leftT(x, 0);
        topHT(x, 30);
        bottomHT(x, 150);
        break;
      case "C":
        left(x, leftwidth, topheight, 5, canvasHeight);
        topH(x, width, heisideheightght, 5, canvasHeight);
        bottomH(x, bottomwidth, sideheight);
        break;
      case "D":
        left(x, leftwidth, topheight, 5, canvasHeight);
        right(x, rightwidth, topheight, 5, canvasHeight);
        topH(x, width, sideheight);
        bottomH(x, bottomwidth, sideheight);
        break;
      case "E":
        left(x, leftwidth, topheight, 5, canvasHeight);
        topH(x, width, sideheight);
        middleH(x, middlewidth, sideheight);
        bottomH(x, width, sideheight);
        break;
      case "F":
        left(x, leftwidth, topheight, 5, canvasHeight);
        topH(x, width, sideheight);
        middleH(x, middlewidth, sideheight);
        break;
      case "G":
        left(x, leftwidth, topheight, 5, canvasHeight);
        topH(x, width, sideheight);
        bottomH(x, width, sideheight);
        halfMiddleH(x, middlewidth, sideheight);
        right(x, width, topheight, canvasHeight / 2, canvasHeight);
        break;
      case "H":
        left(x, width, height, 5, canvasHeight);
        right(x, width, height, 5, canvasHeight);
        middleH(x, width, height);
        break;
      case "I":
        middle(x, width, height, 5, canvasHeight);
        topH(x, width, height);
        bottomH(x, width, height);
        break;
      case "J":
        topH(x, width, height);
        right(x, width, height, 5, canvasHeight);
        bottomH(x, width, height);
        left(x, width, height, canvasHeight / 2, canvasHeight);
        break;
      case "K":
        left(x, width, height, 5, canvasHeight);
        diagonal(x, width, height, true, canvasHeight / 2, canvasHeight);
        diagonal(x, width, height, false, 5, canvasHeight / 2);
        break;
      case "L":
        left(x, width, height, 5, canvasHeight);
        bottomH(x, width, height);
        break;
      case "M":
        left(x, width, height, 5, canvasHeight);
        middle(x, width, height, 5, canvasHeight);
        right(x, width, height, 5, canvasHeight);
        topH(x, width, height);
        break;
      case "N":
        left(x, width, height, 5, canvasHeight);
        diagonal(x, width, height, true, 5, canvasHeight);
        right(x, width, height, 5, canvasHeight);
        break;
      case "O":
        left(x, width, height, 5, canvasHeight);
        right(x, width, height, 5, canvasHeight);
        topH(x, width, height);
        bottomH(x, width, height);
        diagonal(x, width, height, false, 5, canvasHeight);
        break;
      case "P":
        left(x, width, height, 5, canvasHeight);
        topH(x, width, height);
        right(x, width, height, 5, canvasHeight / 2);
        middleH(x, width, height);
        break;
      case "Q":
        break;
      case "R":
        left(x, width, height, 5, canvasHeight);
        topH(x, width, height);
        middleH(x, width, height);
        right(x, width, height, 5, canvasHeight / 2);
        diagonal(x, width, height, true, canvasHeight / 2, canvasHeight);
        break;
      case "S":
        left(x, width, height, 5, canvasHeight / 2);
        topH(x, width, height);
        middleH(x, width, height);
        bottomH(x, width, height);
        right(x, width, height, canvasHeight / 2, canvasHeight);
        break;
      case "T":
        topH(x, width, height);
        middle(x, width, height, 5, canvasHeight);
        break;
      case "U":
        left(x, width, height, 5, canvasHeight);
        bottomH(x, width, height);
        right(x, width, height, 5, canvasHeight);
        break;
      case "V":
        diagonal(x, width, height, true, 5, canvasHeight);
        diagonal(x, width, height, false, 5, canvasHeight);
        break;
      case "W":
        left(x, width, height, 5, canvasHeight);
        middle(x, width, height, 5, canvasHeight);
        right(x, width, height, 5, canvasHeight);
        bottomH(x, width, height);
        break;
      case "X":
        diagonal(x, width, height, true, 5, canvasHeight);
        diagonal(x, width, height, false, 5, canvasHeight);
        break;
      case "Y":
        diagonal(x, width, height, true);
        diagonal(x, width, height, false);
        middle(x, width, height, canvasHeight / 2, canvasHeight);
        break;
      case "Z":
        topH(x, width, height);
        diagonal(x, width, false, 5, canvasHeight);
        bottomH(x, width, height);
        break;
    }
  }
}

function addBackground() {
  if (backphoto === false || backphoto === undefined) {
    backphoto = true;
    for (let i = 0; i < canvasWidth; i = i + 500) {
      image(sascha, i, 0, 700, 700);
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
  background(255, 10);
  //}
  text = input.value();
  text = text.toUpperCase();
  len = text.length;

  createGrid(len);
  createWord(text);
}

function draw() {
  canvasTop = mouseX / 2;
  canvasHeight = mouseY / 2;

  if (mouseY < 1000) {
    longLine = fly;
  } else if (mouseY > 1000 && mouseY < 2000) {
    longLine = gah;
  } else {
    longLine = pilar;
  }
  console.log(backphoto);
  if (backphoto) {
    for (let i = 0; i < canvasWidth; i = i + 500) {
      image(sascha, i, 0, 700, 700);
    }
  }
  turnText();
}
