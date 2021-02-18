//a series of functions that create letterforms

//function that draws a horizontal line that marks the top of a letter
function topH(x, width, height, y, letterWidth) {
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
function halfMiddleH(x, width, height, y, letterWidth) {
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
function middleH(x, width, height, y, letterWidth) {
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
function bottomH(x, width, height, y, letterWidth) {
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
function diagonal(x, height, width, leftToRight, start, end, letterWidth) {
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

  // let currHeight = 0;
  // if (leftToRight) {
  //   for (let i = 0; i < letterWidth; i = i + width) {
  //     currHeight += width;
  //   }
  //   let heightDiff = end - start - currHeight;
  //   let interval = Math.floor(heightDiff / 2);
  //   for (let i = 0; i < interval; i = i + height) {
  //     image(
  //       longLine,
  //       x,
  //       i + start,
  //       width,
  //       (longLine.height * width) / longLine.width
  //     );
  //     image(
  //       longLine,
  //       x + letterWidth,
  //       end + height - i,
  //       width,
  //       (longLine.height * width) / longLine.width
  //     );
  //   }
  //   for (let i = 0; i < letterWidth + width; i = i + width) {
  //     image(
  //       longLine,
  //       x,
  //       start + interval + i,
  //       width,
  //       (longLine.height * width) / longLine.width
  //     );
  //     x += width;
  //   }
  // } else {
  //   for (let i = 0; i < letterWidth; i = i + width) {
  //     currHeight += width;
  //   }
  //   let heightDiff = end - start - currHeight;
  //   let interval = Math.floor(heightDiff / 2);
  //   for (let i = 0; i < interval; i = i + height) {
  //     image(
  //       longLine,
  //       x + letterWidth,
  //       i + start,
  //       width,
  //       (longLine.height * width) / longLine.width
  //     );
  //     image(
  //       longLine,
  //       x,
  //       end + height - i,
  //       width,
  //       (longLine.height * width) / longLine.width
  //     );
  //   }
  //   for (let i = 0; i < letterWidth + width; i = i + width) {
  //     image(
  //       longLine,
  //       x + letterWidth,
  //       start + interval + i,
  //       width,
  //       (longLine.height * width) / longLine.width
  //     );
  //     x -= width;
  //   }
  //   // for (let i = start; i < end; i = i + width) {
  //   //   image(
  //   //     longLine,
  //   //     x + letterWidth,
  //   //     i,
  //   //     width,
  //   //     (longLine.height * width) / longLine.width
  //   //   );
  //   //   x -= width;
  //   // }
  // }
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
  useCircle,
  useAllCircles,
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
          left(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            wordHeight + y,
            gap
          );
          right(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          middleH(
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
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          break;
        case "C":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
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
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "E":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          middleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "F":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          middleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          break;
        case "G":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          halfMiddleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
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
            letterWidth
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
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "J":
          topH(x, width, height, canvasTop + y, letterWidth);
          right(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          bottomH(x, width, height, wordHeight + y, letterWidth);
          left(x, width, height, wordHeight / 2 + y, wordHeight + y, gap);
          break;
        case "K":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          diagonal(
            x,
            height,
            width,
            true,
            wordHeight / 2 + y,
            wordHeight + y + width,
            letterWidth
          );
          diagonal(
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
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          bottomH(x, width, height, wordHeight + y, letterWidth);
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
          topH(x, width, height, canvasTop + y, letterWidth);
          break;
        case "N":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          //diagonal(x, width, true, canvasTop + y, wordHeight + y, letterWidth);
          diagonal(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight / 2 + y + width,
            letterWidth
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
          circ(x, width, height, canvasTop + y, letterWidth);
          break;
        case "P":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          circ(x, width, height, canvasTop + y, letterWidth);
          break;
        case "Q":
          circ(x, width, height, canvasTop + y, letterWidth);
          bottomH(
            x + letterWidth / 2,
            width,
            height,
            wordHeight + y,
            letterWidth
          );
          break;
        case "R":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          circ(x, width, height, canvasTop + y, letterWidth);

          diagonal(
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
          left(x, width, height, canvasTop + y, wordHeight / 2 + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          middleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          bottomH(x, width, height, wordHeight + y, letterWidth);
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
          topH(x, width, height, canvasTop + y, letterWidth);
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
          bottomH(x, width, height, wordHeight + y, letterWidth);
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
          diagonal(
            x + letterWidth / 2,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2
          );
          diagonal(
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
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "X":
          diagonal(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight + y,
            letterWidth
          );
          diagonal(
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
          diagonal(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight / 2 + y + width,
            letterWidth
          );
          diagonal(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight / 2 + y + width,
            letterWidth
          );
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
        case "Z":
          topH(x, width, height, canvasTop + y, letterWidth);
          diagonal(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight + y + width,
            letterWidth
          );
          middleH(x, width, height, wordHeight + y, letterWidth);
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
          topH(x, width, height, canvasTop + y, letterWidth);
          middleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
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
          topH(x, width, height, canvasTop + y, letterWidth);
          middleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "C":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
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
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "E":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          middleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "F":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          middleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          break;
        case "G":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          halfMiddleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
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
            letterWidth
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
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "J":
          topH(x, width, height, canvasTop + y, letterWidth);
          right(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth,
            gap
          );
          bottomH(x, width, height, wordHeight + y, letterWidth);
          left(x, width, height, wordHeight / 2 + y, wordHeight + y, gap);
          break;
        case "K":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          diagonal(
            x,
            height,
            width,
            true,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth
          );
          diagonal(
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
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          bottomH(x, width, height, wordHeight + y, letterWidth);
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
          topH(x, width, height, canvasTop + y, letterWidth);
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
            letterWidth
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
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          diagonal(
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
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          right(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth
          );
          middleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
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
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
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
        case "R":
          left(x, width, height, canvasTop + y, wordHeight + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          middleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
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
            letterWidth
          );
          break;
        case "S":
          left(x, width, height, canvasTop + y, wordHeight / 2 + y, gap);
          topH(x, width, height, canvasTop + y, letterWidth);
          middleH(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            letterWidth
          );
          bottomH(x, width, height, wordHeight + y, letterWidth);
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
          topH(x, width, height, canvasTop + y, letterWidth);
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
          bottomH(x, width, height, wordHeight + y, letterWidth);
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
          diagonal(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight + y,
            letterWidth
          );
          diagonal(
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
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "X":
          diagonal(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight + y,
            letterWidth
          );
          diagonal(
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
          diagonal(
            x,
            height,
            width,
            true,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth / 2
          );
          diagonal(
            x + letterWidth / 2 - 10,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth
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
          topH(x, width, height, canvasTop + y, letterWidth);
          diagonal(
            x,
            height,
            width,
            false,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth
          );
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
      }
    }
  }
}
