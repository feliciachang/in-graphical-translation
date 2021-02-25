//a series of functions that create letterforms

//function that draws a horizontal line that marks the top of a letter
function topH(x, width, height, y, letterWidth, gap) {
  push();
  for (let i = x; i < x + letterWidth; i = i + height + gap) {
    push();
    translate(i, y + width);
    rotate(-90);
    translate(-i, -y - width);
    image(
      longLine,
      i,
      y + width,
      width,
      (longLine.height * width) / longLine.width
    );
    pop();
  }
  pop();
}

//function that draws half of a horizontal line that marks the middle of a letter
function halfMiddleH(x, width, height, y, letterWidth, gap) {
  push();
  for (
    let i = Math.floor(x + letterWidth / 2);
    i < x + 200;
    i = i + height + gap
  ) {
    push();
    translate(i, y);
    rotate(-90);
    translate(-i, -y);
    image(longLine, i, y, width, (longLine.height * width) / longLine.width);
    pop();
  }
  pop();
}

//function that draws a horizontal line that marks the middle of a letter
function middleH(x, width, height, y, letterWidth, gap) {
  push();
  for (let i = x; i < x + letterWidth; i = i + height + gap) {
    push();
    translate(i, y + width);
    rotate(-90);
    translate(-i, -y - width);
    image(
      longLine,
      i,
      y + width,
      width,
      (longLine.height * width) / longLine.width
    );
    pop();
  }
  pop();
}

//function that draws a horizontal line that marks the bottom of a letter
function bottomH(x, width, height, y, letterWidth, gap) {
  push();
  for (let i = x; i < x + letterWidth; i = i + height + gap) {
    push();
    translate(i, y);
    rotate(-90);
    translate(-i, -y);
    image(longLine, i, y, width, (longLine.height * width) / longLine.width);
    pop();
  }
  pop();
}

//function that draws a vertical line that marks the left side of a letter
function left(x, width, height, start, end, gap) {
  for (let i = start; i < end; i = i + height + gap) {
    image(longLine, x, i, width, (longLine.height * width) / longLine.width);
  }
}

//function that draws a vertical line that marks the middle of a letter
function middle(x, width, height, start, end, letterWidth, gap) {
  for (let i = start; i < end; i = i + height + gap) {
    image(
      longLine,
      x + letterWidth,
      i,
      width,
      (longLine.height * width) / longLine.width
    );
  }
}

// diagonal(
//   x,
//   height,
//   width,
//   true,
//   wordHeight / 2 + y,
//   wordHeight + y,
//   letterWidth
// );

// diagonal(
//   x + letterWidth / 2,
//   height,
//   width,
//   false,
//   canvasTop + y,
//   wordHeight + y,
//   letterWidth / 2
// );
//function that draws a diagonal line, either from left to right or right to left

function diagonal(x, height, width, leftToRight, start, end, letterWidth, gap) {
  let x1 = x;
  let y1 = start;
  let x2 = x + letterWidth;
  let y2 = end;
  let letterHeight = end - start;

  let angle = atan(letterWidth / letterHeight);

  if (leftToRight) {
    let i = x1;
    let j = y1;
    while (i < x2 && j < y2) {
      push();
      translate(i, j);
      rotate(Math.PI - angle);
      translate(-i, -j);
      image(longLine, i, j, width, (longLine.height * width) / longLine.width);
      pop();
      j += cos(angle) * (height + gap);
      i += sin(angle) * (height + gap);
    }
  } else {
    let i = x2;
    let j = y1;
    while (i > x1 && j < y2) {
      push();
      translate(i, j);
      rotate(angle);
      translate(-i, -j);
      image(longLine, i, j, width, (longLine.height * width) / longLine.width);
      pop();
      j += cos(angle) * (height + gap);
      i -= sin(angle) * (height + gap);
    }
  }
}

