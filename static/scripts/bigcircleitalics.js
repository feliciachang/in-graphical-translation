function createBigCircleItalics(
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
        circI(x, width, height, canvasTop + y, letterWidth);
        //circ(x, width, height, canvasTop + y - letterWidth, letterWidth);
        leftI(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
          wordHeight + y,
          gap
        );
        rightI(
          x,
          width,
          height,
          (wordHeight - canvasTop) / 2 + y,
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
      case "B":
        circI(x, width, height, canvasTop + y, letterWidth);
        //circ(x, width / 2, height, canvasTop + y - letterWidth, letterWidth);
        circI(x, width, height, wordHeight + y - letterWidth + 25, letterWidth);
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
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
          wordHeight + y + width,
          letterWidth
        );
        diagonalI(
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
        //diagonal(x, width, true, canvasTop + y, wordHeight + y, letterWidth);
        diagonalI(
          x,
          height,
          width,
          true,
          canvasTop + y,
          wordHeight / 2 + y + width,
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
        circI(x, width, height, canvasTop + y, letterWidth);
        break;
      case "P":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        circI(x, width, height, canvasTop + y, letterWidth);
        break;
      case "Q":
        circI(x, width, height, canvasTop + y, letterWidth);
        bottomHI(
          x + letterWidth / 2,
          width,
          height,
          wordHeight + y,
          letterWidth
        );
        break;
      case "R":
        leftI(x, width, height, canvasTop + y, wordHeight + y, gap);
        circI(x, width, height, canvasTop + y, letterWidth);

        diagonalI(
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
        leftI(x, width, height, canvasTop + y, wordHeight / 2 + y, gap);
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
          x + letterWidth / 2,
          height,
          width,
          false,
          canvasTop + y,
          wordHeight + y,
          letterWidth / 2
        );
        diagonalI(
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
          false,
          canvasTop + y,
          wordHeight + y,
          letterWidth
        );
        diagonalI(
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
        diagonalI(
          x,
          height,
          width,
          true,
          canvasTop + y,
          wordHeight / 2 + y + width,
          letterWidth
        );
        diagonalI(
          x,
          height,
          width,
          false,
          canvasTop + y,
          wordHeight / 2 + y + width,
          letterWidth
        );
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
      case "Z":
        topHI(x, width, height, canvasTop + y, letterWidth);
        diagonalI(
          x,
          height,
          width,
          false,
          canvasTop + y,
          wordHeight + y + width,
          letterWidth
        );
        middleHI(x, width, height, wordHeight + y, letterWidth);
        break;
    }
  }
}
