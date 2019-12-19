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
  @media (max-width: 375px) {
    height: 50%;
  }
`;

const Image = styled.img`
  height: 100%;
  margin: 0 auto;
`;

const ButtonContainer = styled.div``;
const Button = styled.span`
  color: white;
  font-size: ${props => (props.fontSize === "small" ? "35px" : "55px")};
  margin: 0 20px;
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
  onClose: PropTypes.func
};

const defaultProps = {
  img: null,
  photos: [],
  onClose: () => {}
};

const Ligthbox = ({ img, photos, close }) => {
  const [imgId, setImgId] = useState(null);
  useEffect(() => {
    setImgId(img);
  }, [img]);
  const isActive = () => imgId !== null;
  const hasNext = imgId !== null && imgId < photos.length - 1;
  const hasPrev = imgId !== null && imgId > 0;
  const onNext = () => hasNext && setImgId(imgId + 1);
  const onPrev = () => hasPrev && setImgId(imgId - 1);
  const onClose = () => {
    setImgId(null);
    close();
  };
  return (
    <Wrapper isActive={isActive()}>
      <Modal>
        <Button onClick={onClose} fontSize="big">
          ×
        </Button>
      </Modal>
      <Content>
        <ButtonContainer>
          <Button onClick={() => onPrev()}>{(hasPrev && "\x3C") || ""}</Button>
        </ButtonContainer>
        {imgId !== null && <Image src={photos[imgId].src} alt="" />}
        <ButtonContainer>
          <Button onClick={() => onNext()}>{(hasNext && "\x3E") || ""}</Button>
        </ButtonContainer>
      </Content>
    </Wrapper>
  );
};
Ligthbox.propTypes = propTypes;
Ligthbox.defaultProps = defaultProps;
export default Ligthbox;
