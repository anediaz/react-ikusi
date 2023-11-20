import * as React from 'react';

import _ from 'underscore';
import {Loader} from '../Loader/Loader';
import {Ligthbox} from '../Lightbox/Lightbox';
import {
  defaultConfigurations, DEFAULT_COLS, DEFAULT_MARGIN, getChunks,
} from './utils';

import './gallery.css';
import classnames from 'classnames';
import { Picture } from './Picture';

type NonEmptyArray<T> = [T, ...T[]];

interface Configuration {
  maxWidth?:number;
  minWidth?:number;
  cols:number;
  margin:number;
}

export interface GalleryConfiguration extends Configuration {
  width: number;
}

export type NonEmptyPhotos = NonEmptyArray<PhotoProps>;
export type NonEmptyConfigurations = NonEmptyArray<Configuration>;

export interface PhotoProps {
  src: string;
  bigSrc?: string;
  height: number;
  width: number;
  id: string;
}

export interface GalleryProps {
  configurations?: NonEmptyConfigurations;
  withLightbox?:boolean;
  photos: NonEmptyPhotos;
  onClickPhoto?: (id:string) => void
}

/**
 * Get the Configuration that better matches with the given width for the Gallery display
 * @param configurations An array of available Configurations
 * @param width The width where Gallery will be rendered
 * @returns A Configuration
 */
const getConfigurationForAGivenWidth = (configurations:Configuration[], width:number):GalleryConfiguration => {
  const propsConfiguration = configurations.find(
    ({ minWidth, maxWidth }) => ((minWidth && minWidth <= width) || !minWidth)
      && ((maxWidth && maxWidth >= width) || !maxWidth),
  );
  if (!propsConfiguration){
    return {width,...configurations[0]};
  }
  return {
    width,
    cols: propsConfiguration.cols || DEFAULT_COLS,
    margin: propsConfiguration.margin || DEFAULT_MARGIN,
  };
};

const MAIN_CLASS = 'gallery'
export const Gallery = ({
  photos, configurations = defaultConfigurations, withLightbox = true, onClickPhoto = () => {},
}:GalleryProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedImgIndex, setSelectedImgIndex] = React.useState<number | null>(null);
  const [configuration, setConfiguration] = React.useState<GalleryConfiguration>(
    getConfigurationForAGivenWidth(configurations, window.screen.width),
  );
  const imagesRefs = React.useRef<(HTMLImageElement | null)[]>([])


  // checks when all the images have been rendered to set isLoading state to false
  React.useEffect(() => {
    const notCompleted = imagesRefs.current.filter((ref) => !ref || !ref.complete);
    if (!notCompleted.length) {
      setIsLoading(false);
    }
  }, [imagesRefs]);

  // listens to dimensions of the component within Gallery is rendered
  // and resizes if needed, using the most appropriate configuration
  React.useEffect(() => {
    const getGalleryRenderWidth = () => wrapperRef.current?.offsetWidth || 0;
    const handleResize = _.debounce(
      () => setConfiguration(getConfigurationForAGivenWidth(configurations, getGalleryRenderWidth())),
      400,
    );
    window.addEventListener('resize', handleResize);
    setConfiguration(getConfigurationForAGivenWidth(configurations, getGalleryRenderWidth()));
    return () => window.removeEventListener('resize', handleResize);
  }, [configurations]);

  const closeLightbox = () => setSelectedImgIndex(null);
  const isFirst = () => selectedImgIndex === 0;
  const isLast = () => selectedImgIndex === photos.length - 1;
  const selectNext = () => (selectedImgIndex !== null && !isLast() ? setSelectedImgIndex(selectedImgIndex + 1) : null);
  const selectPrev = () => (selectedImgIndex !== null && !isFirst() ? setSelectedImgIndex(selectedImgIndex - 1) : null);
  const getLightboxImage = (index:number) => {
    if(index !== null && photos.length >= index){
      return photos[index];
    }
    return null
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!Number.isNaN(selectedImgIndex)) {
      switch (e.key) {
        case "ArrowLeft": // left
          selectPrev();
          break;
        case "ArrowRight": // right
          selectNext();
          break;
        case "Escape": // ESC
          closeLightbox();
          break;
        default:
      }
    }
  };

  const handleOnImageClick = (index:number, photoId:string) => {
    if (withLightbox) {
      setSelectedImgIndex(index);
    }
    onClickPhoto(photoId);
  };

  const displayLightBox = () => {
    if (withLightbox && selectedImgIndex !== null) {
      const imageToDisplay = getLightboxImage(selectedImgIndex);
      if(!imageToDisplay) {
        return null;
      }
      return (
        <Ligthbox
          img={imageToDisplay.bigSrc || imageToDisplay.src}
          id={imageToDisplay.id}
          onClose={closeLightbox}
          onNext={!isLast() ? selectNext : undefined}
          onPrev={!isFirst() ? selectPrev : undefined}
        />
      );
    }
    return null;
  };

  const chunks = getChunks(configuration, photos);
  return (
    <div ref={wrapperRef} onKeyDown={onKeyDown} tabIndex={0} className={MAIN_CLASS}>
      {isLoading ? <Loader/> : null}
      {photos.length ? (
        <>
          {chunks.map((chunk, chunkIndex) => (chunk.lineHeight && (
            <div
              style = {{height:`${chunk.lineHeight}px`, margin: `${configuration.margin}px 0`}}
              key={`line-${chunkIndex}`}
              className={`${MAIN_CLASS}_line-container`}
            >
              {chunk.photos.map((photo, imgIndex) => {
                const index = chunkIndex * configuration.cols + imgIndex;
                return (
                  <Picture
                    key={`item-${photo.id}`}
                    src={photo.src}
                    id={photo.id}
                    onClick={() => handleOnImageClick(index, photo.id)}
                    isClickable={withLightbox}
                  />
                );
              })}
            </div>
          )))}
          {displayLightBox()}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};