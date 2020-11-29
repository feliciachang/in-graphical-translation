function topH(x, width, height, y, letterWidth) {
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

function middleH(x, width, height, y, letterWidth) {
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

function left(x, width, height, start, end) {
  for (let i = start; i < end; i = i + height) {
    image(longLine, x, i, width, (longLine.height * width) / longLine.width);
  }
}

function middle(x, width, height, start, end, letterWidth) {
  for (let i = start; i < end; i = i + height) {
    image(
      longLine,
      x + letterWidth,
      i,
      width,
      (longLine.height * width) / longLine.width
    );
  }
}

function diagonal(x, width, leftToRight, start, end, letterWidth) {
  if (leftToRight) {
    for (let i = start; i < end; i = i + width) {
      image(longLine, x, i, width, (longLine.height * width) / longLine.width);
      x += width;
    }
  } else {
    for (let i = start; i < end; i = i + width) {
      image(
        longLine,
        x + letterWidth,
        i,
        width,
        (longLine.height * width) / longLine.width
      );
      x -= width;
    }
  }
}

function right(x, width, height, start, end, letterWidth) {
  for (let i = start; i < end; i = i + height) {
    image(
      longLine,
      x + letterWidth,
      i,
      width,
      (longLine.height * width) / longLine.width
    );
  }
}

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

function createWord(text, width, len, wordHeight, wordWidth, useCircle) {
  //x = position of the left most side of letter
  //width = width of image
  //height = height of image that creates the word
  //canvasTop = top of letter
  //canvasHeight = bottom of letter, can be replaced with something else
  console.log("useCircle", useCircle);
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
      let x = Math.floor((letterWidth + 20) * counter);
      // if (x + letterWidth > canvasWidth) {
      //   lineHeight++;
      // }
      let y = (wordHeight + 20) * lineHeight;
      counter++;
      switch (text[i]) {
        case "A":
          circ(x, width, height, canvasTop + y - letterWidth, letterWidth);
          left(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            wordHeight + y
          );
          right(
            x,
            width,
            height,
            (wordHeight - canvasTop) / 2 + y,
            wordHeight + y,
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
        case "B":
          circ(x, width / 2, height, canvasTop + y - letterWidth, letterWidth);
          circ(x, width / 2, height, wordHeight + y - letterWidth, letterWidth);
          left(x, width, height, canvasTop + y - letterWidth, wordHeight + y);
          break;
        case "C":
          left(x, width, height, canvasTop + y, wordHeight + y);
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "D":
          left(x, width, height, canvasTop + y, wordHeight + y);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "E":
          left(x, width, height, canvasTop + y, wordHeight + y);
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
          left(x, width, height, canvasTop + y, wordHeight + y);
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
          left(x, width, height, canvasTop + y, wordHeight + y);
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
            letterWidth
          );
          break;
        case "H":
          left(x, width, height, canvasTop + y, wordHeight + y);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
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
            letterWidth / 2
          );
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "J":
          topH(x, width, height, canvasTop + y, letterWidth);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          left(x, width, height, wordHeight / 2 + y, wordHeight + y);
          break;
        case "K":
          left(x, width, height, canvasTop + y, wordHeight + y);
          diagonal(
            x,
            width,
            true,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth
          );
          diagonal(
            x,
            width,
            true,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth
          );
          break;
        case "L":
          left(x, width, height, canvasTop + y, wordHeight + y);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "M":
          left(x, width, height, canvasTop + y, wordHeight + y);
          middle(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2
          );
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          topH(x, width, height, canvasTop + y, letterWidth);
          break;
        case "N":
          left(x, width, height, canvasTop + y, wordHeight + y);
          diagonal(x, width, true, canvasTop + y, wordHeight + y, letterWidth);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          break;
        case "O":
          circ(x, width, height, canvasTop + y, letterWidth);
          break;
        case "P":
          left(x, width, height, canvasTop + y, wordHeight + y);
          circ(x, width, height, canvasTop + y, letterWidth);
          break;
        case "Q":
          break;
        case "R":
          left(x, width, height, canvasTop + y, wordHeight + y);
          circ(x, width, height, canvasTop + y, letterWidth);

          diagonal(
            x,
            width,
            true,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth
          );
          break;
        case "S":
          left(x, width, height, canvasTop + y, wordHeight / 2 + y);
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
            letterWidth
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
            letterWidth / 2
          );
          break;
        case "U":
          left(x, width, height, canvasTop + y, wordHeight + y);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          break;
        case "V":
          diagonal(x, width, true, canvasTop + y, wordHeight + y, letterWidth);
          diagonal(x, width, false, canvasTop + y, wordHeight + y, letterWidth);
          break;
        case "W":
          left(x, width, height, canvasTop + y, wordHeight + y);
          middle(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2
          );
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "X":
          diagonal(x, width, true, canvasTop + y, wordHeight + y, letterWidth);
          diagonal(x, width, false, canvasTop + y, wordHeight + y, letterWidth);
          break;
        case "Y":
          diagonal(
            x,
            width,
            true,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth
          );
          diagonal(
            x,
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
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2
          );
          break;
        case "Z":
          topH(x, width, height, canvasTop + y, letterWidth);
          diagonal(
            x,
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
  } else {
    for (let i = 0; i < text.length; i++) {
      if (text[i] == "/") {
        lineHeight++;
        counter = 0;
        continue;
      }
      let x = Math.floor((letterWidth + 20) * counter);
      // if (x + letterWidth > canvasWidth) {
      //   lineHeight++;
      // }
      let y = (wordHeight + 20) * lineHeight;
      counter++;
      switch (text[i]) {
        case "A":
          left(x, width, height, canvasTop + y, wordHeight + y);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
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
          left(x, width, height, canvasTop + y, wordHeight + y);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
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
          left(x, width, height, canvasTop + y, wordHeight + y);
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "D":
          left(x, width, height, canvasTop + y, wordHeight + y);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "E":
          left(x, width, height, canvasTop + y, wordHeight + y);
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
          left(x, width, height, canvasTop + y, wordHeight + y);
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
          left(x, width, height, canvasTop + y, wordHeight + y);
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
            letterWidth
          );
          break;
        case "H":
          left(x, width, height, canvasTop + y, wordHeight + y);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
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
            letterWidth / 2
          );
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "J":
          topH(x, width, height, canvasTop + y, letterWidth);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          left(x, width, height, wordHeight / 2 + y, wordHeight + y);
          break;
        case "K":
          left(x, width, height, canvasTop + y, wordHeight + y);
          diagonal(
            x,
            width,
            true,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth
          );
          diagonal(
            x,
            width,
            true,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth
          );
          break;
        case "L":
          left(x, width, height, canvasTop + y, wordHeight + y);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "M":
          left(x, width, height, canvasTop + y, wordHeight + y);
          middle(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2
          );
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          topH(x, width, height, canvasTop + y, letterWidth);
          break;
        case "N":
          left(x, width, height, canvasTop + y, wordHeight + y);
          diagonal(x, width, true, canvasTop + y, wordHeight + y, letterWidth);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          break;
        case "O":
          left(x, width, height, canvasTop + y, wordHeight + y);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          topH(x, width, height, canvasTop + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          diagonal(x, width, false, canvasTop + y, wordHeight + y, letterWidth);
          break;
        case "P":
          left(x, width, height, canvasTop + y, wordHeight + y);
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
          break;
        case "R":
          left(x, width, height, canvasTop + y, wordHeight + y);
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
            letterWidth
          );
          diagonal(
            x,
            width,
            true,
            wordHeight / 2 + y,
            wordHeight + y,
            letterWidth
          );
          break;
        case "S":
          left(x, width, height, canvasTop + y, wordHeight / 2 + y);
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
            letterWidth
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
            letterWidth / 2
          );
          break;
        case "U":
          left(x, width, height, canvasTop + y, wordHeight + y);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          break;
        case "V":
          diagonal(x, width, true, canvasTop + y, wordHeight + y, letterWidth);
          diagonal(x, width, false, canvasTop + y, wordHeight + y, letterWidth);
          break;
        case "W":
          left(x, width, height, canvasTop + y, wordHeight + y);
          middle(
            x,
            width,
            height,
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2
          );
          right(x, width, height, canvasTop + y, wordHeight + y, letterWidth);
          bottomH(x, width, height, wordHeight + y, letterWidth);
          break;
        case "X":
          diagonal(x, width, true, canvasTop + y, wordHeight + y, letterWidth);
          diagonal(x, width, false, canvasTop + y, wordHeight + y, letterWidth);
          break;
        case "Y":
          diagonal(
            x,
            width,
            true,
            canvasTop + y,
            wordHeight / 2 + y,
            letterWidth
          );
          diagonal(
            x,
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
            canvasTop + y,
            wordHeight + y,
            letterWidth / 2
          );
          break;
        case "Z":
          topH(x, width, height, canvasTop + y, letterWidth);
          diagonal(
            x,
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

// export default createWord;
