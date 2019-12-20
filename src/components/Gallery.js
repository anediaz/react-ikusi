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
    c =>
      ((c.minWidth && c.minWidth <= width) || !c.minWidth) &&
      ((c.maxWidth && c.maxWidth >= width) || !c.maxWidth)
  );
  return {
    width,
    cols: propsConfiguration ? propsConfiguration.cols : DEFAULT_COLS,
    margin: propsConfiguration ? propsConfiguration.margin : DEFAULT_MARGIN
  };
};

const Gallery = ({ photos, photoInfos, configurations, withLightbox }) => {
  const ref = useRef(null);
  const [selectedImgId, setSelectedImgId] = useState(null);
  const [configuration, setConfiguration] = useState(configurations[0]);

  useEffect(() => {
    const getWidth = () => {
      const width = ref.current ? ref.current.offsetWidth : 0;
      return width;
    };
    setConfiguration(getChosenConfiguration(configurations, getWidth()));
    const handleResize = _.debounce(
      () =>
        setConfiguration(getChosenConfiguration(configurations, getWidth())),
      400
    );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [configurations]);

  const closeLightbox = () => setSelectedImgId(null);

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

  const getLigthboxPhotos = () =>
    photos.map(p => {
      return { id: p.id, src: p[photoInfos.big] };
    });

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
              ""
            )
          )}
          {withLightbox && selectedImgId !== null && (
            <Ligthbox
              img={selectedImgId}
              onClose={closeLightbox}
              photos={getLigthboxPhotos()}
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
