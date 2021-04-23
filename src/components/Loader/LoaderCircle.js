import React from 'react';
import styled from "styled-components";
import * as PropTypes from 'prop-types';
import './LoaderCircle.css';

const LoaderStyle = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const DivStyle = styled.div`
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
  &:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${(props) => props.background || '#999999'};
    opacity: ${(props) => props.opacity || '1'};
    margin: -4px 0 0 -4px;
  }
`;

const LoaderCircle = ({color, opacity}) => (
  <LoaderStyle className="lds-roller">
    {[...Array(8)].map((_, index) => <DivStyle key={index} background={color} opacity={opacity}/>)}
  </LoaderStyle>
)

LoaderCircle.propTypes = {
  color: PropTypes.string,
  opacity: PropTypes.string,
}

export default LoaderCircle;
