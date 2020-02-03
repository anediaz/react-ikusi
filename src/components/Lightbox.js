import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: ${props => (!props.isActive ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  left: 0px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2001;
  background: rgba(0, 0, 0, 0.8);
`;
const Modal = styled.div`
  width: 100%;
  overflow: auto;
  text-align: center;
`;

const Content = styled.div`
  width: 100%;
  height: 75%;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.img`
  height: 100%;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  width: 5%;
`;
const Button = styled.span`
  color: white;
  font-size: ${props => (props.fontSize === "small" ? "35px" : "50px")};
  @media (max-width: 768px) {
    font-size: ${props => (props.fontSize === "small" ? "35px" : "40px")};
  }

  &:hover {
    cursor: pointer;
  }
  @media (min-width: 1920px) {
    font-size: 125px;
  }
`;

const propTypes = {
  img: PropTypes.number,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      src: PropTypes.string.isRequired
    })
  ),
  close: PropTypes.func
};

const defaultProps = {
  img: null,
  photos: [],
  close: () => {}
};

const previousText = "\x3C";
const nextText = "\x3E";

const Ligthbox = ({ img, onClose, onNext, onPrev }) => (
  <Wrapper isActive={Boolean(img)}>
    <Modal>
      <Button onClick={() => onClose()} fontSize="big">
        ×
      </Button>
    </Modal>
    <Content>
      {onPrev ? (
        <ButtonContainer>
          <Button onClick={() => onPrev()}>{previousText}</Button>
        </ButtonContainer>
      ) : null}
      <Image src={img} alt="" />
      {onNext ? (
        <ButtonContainer>
          <Button onClick={() => onNext()}>{nextText}</Button>
        </ButtonContainer>
      ) : null}
    </Content>
  </Wrapper>
);

Ligthbox.propTypes = propTypes;
Ligthbox.defaultProps = defaultProps;
export default Ligthbox;
