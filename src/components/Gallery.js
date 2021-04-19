import React, {
  Fragment, useState, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import styled from 'styled-components';
import Loader from '../utils/Loader';
import Ligthbox from './Lightbox';

const defaultConfigurations = [
  { maxWidth: 340, cols: 4, margin: 1 },
  { maxWidth: 1024, cols: 6, margin: 1 },
  { minWidth: 1025, cols: 12, margin: 1 },
];

const propTypes = {
  configurations: PropTypes.arrayOf(
    PropTypes.shape({
      cols: PropTypes.number.isRequired,
      margin: PropTypes.number.isRequired,
      maxWidth: PropTypes.number,
      minWidth: PropTypes.number,
    }),
  ),
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      bigSrc: PropTypes.string,
    }),
  ).isRequired,
  withLightbox: PropTypes.bool,
  onClickPhoto: PropTypes.func,
};

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
  &:hover {
    cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
    opacity: 0.5;
  }
`;

const DEFAULT_COLS = 7;
const DEFAULT_MARGIN = 1;

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
  const ref = useRef(null);
  const [selectedImgId, setSelectedImgId] = useState(null);
  const [configuration, setConfiguration] = useState(
    getChosenConfiguration(configurations, window.screen.width),
  );

  const getWidth = () => ref.current.offsetWidth || 0;
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

  const getLineHeight = (photosToLineHeight) => {
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

  const getChunks = (photosToChunk) => {
    const newPhotos = [...photosToChunk];
    const chunks = [];
    while (newPhotos.length) {
      const chunkPhotos = newPhotos.splice(0, configuration.cols);
      chunks.push({
        photos: chunkPhotos,
        lineHeight: getLineHeight(chunkPhotos),
      });
    }
    return chunks;
  };

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

  const handleOnClick = (index, photoId) => {
    if (withLightbox) {
      setSelectedImgId(index);
    }
    onClickPhoto(photoId);
  };

  const chunks = getChunks(photos);
  return (
    <Wrapper ref={ref} onKeyDown={onKeyDown} tabIndex="0">
      {photos.length ? (
        <>
          {chunks.map((chunk, chunkIndex) => (chunk.lineHeight ? (
            <LineContainer
              height={chunk.lineHeight}
              margin={configuration.margin}
              key={`line-${chunk.lineHeight}`}
            >
              {chunk.photos.map((photo, imgIndex) => {
                const index = chunkIndex * configuration.cols + imgIndex;
                return (
                  <Item
                    src={photo.src}
                    alt=""
                    key={`item-${photo.id}`}
                    onClick={() => handleOnClick(index, photo.id)}
                  />
                );
              })}
            </LineContainer>
          ) : (
            <Loader />
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

Gallery.propTypes = propTypes;
export default Gallery;
