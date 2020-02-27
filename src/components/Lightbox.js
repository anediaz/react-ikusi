import React from "react";
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
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (orientation: landscape) {
    height: 75%;
  }
  @media (orientation: portrait) {
    height: 60%;
  }
`;

const Image = styled.img`
  margin: 0 auto;
  height: 100%;
`;

const ButtonContainer = styled.div`
  width: 5%;
  @media (orientation: portrait) {
    margin: 0 auto;
  }
`;
const Button = styled.span`
  color: white;
  font-size: ${props => (props.fontSize === "small" ? "35px" : "50px")};
  opacity: 0.6;
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
  img: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func
};

const defaultProps = {
  img: null,
  onClose: () => {}
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
