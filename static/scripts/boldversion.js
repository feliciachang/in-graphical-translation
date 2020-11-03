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
