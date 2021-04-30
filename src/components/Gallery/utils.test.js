import { getChunks } from './utils';

let screenWidth = 2700;
let cols = 4;
const margin = 1;
const photos = [
  { width: 200, height: 400 },
  { width: 400, height: 200 },
  { width: 200, height: 400 },
  { width: 100, height: 400 },
  { width: 50, height: 400 },
  { width: 400, height: 100 },
];

const getWidth = (photo, lineHeight) => (lineHeight * photo.width) / photo.height;

const photosWidthSum = ({ photos: chunkPhotos, lineHeight }) => {
  let widthSum = margin;
  chunkPhotos.forEach((p) => {
    widthSum += getWidth(p, lineHeight) + margin;
  });
  return widthSum;
};

const verifyLineHeight = (chunk, widthToCheck) => {
  // Get the sum of a line's photos widths after applying the LineHeight
  const lineWidthSum = photosWidthSum(chunk);
  // Verify if the sum fits in the screen width
  return lineWidthSum >= widthToCheck - 10 && lineWidthSum <= widthToCheck;
};

test('For a given configuration, the callculated line height must be appropriate', () => {
  // Arrange

  // Act
  const chunks = getChunks({ width: screenWidth, cols, margin }, photos);
  // Expect
  expect(chunks).toHaveLength(2);
  expect(verifyLineHeight(chunks[0], screenWidth)).toBeTruthy();
  expect(verifyLineHeight(chunks[1], screenWidth)).toBeTruthy();
});
test('For another configuration, the callculated line height must be appropriate', () => {
  // Arrange
  screenWidth = 6000;
  cols = 6;
  const fewPhotos = [photos[0], photos[4]];

  // Act
  const chunks = getChunks({ width: screenWidth, cols, margin }, fewPhotos);
  // Expect
  expect(chunks).toHaveLength(1);
  expect(verifyLineHeight(chunks[0], screenWidth)).toBeTruthy();
});
