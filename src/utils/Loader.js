import React from "react";
import styled, { keyframes } from "styled-components";

const rotateCircle = keyframes`
  0%{
    transform: rotate(0deg);
  }
  50%{
    transform: rotate(360deg);
  }
  100%{
    transform: rotate(720deg);
  }
`;

const Circle = styled.div`
  position: absolute;
  border: 0.1rem solid;
  border-radius: 50%;
  float: left;
`;

const Circle1 = styled(Circle)`
  height: 3rem;
  width: 3rem;
  left: calc(50% - 1.5rem);
  top: calc(50% - 1.5rem);
  border-color: deepskyblue;
  border-left: none;
  animation: ${rotateCircle} 8s linear infinite;
`;

const Circle2 = styled(Circle)`
  height: 2rem;
  width: 2rem;
  left: calc(50% - 1rem);
  top: calc(50% - 1rem);
  border-color: deeppink;
  border-top: none;
  animation: ${rotateCircle} 3s linear infinite;
`;

const Circle3 = styled(Circle)`
  height: 1rem;
  width: 1rem;
  left: calc(50% - 0.5rem);
  top: calc(50% - 0.5rem);
  border-color: lightseagreen;
  border-right: none;
  animation: ${rotateCircle} 5s linear infinite;
`;
const Loader = () => (
  <div className="Loader">
    <Circle1 />
    <Circle2 />
    <Circle3 />
  </div>
);

export default Loader;