function diagonalToCenter(
  x,
  height,
  width,
  leftToRight,
  start,
  end,
  letterWidth,
  gap
) {
  if (leftToRight) {
    let x1 = x;
    let y1 = start;
    let x2 = x + letterWidth / 2;
    let y2 = end;
    let letterHeight = end - start;

    let angle = atan(letterWidth / 2 / letterHeight);
    let i = x1;
    let j = y1;
    while (i < x2 && j < y2) {
      push();
      translate(i, j);
      rotate(-angle);
      translate(-i, -j);
      image(longLine, i, j, width, (longLine.height * width) / longLine.width);
      pop();
      j += cos(angle) * (height + gap);
      i += sin(angle) * (height + gap);
    }
  } else {
    let x1 = x + letterWidth / 2;
    let y1 = start;
    let x2 = x + letterWidth;
    let y2 = end;
    let letterHeight = end - start;

    let angle = atan(letterWidth / 2 / letterHeight);
    let i = x2;
    let j = y1;
    while (i > x1 && j < y2) {
      push();
      translate(i, j);
      rotate(angle);
      translate(-i, -j);
      image(longLine, i, j, width, (longLine.height * width) / longLine.width);
      pop();
      j += cos(angle) * (height + gap);
      i -= sin(angle) * (height + gap);
    }
  }
}

//function that draws a vertical line that marks the right side of the letter
function right(x, width, height, start, end, letterWidth, gap) {
  for (let i = start; i < end; i = i + height + gap) {
    image(
      longLine,
      x + letterWidth,
      i,
      width,
      (longLine.height * width) / longLine.width
    );
  }
}

//function that draws a circle
function circ(x, width, height, y, letterWidth) {
  console.log("heree circ");
  image(circShape, x + width, y, letterWidth - width, letterWidth - width);
  //   push();
  //   for (let i = x; i < x + letterWidth; i = i + height) {
  //     push();
  //     translate(i, y);
  //     rotate(-90);
  //     translate(-i, -y);
  //     image(circShape, i, y, width, (circShape.height * width) / circShape.width);
  //     pop();
  //   }
  //   pop();
}

