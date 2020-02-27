import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import styled from "styled-components";
import Loader from "../utils/Loader";
import Ligthbox from "./Lightbox";

const propTypes = {
  configurations: PropTypes.arrayOf(
    PropTypes.shape({
      minWidth: PropTypes.number,
      maxWidth: PropTypes.number,
      cols: PropTypes.number,
      margin: PropTypes.number
    })
  ),
  photos: PropTypes.array,
  photoInfos: PropTypes.shape({
    default: PropTypes.string.isRequired,
    big: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
  }).isRequired,
  withLightbox: PropTypes.bool
};

const defaultProps = {
  configurations: [
    { maxWidth: 340, cols: 4, margin: 1 },
    { maxWidth: 1024, cols: 6, margin: 1 },
    { minWidth: 1025, cols: 12, margin: 1 }
  ],
  withLightbox: true
};

const Wrapper = styled.div`
  margin-top: 0.2rem;
  width: 100%;
`;

const LineContainer = styled.div`
  width: 100%;
  margin: ${props => `${props.margin}px 0`};
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  height: ${props => `${props.height}px`};
`;

const Item = styled.img`
  height: 100%
    &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const DEFAULT_COLS = 7;
const DEFAULT_MARGIN = 1;

const getChosenConfiguration = (configurations, width) => {
  const propsConfiguration = configurations.find(
    ({ minWidth, maxWidth }) =>
      ((minWidth && minWidth <= width) || !minWidth) &&
      ((maxWidth && maxWidth >= width) || !maxWidth)
  );
  return {
    width,
    cols: propsConfiguration.cols || DEFAULT_COLS,
    margin: propsConfiguration.margin || DEFAULT_MARGIN
  };
};

const Gallery = ({ photos, photoInfos, configurations, withLightbox }) => {
  const ref = useRef(null);
  const [selectedImgId, setSelectedImgId] = useState(null);
  const [configuration, setConfiguration] = useState(
    getChosenConfiguration(configurations, window.screen.width)
  );

  const getWidth = () => {
    return ref.current.offsetWidth || 0;
  };
  useEffect(() => {
    const handleResize = _.debounce(
      () =>
        setConfiguration(getChosenConfiguration(configurations, getWidth())),
      400
    );
    window.addEventListener("resize", handleResize);
    setConfiguration(getChosenConfiguration(configurations, getWidth()));
    return () => window.removeEventListener("resize", handleResize);
  }, [configurations]);

  const closeLightbox = () => setSelectedImgId(null);
  const next = () =>
    selectedImgId < photos.length ? setSelectedImgId(selectedImgId + 1) : null;
  const prev = () =>
    selectedImgId > 0 ? setSelectedImgId(selectedImgId - 1) : null;
  const displayLightbox = index =>
    index !== null && photos.length >= index && photos[index]
      ? photos[index][photoInfos.big]
      : null;

  const getLineHeight = photos => {
    const { width: screenWidth, cols, margin } = configuration;
    const { width: photoWidth, height: photoHeight } = photoInfos;
    let ratioSum = 0;
    photos.forEach(p => {
      ratioSum += p[photoWidth] / p[photoHeight];
    });
    const marginTotalWidth = cols * margin * 2;
    // '-1' because screenWith rounds size to up
    // marginTotalWidth = width to remove to size where images will be placed
    return (screenWidth - 1 - marginTotalWidth) / ratioSum;
  };

  const getChunks = photos => {
    const newPhotos = [...photos];
    const chunks = [];
    while (newPhotos.length) {
      const chunkPhotos = newPhotos.splice(0, configuration.cols);
      chunks.push({
        photos: chunkPhotos,
        lineHeight: getLineHeight(chunkPhotos)
      });
    }
    return chunks;
  };

  const chunks = getChunks(photos);
  return (
    <Wrapper ref={ref}>
      {photos.length ? (
        <Fragment>
          {chunks.map((chunk, chunkIndex) =>
            chunk.lineHeight ? (
              <LineContainer
                height={chunk.lineHeight}
                margin={configuration.margin}
                key={`line-${chunkIndex}`}
              >
                {chunk.photos.map((p, imgIndex) => {
                  const index = chunkIndex * configuration.cols + imgIndex;
                  return (
                    <Item
                      src={p[photoInfos.default]}
                      alt=""
                      key={`item-${imgIndex}`}
                      onClick={() => setSelectedImgId(index)}
                    />
                  );
                })}
              </LineContainer>
            ) : (
              <Loader />
            )
          )}
          {withLightbox && selectedImgId !== null && (
            <Ligthbox
              img={displayLightbox(selectedImgId)}
              onClose={closeLightbox}
              onNext={photos.length - 1 > selectedImgId ? next : null}
              onPrev={selectedImgId > 0 ? prev : null}
            />
          )}
        </Fragment>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};

Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;
export default Gallery;
export { Wrapper };
