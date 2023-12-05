import { GalleryConfigurationProps, ConfigurationProps, PhotoProps } from "./Gallery";
declare const defaultConfigurations: ConfigurationProps[];
declare const DEFAULT_COLS = 7;
declare const DEFAULT_MARGIN = 1;
export interface ChunkProps {
    photos: PhotoProps[];
    lineHeight: number;
}
/**
 * Splits the list of photos into chunks, containing the same line height
 * @param configuration The chosen Gallery Configuration
 * @param photosToChunk The list of photos to display
 * @returns A list of chunks, each containing the amount of photos defined by 'cols', and the lineHeight for the line rendering
 */
declare const getChunks: (configuration: GalleryConfigurationProps, photosToChunk: PhotoProps[]) => ChunkProps[];
export { defaultConfigurations, DEFAULT_COLS, DEFAULT_MARGIN, getChunks, };