function createWord(
  text,
  width,
  len,
  wordHeight,
  wordWidth,
  textKerning,
  gap,
  hgap
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
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        right(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topH(x, width, height, canvasTop + y, letterWidth, hgap);
        middleH(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth,
          hgap
        );
        break;
      case "B":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        right(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topH(x, width, height, canvasTop + y, letterWidth, hgap);
        middleH(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth,
          hgap
        );
        bottomH(x, width, height, wordHeight + y, letterWidth, hgap);
        break;
      case "C":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        topH(x, width, height, canvasTop + y, letterWidth + width, hgap);
        bottomH(x, width, height, wordHeight + y, letterWidth + width, hgap);
        break;
      case "D":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        right(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topH(x, width, height, canvasTop + y, letterWidth, hgap);
        bottomH(x, width, height, wordHeight + y, letterWidth, hgap);
        break;
      case "E":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        topH(x, width, height, canvasTop + y, letterWidth + width, hgap);
        middleH(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth + width,
          hgap
        );
        bottomH(x, width, height, wordHeight + y, letterWidth + width, hgap);
        break;
      case "F":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        topH(x, width, height, canvasTop + y, letterWidth + width, hgap);
        middleH(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth + width,
          hgap
        );
        break;
      case "G":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        topH(x, width, height, canvasTop + y, letterWidth + width, hgap);
        bottomH(x, width, height, wordHeight + y, letterWidth, hgap);
        halfMiddleH(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth,
          hgap
        );
        right(
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
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        right(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        middleH(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth,
          hgap
        );
        break;
      case "I":
        middle(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth / 2,
          gap
        );
        topH(x, width, height, canvasTop + y, letterWidth + width, hgap);
        bottomH(x, width, height, wordHeight + y, letterWidth + width, hgap);
        break;
      case "J":
        topH(x, width, height, canvasTop + y, letterWidth + width, hgap);
        right(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        bottomH(x, width, height, wordHeight + y, letterWidth, hgap);
        left(x, width, height, wordHeight / 2 + y, wordHeight + y, gap);
        break;
      case "K":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        middleH(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth,
          hgap
        );
        // right(
        //   x,
        //   width,
        //   height,
        //   canvasTop + y,
        //   wordHeight / 2 + y,
        //   letterWidth / 2,
        //   gap
        // );
        right(
          x,
          width,
          height,
          wordHeight / 2 + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        // diagonal(
        //   x,
        //   height,
        //   width,
        //   true,
        //   wordHeight / 2 + y,
        //   wordHeight + y,
        //   letterWidth,
        //   hgap
        // );
        diagonal(
          x,
          height,
          width,
          false,
          canvasTop + y,
          wordHeight / 2 + y,
          letterWidth,
          hgap
        );
        break;
      case "L":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        bottomH(x, width, height, wordHeight + y, letterWidth + width, hgap);
        break;
      case "M":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        middle(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth / 2,
          gap
        );
        right(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topH(x, width, height, canvasTop + y, letterWidth, hgap);
        break;
      case "N":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        diagonal(
          x,
          height,
          width,
          true,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          hgap
        );
        right(
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
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        right(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topH(x, width, height, canvasTop + y, letterWidth, hgap);
        bottomH(x, width, height, wordHeight + y, letterWidth, hgap);
        diagonal(
          x + letterWidth / 2,
          height,
          width,
          true,
          wordHeight / 2 + y,
          wordHeight + y,
          letterWidth
        );
        break;
      case "P":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        topH(x, width, height, canvasTop + y, letterWidth, hgap);
        right(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight / 2 + y,
          letterWidth,
          gap
        );
        middleH(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth,
          hgap
        );
        break;
      case "Q":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        right(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topH(x, width, height, canvasTop + y, letterWidth, hgap);
        bottomH(x, width, height, wordHeight + y, letterWidth, hgap);
        diagonal(
          x + letterWidth / 2,
          height,
          width,
          true,
          wordHeight / 2 + y,
          wordHeight + y,
          letterWidth,
          hgap
        );
        break;
      case "R":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        topH(x, width, height, canvasTop + y, letterWidth, hgap);
        middleH(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth,
          hgap
        );
        right(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight / 2 + y,
          letterWidth,
          gap
        );
        diagonal(
          x,
          height,
          width,
          true,
          wordHeight / 2 + y,
          wordHeight + y,
          letterWidth,
          hgap
        );
        break;
      case "S":
        left(x, width, height, canvasTop + y, wordHeight / 2 + y, gap);
        topH(x, width, height, canvasTop + y, letterWidth + width, hgap);
        middleH(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth,
          hgap
        );
        bottomH(x, width, height, wordHeight + y, letterWidth, hgap);
        right(
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
        topH(x, width, height, canvasTop + y, letterWidth + width, hgap);
        middle(
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
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        bottomH(x, width, height, wordHeight + y, letterWidth, hgap);
        right(
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
        diagonalToCenter(
          x,
          height,
          width,
          true,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          hgap
        );
        diagonalToCenter(
          x,
          height,
          width,
          false,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          hgap
        );
        break;
      case "W":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        middle(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth / 2,
          gap
        );
        right(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        bottomH(x, width, height, wordHeight + y, letterWidth, hgap);
        break;
      case "X":
        diagonal(
          x,
          height,
          width,
          true,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          hgap
        );
        diagonal(
          x,
          height,
          width,
          false,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          hgap
        );
        break;
      case "Y":
        diagonalToCenter(
          x,
          height,
          width,
          true,
          canvasTop + y,
          wordHeight / 2 + y,
          letterWidth,
          hgap
        );
        diagonalToCenter(
          x,
          height,
          width,
          false,
          canvasTop + y,
          wordHeight / 2 + y,
          letterWidth,
          hgap
        );
        middle(
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
        topH(x, width, height, canvasTop + y, letterWidth, hgap);
        diagonal(
          x,
          height,
          width,
          false,
          canvasTop + y,
          wordHeight + y - 5,
          letterWidth,
          hgap
        );
        bottomH(x, width, height, wordHeight + y, letterWidth + width, hgap);
        break;
    }
  }
}
