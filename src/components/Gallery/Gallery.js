/* eslint-disable react/no-array-index-key */
import React, {
  useState, useEffect, useRef,
} from 'react';
import _ from 'underscore';
import GalleryPropTypes from './GalleryPropTypes';
import Loader from '../Loader/Loader';
import Ligthbox from '../Lightbox/Lightbox';
import {
  defaultConfigurations, DEFAULT_COLS, DEFAULT_MARGIN, getChunks,
} from './utils';

import './gallery.css';
import classnames from 'classnames';

const getChosenConfiguration = (configurations, width) => {
  const propsConfiguration = configurations.find(
    ({ minWidth, maxWidth }) => ((minWidth && minWidth <= width) || !minWidth)
      && ((maxWidth && maxWidth >= width) || !maxWidth),
  );
  return {
    width,
    cols: propsConfiguration.cols || DEFAULT_COLS,
    margin: propsConfiguration.margin || DEFAULT_MARGIN,
  };
};

const MAIN_CLASS = 'gallery'
const Gallery = ({
  photos, configurations = defaultConfigurations, withLightbox = true, onClickPhoto = () => {},
}) => {
  const wrapperRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImgId, setSelectedImgId] = useState(null);
  const [configuration, setConfiguration] = useState(
    getChosenConfiguration(configurations, window.screen.width),
  );
  const imagesRefs = photos.map(() => React.useRef());

  const getWidth = () => wrapperRef.current.offsetWidth || 0;
  useEffect(() => {
    const notCompleted = imagesRefs.filter((ref) => !ref.current || !ref.current.complete);
    if (!notCompleted.length) {
      setIsLoading(false);
    }
  }, [imagesRefs]);
  useEffect(() => {
    const handleResize = _.debounce(
      () => setConfiguration(getChosenConfiguration(configurations, getWidth())),
      400,
    );
    window.addEventListener('resize', handleResize);
    setConfiguration(getChosenConfiguration(configurations, getWidth()));
    return () => window.removeEventListener('resize', handleResize);
  }, [configurations]);

  const closeLightbox = () => setSelectedImgId(null);
  const isFirst = () => selectedImgId === 0;
  const isLast = () => selectedImgId === photos.length - 1;
  const next = () => (!isLast() ? setSelectedImgId(selectedImgId + 1) : null);
  const prev = () => (!isFirst() ? setSelectedImgId(selectedImgId - 1) : null);
  const lightboxImage = (index) => (index !== null && photos.length >= index && photos[index]);

  const onKeyDown = (e) => {
    if (!Number.isNaN(selectedImgId)) {
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

  const handleOnImageClick = (index, photoId) => {
    if (withLightbox) {
      setSelectedImgId(index);
    }
    onClickPhoto(photoId);
  };

  const displayLightBox = () => {
    if (withLightbox && selectedImgId !== null) {
      const imageToDisplay = lightboxImage(selectedImgId);
      return (
        <Ligthbox
          img={imageToDisplay.bigSrc || imageToDisplay.src}
          id={imageToDisplay.id}
          onClose={closeLightbox}
          onNext={!isLast() ? next : null}
          onPrev={!isFirst() ? prev : null}
        />
      );
    }
    return null;
  };

  const chunks = getChunks(configuration, photos);
  return (
    <div ref={wrapperRef} onKeyDown={onKeyDown} tabIndex="0" className={MAIN_CLASS}>
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
                    ref={imagesRefs[index]}
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

Gallery.propTypes = GalleryPropTypes;
export default Gallery;
