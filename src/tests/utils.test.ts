import { PhotoProps } from '../components/Gallery/Gallery';
import { ChunkProps, getChunks } from '../components/Gallery/utils';

let screenWidth = 2700;
let cols = 4;
const margin = 1;
const photos:PhotoProps[] = [
  { width: 200, height: 400, id:'001', src:'/url-to-img' },
  { width: 400, height: 200, id:'002', src:'/url-to-img' },
  { width: 200, height: 400, id:'003', src:'/url-to-img' },
  { width: 100, height: 400, id:'004', src:'/url-to-img' },
  { width: 50, height: 400, id:'005', src:'/url-to-img' },
  { width: 400, height: 100, id:'006', src:'/url-to-img' },
];

const getWidth = (photo: PhotoProps, lineHeight:number) => (lineHeight * photo.width) / photo.height;

const photosWidthSum = ({ photos: chunkPhotos, lineHeight }:ChunkProps) => {
  let widthSum = margin;
  chunkPhotos.forEach((p) => {
    widthSum += getWidth(p, lineHeight) + margin;
  });
  return widthSum;
};

const verifyLineHeight = (chunk:ChunkProps, widthToCheck:number) => {
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
  expect(chunks[0].photos).toHaveLength(cols);
  expect(verifyLineHeight(chunks[1], screenWidth)).toBeTruthy();
  expect(chunks[1].photos).toHaveLength(2);
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
