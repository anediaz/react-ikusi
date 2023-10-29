import React, { useState } from 'react';
import styled from 'styled-components';
import LoaderInline from '../Loader/LoaderInline';
import LightboxPropTypes from './LightboxPropTypes';
import CloseIcon from './assets/CloseIcon';
import LeftIcon from './assets/LeftIcon';
import RightIcon from './assets/RightIcon';

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
  display: ${(props) => (props.isLoading && 'none')};
`;

const Content = styled.div`
  text-align: center;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  display: ${(props) => (props.isLoading ? 'none' : 'flex')};
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
  display: ${(props) => (props.isLoading ? 'none' : 'flex')};
`;

const ButtonContainer = styled.div`
  width: 5%;
  visibility: ${(props) => (!props.enabled ? 'hidden' : 'visible')};
  @media (orientation: portrait) {
    margin: 0 auto;
  }
`;

const IconContainer = styled.div`
  svg{
    fill: white;
    width: ${(props) => (props.size === 'small' ? '35px' : '45px')};
    height: auto;
    opacity: .8;
    margin-bottom: 1rem;
    &:hover {
      cursor: pointer;
    }
    @media (max-width: 768px) {
      width: ${(props) => (props.size === 'small' ? '35px' : '40px')};
    }
    @media (min-width: 1920px) {
      width: 125px;
    }
  }
`;

const Ligthbox = ({
  img, id, onClose = () => {}, onNext, onPrev,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleOnLoad = () => {
    setIsLoading(false);
  };

  const handleOnNext = () => {
    onNext();
    setIsLoading(true);
  };

  const handleOnPrev = () => {
    onPrev();
    setIsLoading(true);
  };

  return (
    <Wrapper isActive={Boolean(img)}>
      {isLoading && <LoaderInline />}
      <Modal isLoading={isLoading}>
        <IconContainer data-testid="close-button" alt="close" onClick={() => onClose()} size="big">
          <CloseIcon name="close" />
        </IconContainer>
      </Modal>
      <Content isLoading={isLoading}>
        <ButtonContainer data-testid="prev-button" alt="prev" enabled={Boolean(onPrev)}>
          <IconContainer onClick={() => (onPrev ? handleOnPrev() : null)}>
            <LeftIcon name="left" />
          </IconContainer>
        </ButtonContainer>
        <Image src={img} isLoading={isLoading} alt={`lightbox of the selected picture with id ${id}`} onLoad={handleOnLoad} />
        <ButtonContainer data-testid="next-button" alt="next" enabled={Boolean(onNext)}>
          <IconContainer onClick={() => (onNext ? handleOnNext() : null)}>
            <RightIcon name="right" />
          </IconContainer>
        </ButtonContainer>
      </Content>
    </Wrapper>
  );
};

Ligthbox.propTypes = LightboxPropTypes;
export default Ligthbox;
