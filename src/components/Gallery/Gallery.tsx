import * as React from 'react';

import _ from 'underscore';
import {Loader} from '../Loader/Loader';
import {Ligthbox} from '../Lightbox/Lightbox';
import {
  defaultConfigurations, DEFAULT_COLS, DEFAULT_MARGIN, getChunks,
} from './utils';

import './gallery.css';
import classnames from 'classnames';

export type NonEmptyArray<T> = [T, ...T[]];

export interface Configuration {
  maxWidth?:number;
  minWidth?:number;
  cols:number;
  margin:number;
}

export interface GalleryConfiguration extends Configuration {
  width: number;
}

export interface PhotoProps {
  src: string;
  bigSrc?: string;
  height: number;
  width: number;
  id: string;
}

export interface GalleryProps {
  configurations?: NonEmptyArray<Configuration>;
  withLightbox?:boolean;
  photos: NonEmptyArray<PhotoProps>;
  onClickPhoto?: (id:string) => void
}

const getChosenConfiguration = (configurations:Configuration[], width:number):GalleryConfiguration => {
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
    getChosenConfiguration(configurations, window.screen.width),
  );
  const imagesRefs = React.useRef<(HTMLImageElement | null)[]>([])


  const getWidth = () => wrapperRef.current?.offsetWidth || 0;
  React.useEffect(() => {
    const notCompleted = imagesRefs.current.filter((ref) => !ref || !ref.complete);
    if (!notCompleted.length) {
      setIsLoading(false);
    }
  }, [imagesRefs]);
  React.useEffect(() => {
    const handleResize = _.debounce(
      () => setConfiguration(getChosenConfiguration(configurations, getWidth())),
      400,
    );
    window.addEventListener('resize', handleResize);
    setConfiguration(getChosenConfiguration(configurations, getWidth()));
    return () => window.removeEventListener('resize', handleResize);
  }, [configurations]);

  const closeLightbox = () => setSelectedImgIndex(null);
  const isFirst = () => selectedImgIndex === 0;
  const isLast = () => selectedImgIndex === photos.length - 1;
  const next = () => (selectedImgIndex !== null && !isLast() ? setSelectedImgIndex(selectedImgIndex + 1) : null);
  const prev = () => (selectedImgIndex !== null && !isFirst() ? setSelectedImgIndex(selectedImgIndex - 1) : null);
  const getLightboxImage = (index:number) => {
    if(index !== null && photos.length >= index){
      return photos[index];
    }
    return null
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!Number.isNaN(selectedImgIndex)) {
      switch (e.keyCode) {
        case 37: // left
          prev();
          break;
        case 39: // right
          next();
          break;
        case 27: // ESC
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
          onNext={!isLast() ? next : undefined}
          onPrev={!isFirst() ? prev : undefined}
        />
      );
    }
    return null;
  };

  const chunks = getChunks(configuration, photos);
  return (
    <div ref={wrapperRef} onKeyDown={onKeyDown} tabIndex={0} className={MAIN_CLASS}>
      {isLoading && <Loader />}
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
                const itemClassName = `${MAIN_CLASS}_line-container_item`
                return (
                  <img
                    src={photo.src}
                    alt={`picture with id ${photo.id}`}
                    key={`item-${photo.id}`}
                    onClick={() => handleOnImageClick(index, photo.id)}
                    ref={element => imagesRefs.current[index] = element}
                    className={classnames(itemClassName, {[`${itemClassName}--is-clickable`]: withLightbox })}
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