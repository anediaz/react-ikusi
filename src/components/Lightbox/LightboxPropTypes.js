import PropTypes from 'prop-types';

const LightboxPropTypes = {
  img: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
};

export default LightboxPropTypes;
