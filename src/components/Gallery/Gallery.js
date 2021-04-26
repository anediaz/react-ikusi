/* eslint-disable react/no-array-index-key */
import React, {
  useState, useEffect, useRef,
} from 'react';
import _ from 'underscore';
import styled from 'styled-components';
import GalleryPropTypes from './GalleryPropTypes';
import Loader from '../Loader/Loader';
import Ligthbox from '../Lightbox/Lightbox';
import {
  defaultConfigurations, DEFAULT_COLS, DEFAULT_MARGIN, getChunks,
} from './utils';

const Wrapper = styled.div`
  margin-top: 0.2rem;
  width: 100%;
  outline: none;
`;

const LineContainer = styled.div`
  width: 100%;
  margin: ${(props) => `${props.margin}px 0`};
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  height: ${(props) => `${props.height}px`};
`;

const Item = styled.img`
  height: 100%;
  width: auto;
  display: ${(props) => (props.loading ? 'none' : 'flex')};
  &:hover {
    cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
    opacity: ${(props) => (props.clickable ? '0.5' : '1')};
  }
`;

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

const Gallery = ({
  photos, configurations = defaultConfigurations, withLightbox = true, onClickPhoto = () => {},
}) => {
  const wrapperRef = useRef(null);
  const [selectedImgId, setSelectedImgId] = useState(null);
  const [configuration, setConfiguration] = useState(
    getChosenConfiguration(configurations, window.screen.width),
  );
  const [countLoaded, setCountLoaded] = useState(0);

  const getWidth = () => wrapperRef.current.offsetWidth || 0;
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
  const displayLightbox = (index) => (index !== null && photos.length >= index && photos[index]
    ? photos[index].bigSrc || photos[index].src
    : null);

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

  const isLoading = () => countLoaded < photos.length;
  const handleOnImageLoad = () => {
    setCountLoaded(countLoaded + 1);
  };

  const chunks = getChunks(configuration, photos);
  return (
    <Wrapper ref={wrapperRef} onKeyDown={onKeyDown} tabIndex="0">
      {isLoading() && photos.length && <Loader />}
      {photos.length ? (
        <>
          {chunks.map((chunk, chunkIndex) => (chunk.lineHeight && (
            <LineContainer
              height={chunk.lineHeight}
              margin={configuration.margin}
              key={`line-${chunkIndex}`}
            >
              {chunk.photos.map((photo, imgIndex) => {
                const index = chunkIndex * configuration.cols + imgIndex;
                return (
                  <Item
                    src={photo.src}
                    alt={`picture with id ${photo.id}`}
                    key={`item-${photo.id}`}
                    onClick={() => handleOnImageClick(index, photo.id)}
                    clickable={withLightbox}
                    onLoad={() => handleOnImageLoad()}
                    loading={isLoading()}
                  />
                );
              })}
            </LineContainer>
          )))}
          {withLightbox && selectedImgId !== null && (
            <Ligthbox
              img={displayLightbox(selectedImgId)}
              onClose={closeLightbox}
              onNext={!isLast() ? next : null}
              onPrev={!isFirst() ? prev : null}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};

Gallery.propTypes = GalleryPropTypes;
export default Gallery;
