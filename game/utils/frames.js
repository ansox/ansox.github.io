export default class Frames {
  static mountFrames(width, height, cols, maxFrames) {
    const result = [];

    for (let i = 0; i < maxFrames; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);


      result.push({
        x: width * (1 * col),
        y: height * (1 * row),
      })
    }

    return result;
  }
}