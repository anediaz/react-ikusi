import React from 'react';
import styled from 'styled-components';
import LightboxPropTypes from './LightboxPropTypes';

const Wrapper = styled.div`
  display: ${(props) => (!props.isActive ? 'none' : 'flex')};
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
    max-height: 60%;
  }
`;

const Image = styled.img`
  margin: 0 auto;
  max-height: 100%;
  max-width: 80%;
`;

const ButtonContainer = styled.div`
  width: 5%;
  visibility: ${(props) => (!props.enabled ? 'hidden' : 'visible')};
  @media (orientation: portrait) {
    margin: 0 auto;
  }
`;
const Button = styled.span`
  color: white;
  font-size: ${(props) => (props.fontSize === 'small' ? '35px' : '50px')};
  opacity: 0.6;
  @media (max-width: 768px) {
    font-size: ${(props) => (props.fontSize === 'small' ? '35px' : '40px')};
  }

  &:hover {
    cursor: pointer;
  }
  @media (min-width: 1920px) {
    font-size: 125px;
  }
`;

const previousText = '\x3C';
const nextText = '\x3E';

const Ligthbox = ({
  img, onClose = () => {}, onNext, onPrev,
}) => (
  <Wrapper isActive={Boolean(img)}>
    <Modal>
      <Button onClick={() => onClose()} fontSize="big">
        ×
      </Button>
    </Modal>
    <Content>
      <ButtonContainer enabled={Boolean(onPrev)}>
        <Button onClick={() => (onPrev ? onPrev() : null)}>
          {previousText}
        </Button>
      </ButtonContainer>
      <Image src={img} alt="" />
      <ButtonContainer enabled={Boolean(onNext)}>
        <Button onClick={() => (onNext ? onNext() : null)}>{nextText}</Button>
      </ButtonContainer>
    </Content>
  </Wrapper>
);

Ligthbox.propTypes = LightboxPropTypes;
export default Ligthbox;
