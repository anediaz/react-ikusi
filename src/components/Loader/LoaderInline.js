/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import * as PropTypes from 'prop-types';
import './loader-inline.css';
import classnames from 'classnames';
const DEFAULT_SIZE = '80';

const getDivStyle = ({background, opacity, height, width}) => {
  return {
    background: background || '#ccc',
    opacity: opacity || 1,
    top: `${height} * 0.4125}px`,
    width: `${width * 0.1625}px`,
    height: `${height * 0.1625}px`,
    borderRadius: `${height * 0.5}px`
  }
}

const LoaderInline = ({
  width = DEFAULT_SIZE, height = DEFAULT_SIZE, color, opacity,
}) => (
  <div role="progressbar" aria-valuetext="loader-inline" className={classnames("loader-inline","lds-ellipsis")} style={{width: `${width}px`, height:`${height}px`}}>
    {[...Array(4)].map((_, index) => <div key={index} style={getDivStyle({backgroung:color, opacity, height, width})} className="loader-inline_div"/>)}
  </div>
);

LoaderInline.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.string,
};

export default LoaderInline;
