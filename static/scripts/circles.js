//a series of functions that create letterforms

//function that draws a horizontal line that marks the top of a letter
function topHC(x, width, height, y, letterWidth) {
  for (let i = x; i < x + letterWidth; i = i + height) {
    image(circShape, i, y, height, height);
  }
}

//function that draws half of a horizontal line that marks the middle of a letter
function halfMiddleHC(x, width, height, y, letterWidth) {
  for (let i = Math.floor(x + letterWidth / 2); i < x + 200; i = i + height) {
    image(circShape, i, y, height, height);
  }
}

//function that draws a horizontal line that marks the middle of a letter
function middleHC(x, width, height, y, letterWidth) {
  for (let i = x; i < x + letterWidth; i = i + height) {
    image(circShape, i, y, width, height);
  }
}

//function that draws a horizontal line that marks the bottom of a letter
function bottomHC(x, width, height, y, letterWidth) {
  for (let i = x; i < x + letterWidth; i = i + height) {
    image(circShape, i, y, width, height);
  }
}

//function that draws a vertical line that marks the left side of a letter
function leftC(x, width, height, start, end, gap) {
  for (let i = start; i < end; i = i + height + gap) {
    image(circShape, x, i, width, height);
  }
}

//function that draws a vertical line that marks the middle of a letter
function middleC(x, width, height, start, end, letterWidth, gap) {
  for (let i = start; i < end; i = i + height + gap) {
    image(circShape, x + letterWidth / 2, i, height, height);
  }
}

//function that draws a diagonal line, either from left to right or right to left
function diagonalC(x, height, width, leftToRight, start, end, letterWidth) {
  if (leftToRight) {
    let angle = atan((end - start) / letterWidth);
    //sole.log(angle);
    let increment = cos(angle) * height;
    //console.log(increment);
    let incrementHeight = sin(angle) * height;
    //console.log(incrementHeight);
    let j = start;
    push();
    for (let i = x; i < x + letterWidth; i = i + increment) {
      push();
      translate(i, j);
      translate(-i, -j);
      image(circShape, i, j, increment, incrementHeight);
      pop();
      j += incrementHeight;
    }
    pop();
  } else {
    let angle = atan((end - start) / letterWidth);
    let increment = cos(angle) * height;
    let incrementHeight = sin(angle) * height;
    let j = start;
    push();
    for (let i = x + letterWidth; i > x; i = i - increment) {
      push();
      translate(i, j);
      translate(-i, -j);
      image(circShape, i, j, increment, incrementHeight);
      pop();
      j += incrementHeight;
    }
    pop();
  }
}

//function that draws a vertical line that marks the right side of the letter
function rightC(x, width, height, start, end, letterWidth, gap) {
  for (let i = start; i < end; i = i + height + gap) {
    image(circShape, x + letterWidth, i, height, height);
  }
}

//function that draws a circle
function circ(x, width, height, y, letterWidth) {}

