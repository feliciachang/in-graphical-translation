function circ2(x, width, height, y, letterWidth) {
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
function createBigCircles(
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
        circ2(x, width, height, canvasTop + y, letterWidth);
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
        circ2(x, width, height, canvasTop + y, letterWidth);
        //circ(x, width / 2, height, canvasTop + y - letterWidth, letterWidth);
        circ2(x, width, height, wordHeight + y - letterWidth + 25, letterWidth);
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
        circ2(x, width, height, canvasTop + y, letterWidth);
        break;
      case "P":
        left(x, width, height, canvasTop + y, wordHeight + y, gap);
        circ2(x, width, height, canvasTop + y, letterWidth);
        break;
      case "Q":
        circ2(x, width, height, canvasTop + y, letterWidth);
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
        circ2(x, width, height, canvasTop + y, letterWidth);

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
        diagonalToCenter(
          x,
          height,
          width,
          true,
          canvasTop + y,
          wordHeight / 2 + y,
          letterWidth
        );
        diagonalToCenter(
          x,
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
          wordHeight + y + width,
          letterWidth
        );
        middleH(x, width, height, wordHeight + y, letterWidth);
        break;
    }
  }
}
