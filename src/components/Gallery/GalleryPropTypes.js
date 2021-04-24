import * as PropTypes from 'prop-types';

const GalleryPropTypes = {
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
      id: PropTypes.string,
    }),
  ).isRequired,
  withLightbox: PropTypes.bool,
  onClickPhoto: PropTypes.func,
};

export default GalleryPropTypes;