function createWordWithCircles(
  text,
  width,
  len,
  wordHeight,
  wordWidth,
  textKerning,
  gap,
  useCircle,
  useAllCircles
) {
  //x = position of the left most side of letter
  //width = width of image
  //height = height of image that creates the word
  //canvasTop = top of letter
  //canvasHeight = bottom of letter, can be replaced with something else
  let letterWidth = wordWidth || Math.floor(canvasWidth / len - 30);
  let height = Math.floor((longLine.height * width) / longLine.width);
  let counter = 0;
  let lineHeight = 0;
  //let height = mouseY / 10;
  if (useCircle === true) {
    for (let i = 0; i < text.length; i++) {
      if (text[i] == "/") {
        lineHeight++;
        counter = 0;
        continue;
      }
      let x = Math.floor((letterWidth + textKerning) * counter);
      // if (x + letterWidth > canvasWidth) {
      //   lineHeight++;
      // }
      let y = (wordHeight + 20) * lineHeight;
      counter++;
      switch (text[i]) {
        case "A":
          circ(x, width, height, canvasTop + y, letterWidth);
          //circ(x, width, height, canvasTop + y - letterWidth, letterWidth);
          leftC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            wordHeight + y,
            gap
          );
          rightC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          break;
        case "B":
          circ(x, width, height, canvasTop + y, letterWidth);
          //circ(x, width / 2, height, canvasTop + y - letterWidth, letterWidth);
          circ(
            x,
            width,
            height,
            wordHeight + y - letterWidth + 25,
            letterWidth
          );
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          break;
        case "C":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "D":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          topHC(x, width, height, canvasTop + y, letterWidth);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "E":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "F":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          break;
        case "G":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          halfMiddleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          rightC(
            x,
            width,
            height,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          break;
        case "H":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          break;
        case "I":
          middleC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2,
            gap
          );
          topHC(x, width, height, canvasTop + y, letterWidth);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "J":
          topHC(x, width, height, canvasTop + y, letterWidth);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          leftC(x, width, height, wordHeight / 2 + y, wordHeight + y, gap);
          break;
        case "K":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          diagonalC(
            x,
            height,
            width,
            true,
            wordHeight / 2 + y,
            wordHeight + y + width,
            letterWidth
          );
          diagonalC(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight / 2 + y + width,
            letterWidth
          );
          break;
        case "L":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "M":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          middleC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2,
            gap
          );
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          topHC(x, width, height, canvasTop + y, letterWidth);
          break;
        case "N":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          //diagonal(x, width, true, canvasTop + y, wordHeight + y, letterWidth);
          diagonalC(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight / 2 + y + width,
            letterWidth
          );
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          break;
        case "O":
          circ(x, width, height, canvasTop + y, letterWidth);
          break;
        case "P":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          circ(x, width, height, canvasTop + y, letterWidth);
          break;
        case "Q":
          circ(x, width, height, canvasTop + y, letterWidth);
          bottomHC(
            x + letterWidth / 2,
            width,
            height,
            wordHeight + y,
            letterWidth
          );
          break;
        case "R":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          circ(x, width, height, canvasTop + y, letterWidth);

          diagonalC(
            x,
            height,
            width,
            true,
            wordHeight / 2 + y,
            wordHeight + y + width,
            letterWidth
          );
          break;
        case "S":
          leftC(x, width, height, canvasTop + y, wordHeight / 2 + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          rightC(
            x,
            width,
            height,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          break;
        case "T":
          topHC(x, width, height, canvasTop + y, letterWidth);
          middleC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2,
            gap
          );
          break;
        case "U":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          break;
        case "V":
          diagonalC(
            x + letterWidth / 2,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2
          );
          diagonalC(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2
          );
          break;
        case "W":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          middleC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2,
            gap
          );
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "X":
          diagonalC(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight + y,
            letterWidth
          );
          diagonalC(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight + y + width,
            letterWidth
          );
          break;
        case "Y":
          diagonalC(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight / 2 + y + width,
            letterWidth
          );
          diagonalC(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight / 2 + y + width,
            letterWidth
          );
          middleC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2,
            gap
          );
          break;
        case "Z":
          topHC(x, width, height, canvasTop + y, letterWidth);
          diagonalC(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight + y + width,
            letterWidth
          );
          middleHC(x, width, height, wordHeight + y, letterWidth);
          break;
      }
    }
  } else {
    for (let i = 0; i < text.length; i++) {
      if (text[i] == "/") {
        lineHeight++;
        counter = 0;
        continue;
      }
      let x = Math.floor((letterWidth + textKerning) * counter);
      let y = (wordHeight + 20) * lineHeight;
      counter++;
      switch (text[i]) {
        case "A":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          topHC(x, width, height, canvasTop + y, letterWidth);
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          break;
        case "B":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          topHC(x, width, height, canvasTop + y, letterWidth);
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "C":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "D":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          topHC(x, width, height, canvasTop + y, letterWidth);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "E":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "F":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          break;
        case "G":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          halfMiddleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          rightC(
            x,
            width,
            height,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          break;
        case "H":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          break;
        case "I":
          middleC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2,
            gap
          );
          topHC(x, width, height, canvasTop + y, letterWidth);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "J":
          topHC(x, width, height, canvasTop + y, letterWidth);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          leftC(x, width, height, wordHeight / 2 + y, wordHeight + y, gap);
          break;
        case "K":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          diagonalC(
            x,
            height,
            width,
            true,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth
          );
          diagonalC(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth
          );
          break;
        case "L":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "M":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          middleC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2,
            gap
          );
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          topHC(x, width, height, canvasTop + y, letterWidth);
          break;
        case "N":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          diagonalC(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight + y,
            letterWidth
          );
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          break;
        case "O":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          topHC(x, width, height, canvasTop + y, letterWidth);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          diagonalC(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight + y,
            letterWidth
          );
          break;
        case "P":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth
          );
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          break;
        case "Q":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          topHC(x, width, height, canvasTop + y, letterWidth);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          diagonalC(
            x + letterWidth / 2,
            height,
            width,
            true,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth
          );
          break;
        case "R":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth,
            gap
          );
          diagonalC(
            x,
            height,
            width,
            true,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth
          );
          break;
        case "S":
          leftC(x, width, height, canvasTop + y, wordHeight / 2 + y, gap);
          topHC(x, width, height, canvasTop + y, letterWidth);
          middleHC(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          rightC(
            x,
            width,
            height,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          break;
        case "T":
          topHC(x, width, height, canvasTop + y, letterWidth);
          middleC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2,
            gap
          );
          break;
        case "U":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          break;
        case "V":
          diagonalC(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight + y,
            letterWidth
          );
          diagonalC(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight + y,
            letterWidth
          );
          break;
        case "W":
          leftC(x, width, height, canvasTop + y, wordHeight + y, gap);
          middleC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2,
            gap
          );
          rightC(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
        case "X":
          diagonalC(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight + y,
            letterWidth
          );
          diagonalC(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight + y,
            letterWidth
          );
          break;
        case "Y":
          diagonalC(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth / 2
          );
          diagonalC(
            x + letterWidth / 2 - 10,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth
          );
          middleC(
            x,
            width,
            height,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth / 2,
            gap
          );
          break;
        case "Z":
          topHC(x, width, height, canvasTop + y, letterWidth);
          diagonalC(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth
          );
          bottomHC(x, width, height, wordHeight + y, letterWidth);
          break;
      }
    }
  }
}
