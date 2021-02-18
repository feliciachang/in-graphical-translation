//a series of functions that create letterforms

//function that draws a horizontal line that marks the top of a letter
function topHI(x, width, height, y, letterWidth) {
  push();
  for (let i = x; i < x + letterWidth; i = i + height) {
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
function halfMiddleHI(x, width, height, y, letterWidth) {
  push();
  for (let i = Math.floor(x + letterWidth / 2); i < x + 200; i = i + height) {
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
function middleHI(x, width, height, y, letterWidth) {
  push();
  for (let i = x; i < x + letterWidth; i = i + height) {
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
function bottomHI(x, width, height, y, letterWidth) {
  push();
  for (let i = x; i < x + letterWidth; i = i + height) {
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
function leftI(x, width, height, start, end, gap) {
  for (let i = start; i < end; i = i + height + gap) {
    image(longLine, x, i, width, (longLine.height * width) / longLine.width);
  }
}

//function that draws a vertical line that marks the middle of a letter
function middleI(x, width, height, start, end, letterWidth, gap) {
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

//a series of functions that create letterforms

//function that draws a horizontal line that marks the top of a letter
function topHI(x, width, height, y, letterWidth) {
  push();
  for (let i = x; i < x + letterWidth; i = i + height) {
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
function halfMiddleHI(x, width, height, y, letterWidth) {
  push();
  for (
    let i = Math.floor(x + letterWidth / 2 - 5);
    i < x + 200 - 5;
    i = i + height
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
function middleHI(x, width, height, y, letterWidth) {
  push();
  for (let i = x - 5; i < x + letterWidth - 5; i = i + height) {
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
function bottomHI(x, width, height, y, letterWidth) {
  push();
  for (let i = x - 20; i < x + letterWidth - 20; i = i + height) {
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
function leftI(x, width, height, start, end, gap) {
  // if (regular) {
  //   for (let i = start; i < end; i = i + height + gap) {
  //     image(longLine, x, i, width, (longLine.height * width) / longLine.width);
  //   }
  // } else {
  let angle = atan(120);
  let increment = cos(angle) * height;
  let incrementHeight = sin(angle) * height;
  let j = start;
  let i = x;
  push();
  for (let a = start; a < end + 60; a = a + height + gap) {
    push();
    translate(i, j);
    translate(-i, -j);
    image(longLine, i, j, width, (longLine.height * width) / longLine.width);
    pop();
    j += incrementHeight;
    i -= 5;
  }
  pop();
  //}
}

//function that draws a vertical line that marks the middle of a letter
function middleI(x, width, height, start, end, letterWidth, gap) {
  // for (let i = start; i < end; i = i + height + gap) {
  //   image(
  //     longLine,
  //     x + letterWidth,
  //     i,
  //     width,
  //     (longLine.height * width) / longLine.width
  //   );
  // }
  let angle = atan(120);
  let increment = cos(angle) * height;
  let incrementHeight = sin(angle) * height;
  let j = start;
  let i = x + letterWidth / 2;
  push();
  for (let a = start; a < end + 20; a = a + height + gap) {
    push();
    translate(i, j);
    translate(-i, -j);
    image(longLine, i, j, width, (longLine.height * width) / longLine.width);
    pop();
    j += incrementHeight;
    i -= 5;
  }
  pop();
}

//function that draws a diagonal line, either from left to right or right to left
function diagonalI(x, height, width, leftToRight, start, end, letterWidth) {
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
      rotate(-angle);
      translate(-i, -j);
      image(longLine, i, j, width, (longLine.height * width) / longLine.width);
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
      rotate(angle);
      translate(-i, -j);
      image(longLine, i, j, width, (longLine.height * width) / longLine.width);
      pop();
      j += incrementHeight;
    }
    pop();
  }
}

//function that draws a vertical line that marks the right side of the letter
function rightI(x, width, height, start, end, letterWidth, gap) {
  let angle = atan(120);
  let increment = cos(angle) * height;
  let incrementHeight = sin(angle) * height;
  let j = start;
  let i = x + letterWidth;
  push();
  for (let a = start; a < end; a = a + height + gap) {
    push();
    translate(i, j);
    translate(-i, -j);
    image(longLine, i, j, width, (longLine.height * width) / longLine.width);
    pop();
    j += incrementHeight;
    i -= 5;
  }
  pop();
}

//function that draws a circle
function circI(x, width, height, y, letterWidth) {
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

function createItalics(
  text,
  width,
  len,
  wordHeight,
  wordWidth,
  textKerning,
  gap
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
  // if (useCircle === true) {
  //   for (let i = 0; i < text.length; i++) {
  //     if (text[i] == "/") {
  //       lineHeight++;
  //       counter = 0;
  //       continue;
  //     }
  //     let x = Math.floor((letterWidth + textKerning) * counter);
  //     // if (x + letterWidth > canvasWidth) {
  //     //   lineHeight++;
  //     // }
  //     let y = (wordHeight + 20) * lineHeight;
  //     counter++;
  //     switch (text[i]) {
  //       case "A":
  //         circI(x, width, height, canvasTop + y, letterWidth);
  //         //circ(x, width, height, canvasTop + y - letterWidth, letterWidth);
  //         leftI(
  //           x,
  //           width,
  //           height,
  //           (wordHeight - canvasTop) / 2 + y,
  //           wordHeight + y,
  //           gap
  //         );
  //         rightI(
  //           x,
  //           width,
  //           height,
  //           (wordHeight - canvasTop) / 2 + y,
  //           wordHeight + y,
  //           letterWidth,
  //           gap
  //         );
  //         middleHI(
  //           x,
  //           width,
  //           height,
  //           (wordHeight - canvasTop) / 2 + y,
  //           letterWidth
  //         );
  //         break;
  //       case "B":
  //         circI(x, width, height, canvasTop + y, letterWidth);
  //         //circ(x, width / 2, height, canvasTop + y - letterWidth, letterWidth);
  //         circI(
  //           x,
  //           width,
  //           height,
  //           wordHeight + y - letterWidth + 25,
  //           letterWidth
  //         );
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         break;
  //       case "C":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         topHI(x, width, height, canvasTop + y, letterWidth);
  //         bottomHI(x, width, height, wordHeight + y, letterWidth);
  //         break;
  //       case "D":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         rightI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth,
  //           gap
  //         );
  //         topHI(x, width, height, canvasTop + y, letterWidth);
  //         bottomHI(x, width, height, wordHeight + y, letterWidth);
  //         break;
  //       case "E":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         topHI(x, width, height, canvasTop + y, letterWidth);
  //         middleHI(
  //           x,
  //           width,
  //           height,
  //           (wordHeight - canvasTop) / 2 + y,
  //           letterWidth
  //         );
  //         bottomHI(x, width, height, wordHeight + y, letterWidth);
  //         break;
  //       case "F":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         topHI(x, width, height, canvasTop + y, letterWidth);
  //         middleHI(
  //           x,
  //           width,
  //           height,
  //           (wordHeight - canvasTop) / 2 + y,
  //           letterWidth
  //         );
  //         break;
  //       case "G":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         topHI(x, width, height, canvasTop + y, letterWidth);
  //         bottomHI(x, width, height, wordHeight + y, letterWidth);
  //         halfMiddleHI(
  //           x,
  //           width,
  //           height,
  //           (wordHeight - canvasTop) / 2 + y,
  //           letterWidth
  //         );
  //         rightI(
  //           x,
  //           width,
  //           height,
  //           wordHeight / 2 + y,
  //           wordHeight + y,
  //           letterWidth,
  //           gap
  //         );
  //         break;
  //       case "H":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         rightI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth,
  //           gap
  //         );
  //         middleHI(
  //           x,
  //           width,
  //           height,
  //           (wordHeight - canvasTop) / 2 + y,
  //           letterWidth
  //         );
  //         break;
  //       case "I":
  //         middleI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth / 2,
  //           gap
  //         );
  //         topHI(x, width, height, canvasTop + y, letterWidth);
  //         bottomHI(x, width, height, wordHeight + y, letterWidth);
  //         break;
  //       case "J":
  //         topHI(x, width, height, canvasTop + y, letterWidth);
  //         rightI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth,
  //           gap
  //         );
  //         bottomHI(x, width, height, wordHeight + y, letterWidth);
  //         leftI(x, width, height, wordHeight / 2 + y, wordHeight + y, gap);
  //         break;
  //       case "K":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         diagonalI(
  //           x,
  //           height,
  //           width,
  //           true,
  //           wordHeight / 2 + y,
  //           wordHeight + y + width,
  //           letterWidth
  //         );
  //         diagonalI(
  //           x,
  //           height,
  //           width,
  //           true,
  //           canvasTop + y,
  //           wordHeight / 2 + y + width,
  //           letterWidth
  //         );
  //         break;
  //       case "L":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         bottomHI(x, width, height, wordHeight + y, letterWidth);
  //         break;
  //       case "M":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         middleI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth / 2,
  //           gap
  //         );
  //         rightI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth,
  //           gap
  //         );
  //         topHI(x, width, height, canvasTop + y, letterWidth);
  //         break;
  //       case "N":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         //diagonal(x, width, true, canvasTop + y, wordHeight + y, letterWidth);
  //         diagonalI(
  //           x,
  //           height,
  //           width,
  //           true,
  //           canvasTop + y,
  //           wordHeight / 2 + y + width,
  //           letterWidth
  //         );
  //         rightI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth,
  //           gap
  //         );
  //         break;
  //       case "O":
  //         circI(x, width, height, canvasTop + y, letterWidth);
  //         break;
  //       case "P":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         circI(x, width, height, canvasTop + y, letterWidth);
  //         break;
  //       case "Q":
  //         circI(x, width, height, canvasTop + y, letterWidth);
  //         bottomHI(
  //           x + letterWidth / 2,
  //           width,
  //           height,
  //           wordHeight + y,
  //           letterWidth
  //         );
  //         break;
  //       case "R":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         circI(x, width, height, canvasTop + y, letterWidth);

  //         diagonalI(
  //           x,
  //           height,
  //           width,
  //           true,
  //           wordHeight / 2 + y,
  //           wordHeight + y + width,
  //           letterWidth
  //         );
  //         break;
  //       case "S":
  //         leftI(x, width, height, canvasTop + y, wordHeight / 2 + y, gap);
  //         topHI(x, width, height, canvasTop + y, letterWidth);
  //         middleHI(
  //           x,
  //           width,
  //           height,
  //           (wordHeight - canvasTop) / 2 + y,
  //           letterWidth
  //         );
  //         bottomHI(x, width, height, wordHeight + y, letterWidth);
  //         rightI(
  //           x,
  //           width,
  //           height,
  //           wordHeight / 2 + y,
  //           wordHeight + y,
  //           letterWidth,
  //           gap
  //         );
  //         break;
  //       case "T":
  //         topHI(x, width, height, canvasTop + y, letterWidth);
  //         middleI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth / 2,
  //           gap
  //         );
  //         break;
  //       case "U":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         bottomHI(x, width, height, wordHeight + y, letterWidth);
  //         rightI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth,
  //           gap
  //         );
  //         break;
  //       case "V":
  //         diagonalI(
  //           x + letterWidth / 2,
  //           height,
  //           width,
  //           false,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth / 2
  //         );
  //         diagonalI(
  //           x,
  //           height,
  //           width,
  //           true,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth / 2
  //         );
  //         break;
  //       case "W":
  //         leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
  //         middleI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth / 2,
  //           gap
  //         );
  //         rightI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth,
  //           gap
  //         );
  //         bottomHI(x, width, height, wordHeight + y, letterWidth);
  //         break;
  //       case "X":
  //         diagonalI(
  //           x,
  //           height,
  //           width,
  //           false,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth
  //         );
  //         diagonalI(
  //           x,
  //           height,
  //           width,
  //           true,
  //           canvasTop + y,
  //           wordHeight + y + width,
  //           letterWidth
  //         );
  //         break;
  //       case "Y":
  //         diagonalI(
  //           x,
  //           height,
  //           width,
  //           true,
  //           canvasTop + y,
  //           wordHeight / 2 + y + width,
  //           letterWidth
  //         );
  //         diagonalI(
  //           x,
  //           height,
  //           width,
  //           false,
  //           canvasTop + y,
  //           wordHeight / 2 + y + width,
  //           letterWidth
  //         );
  //         middleI(
  //           x,
  //           width,
  //           height,
  //           canvasTop + y,
  //           wordHeight + y,
  //           letterWidth / 2,
  //           gap
  //         );
  //         break;
  //       case "Z":
  //         topHI(x, width, height, canvasTop + y, letterWidth);
  //         diagonalI(
  //           x,
  //           height,
  //           width,
  //           false,
  //           canvasTop + y,
  //           wordHeight + y + width,
  //           letterWidth
  //         );
  //         middleHI(x, width, height, wordHeight + y, letterWidth);
  //         break;
  //     }
  //   }
  // } else {
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
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        rightI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topHI(x, width, height, canvasTop + y, letterWidth);
        middleHI(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth
        );
        break;
      case "B":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        rightI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topHI(x, width, height, canvasTop + y, letterWidth);
        middleHI(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth
        );
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        break;
      case "C":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        topHI(x, width, height, canvasTop + y, letterWidth);
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        break;
      case "D":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        rightI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topHI(x, width, height, canvasTop + y, letterWidth);
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        break;
      case "E":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        topHI(x, width, height, canvasTop + y, letterWidth);
        middleHI(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth
        );
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        break;
      case "F":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        topHI(x, width, height, canvasTop + y, letterWidth);
        middleHI(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth
        );
        break;
      case "G":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        topHI(x, width, height, canvasTop + y, letterWidth);
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        halfMiddleHI(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth
        );
        rightI(
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
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        rightI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        middleHI(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth
        );
        break;
      case "I":
        middleI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth / 2,
          gap
        );
        topHI(x, width, height, canvasTop + y, letterWidth);
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        break;
      case "J":
        topHI(x, width, height, canvasTop + y, letterWidth);
        rightI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        leftI(x, width, height, wordHeight / 2 + y, wordHeight + y, gap);
        break;
      case "K":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        diagonalI(
          x,
          height,
          width,
          true,
          wordHeight / 2 + y,
          wordHeight + y,
          letterWidth
        );
        diagonalI(
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
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        break;
      case "M":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        middleI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth / 2,
          gap
        );
        rightI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topHI(x, width, height, canvasTop + y, letterWidth);
        break;
      case "N":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        diagonalI(
          x,
          height,
          width,
          true,
          canvasTop + y,
          wordHeight + y,
          letterWidth
        );
        rightI(
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
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        rightI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topHI(x, width, height, canvasTop + y, letterWidth);
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        diagonalI(
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
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        topHI(x, width, height, canvasTop + y, letterWidth);
        rightI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight / 2 + y,
          letterWidth
        );
        middleHI(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth
        );
        break;
      case "Q":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        rightI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        topHI(x, width, height, canvasTop + y, letterWidth);
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        diagonalI(
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
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        topHI(x, width, height, canvasTop + y, letterWidth);
        middleHI(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth
        );
        rightI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight / 2 + y,
          letterWidth,
          gap
        );
        diagonalI(
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
        leftI(x, width, height, canvasTop + y, wordHeight / 2 + y - 20, gap);
        topHI(x, width, height, canvasTop + y, letterWidth);
        middleHI(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          letterWidth
        );
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        rightI(
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
        topHI(x, width, height, canvasTop + y, letterWidth);
        middleI(
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
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        rightI(
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
        diagonalI(
          x,
          height,
          width,
          true,
          canvasTop + y,
          wordHeight + y,
          letterWidth
        );
        diagonalI(
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
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        middleI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth / 2,
          gap
        );
        rightI(
          x,
          width,
          height,
          canvasTop + y,
          wordHeight + y,
          letterWidth,
          gap
        );
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        break;
      case "X":
        diagonalI(
          x,
          height,
          width,
          true,
          canvasTop + y,
          wordHeight + y,
          letterWidth
        );
        diagonalI(
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
        diagonalI(
          x,
          height,
          width,
          true,
          canvasTop + y,
          wordHeight / 2 + y,
          letterWidth / 2
        );
        diagonalI(
          x + letterWidth / 2 - 10,
          height,
          width,
          false,
          canvasTop + y,
          wordHeight / 2 + y,
          letterWidth
        );
        middleI(
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
        topHI(x, width, height, canvasTop + y, letterWidth);
        diagonalI(
          x,
          height,
          width,
          false,
          canvasTop + y,
          wordHeight / 2 + y,
          letterWidth
        );
        bottomHI(x, width, height, wordHeight + y, letterWidth);
        break;
      //}
    }
  }
}
