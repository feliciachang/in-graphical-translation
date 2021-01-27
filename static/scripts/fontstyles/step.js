function right(x, width, height, start, end, letterWidth) {
  let step = width;
  for (let i = start; i < end; i = i + height - 15) {
    image(
      longLine,
      x + letterWidth + step,
      i,
      width,
      (longLine.height * width) / longLine.width
    );
    if (step > 0) {
      step = 0;
    } else {
      step = width;
    }
  }
}
