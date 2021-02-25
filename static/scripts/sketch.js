//JAVASCRIPT FILE FOR IMAGE AS TYPE
//TAKES CROPPED IMAGES AND BUILDS LETTERFORMS USING createWord.js
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
let useItalics;
let useAllCircles;

//loads a set of images for use in case there is no user generated image
function preload() {
  longLine = loadImage("static/images/cropped/newcropped.jpg");
  circShape = loadImage("static/images/original/circle.jpg");
}

//set canvas size and builds the editor
function setup() {
  const canvas = createCanvas(windowWidth - 500, windowHeight);
  background(255);
  canvas.parent("sketch-holder");
  //user chooses image
  image_input = createFileInput(processImage);
  image_input.parent("add-file");
  //user gives text input
  input = createInput("/abcdefg/hijklmno/pqrstuv/wxyz");
  //input = createInput("a");
  input.parent("text-input");
  //edit text height
  textHeight = createInput("220");
  textHeight.parent("text-height");
  //edit text width
  tWidth = createInput("120");
  tWidth.parent("text-width");
  //edit image size
  imageSize = createInput("10");
  imageSize.parent("image-size");
  //edit text kerning
  textKerning = createInput("80");
  textKerning.parent("text-kerning");

  gap = createInput("10");
  gap.parent("gap");

  hgap = createInput("10");
  hgap.parent("hgap");

  allCircles = createButton("toggle all circles");
  allCircles.mousePressed(setAllCirclesTru);
  allCircles.parent("toggle-all-circle");
  //toggle use of circles
  circleButton = createButton("toggle circles");
  circleButton.mousePressed(setCircleTru);
  circleButton.parent("toggle-circle");

  toggleItalics = createButton("toggle italics");
  toggleItalics.mousePressed(setItalicsTru);
  toggleItalics.parent("toggle-italics");
  //toggle use of background
  back = createButton("Add Background");
  back.mousePressed(createTheWord);
  back.parent("add-background");

  background("white");
  stroke("purple");
  fill("purple");

  angleMode(DEGREES);

  canvasWidth = windowWidth - 500;
  canvasHeight = 200;
  width = 10;
  backphoto = false;
}

//sends input image to python's image processing function using the endpoint "/create-image" and "/create-circles"
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
  console.log(imgurl);
  longLine = loadImage(imgurl);

  circPost = undefined;
  circPost = await fetch("/create-circles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  circPost = await circPost.text();
  console.log(circPost);

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

function createTheWord() {
  background(255);
  text = input.value();
  text = text.toUpperCase();
  len = text.length;

  let wordHeight = parseInt(textHeight.value());
  let wordWidth = parseInt(tWidth.value());
  width = parseInt(imageSize.value());
  let kerning = parseInt(textKerning.value());
  let textgap = parseInt(gap.value());
  let htextgap = parseInt(hgap.value());
  console.log("creating");
  createWord(
    text,
    width,
    len,
    wordHeight,
    wordWidth,
    kerning,
    textgap,
    htextgap
  );
}

function setCircleTru() {
  // if (useCircle) {
  //   useCircle = false;
  // } else {
  //   useCircle = true;
  // }
  background(255);
  text = input.value();
  text = text.toUpperCase();
  len = text.length;
  let wordHeight = parseInt(textHeight.value());
  let wordWidth = parseInt(tWidth.value());
  width = parseInt(imageSize.value());
  let kerning = parseInt(textKerning.value());
  let textgap = parseInt(gap.value());
  console.log("creating set circle tru");
  createBigCircles(text, width, len, wordHeight, wordWidth, kerning, textgap);
}

function setItalicsTru() {
  // if (useItalics) {
  //   useItalics = false;
  // } else {
  //   useItalics = true;
  // }
  background(255);
  text = input.value();
  text = text.toUpperCase();
  len = text.length;
  let wordHeight = parseInt(textHeight.value());
  let wordWidth = parseInt(tWidth.value());
  width = parseInt(imageSize.value());
  let kerning = parseInt(textKerning.value());
  let textgap = parseInt(gap.value());
  console.log("creating");
  createItalics(text, width, len, wordHeight, wordWidth, kerning, textgap);
}

function setAllCirclesTru() {
  background(255);
  text = input.value();
  text = text.toUpperCase();
  len = text.length;

  // if (useAllCircles) {
  //   useAllCircles = false;
  // } else {
  //   useAllCircles = true;
  // }
  let wordHeight = parseInt(textHeight.value());
  let wordWidth = parseInt(tWidth.value());
  width = parseInt(imageSize.value());
  let kerning = parseInt(textKerning.value());
  let textgap = parseInt(gap.value());
  console.log("creating");
  createWordWithCircles(
    text,
    width,
    len,
    wordHeight,
    wordWidth,
    kerning,
    textgap
  );
}

// function draw() {
//   background(255);
//   push();
//   //display background image
//   if (backphoto) {
//     image(
//       backgroundImage,
//       0,
//       0,
//       canvasWidth,
//       backgroundImage.height * (canvasWidth / backgroundImage.width)
//     );
//   }
//   pop();
//   text = input.value();
//   text = text.toUpperCase();
//   len = text.length;

//   let wordHeight = parseInt(textHeight.value());
//   let wordWidth = parseInt(tWidth.value());
//   width = parseInt(imageSize.value());
//   let kerning = parseInt(textKerning.value());
//   let textgap = parseInt(gap.value());

//   //create word depending on the useCircle condition
//   //all user input values are sent to createWord
//   // useItalics = true;
//   // if (useAllCircles) {
//   //   if (useCircle) {
//   //     createWordWithCircles(
//   //       text,
//   //       width,
//   //       len,
//   //       wordHeight,
//   //       wordWidth,
//   //       kerning,
//   //       textgap,
//   //       false
//   //     );
//   //   } else {
//   //     createWordWithCircles(
//   //       text,
//   //       width,
//   //       len,
//   //       wordHeight,
//   //       wordWidth,
//   //       kerning,
//   //       textgap,
//   //       true
//   //     );
//   //   }
//   // } else if (useItalics) {
//   //   if (useCircle) {
//   //     createWord(
//   //       text,
//   //       width,
//   //       len,
//   //       wordHeight,
//   //       wordWidth,
//   //       kerning,
//   //       textgap,
//   //       false
//   //     );
//   //   } else {
//   createWord(text, width, len, wordHeight, wordWidth, kerning, 0);
//   //}
//   // } else {
//   //   if (useCircle) {
//   //     createItalics(
//   //       text,
//   //       width,
//   //       len,
//   //       wordHeight,
//   //       wordWidth,
//   //       kerning,
//   //       textgap,
//   //       false
//   //     );
//   //   } else {
//   //     createItalics(
//   //       text,
//   //       width,
//   //       len,
//   //       wordHeight,
//   //       wordWidth,
//   //       kerning,
//   //       textgap,
//   //       true
//   //     );
//   //   }
//   // }
// }
