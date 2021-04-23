import React from 'react';
import styled from "styled-components";
import * as PropTypes from 'prop-types';
import './LoaderInline.css';

const DEFAULT_SIZE= "80";

const LoaderStyle = styled.div`
  display: inline-block;
  position: relative;
  width: ${({width}) => `${width}px` || '80px'};
  height: ${({height}) => `${height}px` || '80px'};
`;

const DivStyle = styled.div`
  position: absolute;
  top: ${({height}) => `${height * 0.4125}px`};
  width: ${({width}) => `${width * 0.1625}px`};
  height: ${({height}) => `${height * 0.1625}px`};
  border-radius: ${({height}) => `${height * 0.5}px`};
  background: ${({background}) => background || '#ccc'};
  opacity: ${({opacity}) => opacity || '1'};;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;

const LoaderInline = ({width = DEFAULT_SIZE, height = DEFAULT_SIZE, color, opacity}) => (
  <LoaderStyle className="lds-ellipsis" width={width} height={height}>
    {[...Array(4)].map((_,index) => <DivStyle key={index} background={color} opacity={opacity} height={height} width={width}/>)}
  </LoaderStyle>
)

LoaderInline.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.string,
}

export default LoaderInline;
