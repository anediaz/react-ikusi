import { GalleryConfiguration, NonEmptyConfigurations, PhotoProps } from "./Gallery";

const defaultConfigurations: NonEmptyConfigurations = [
  { maxWidth: 340, cols: 4, margin: 1 },
  { maxWidth: 1024, cols: 6, margin: 1 },
  { minWidth: 1025, cols: 12, margin: 1 },
];
const DEFAULT_COLS = 7;
const DEFAULT_MARGIN = 1;


/**
 * Calculates the line height to apply to all photos, for the given Configuration, to render it in a masonry layout
 * @param configuration Configuration that defines Gallery display details
 * @param photosToLineHeight Photos to take into account in the line height calculation
 * @returns The line height all the given photos should have
 */
const getLineHeight = (configuration:GalleryConfiguration, photosToLineHeight:PhotoProps[]):number => {
  const { width: screenWidth, cols, margin } = configuration;
  let ratioSum = 0;
  photosToLineHeight.forEach((p) => {
    ratioSum += p.width / p.height;
  });
  const marginTotalWidth = cols * margin * 2;
  // '-1' because screenWith rounds size to up
  // marginTotalWidth = width to remove to size where images will be placed
  return (screenWidth - 1 - marginTotalWidth) / ratioSum;
};

export interface ChunkProps{
  photos: PhotoProps[],
  lineHeight:number
}

/**
 * Splits the list of photos into chunks, containing the same line height
 * @param configuration The chosen Gallery Configuration
 * @param photosToChunk The list of photos to display
 * @returns A list of chunks, each containing the amount of photos defined by 'cols', and the lineHeight for the line rendering
 */
const getChunks = (configuration:GalleryConfiguration, photosToChunk:PhotoProps[]):ChunkProps[] => {
  const newPhotos = [...photosToChunk];
  const chunks = [];
  while (newPhotos.length) {
    const chunkPhotos = newPhotos.splice(0, configuration.cols);
    chunks.push({
      photos: chunkPhotos,
      lineHeight: getLineHeight(configuration, chunkPhotos),
    });
  }
  return chunks;
};

export {
  defaultConfigurations, DEFAULT_COLS, DEFAULT_MARGIN, getChunks,
};
