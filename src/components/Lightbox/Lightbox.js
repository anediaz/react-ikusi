import React, { useState } from 'react';
import LoaderInline from '../Loader/LoaderInline';
import LightboxPropTypes from './LightboxPropTypes';
import CloseIcon from './assets/CloseIcon';
import LeftIcon from './assets/LeftIcon';
import RightIcon from './assets/RightIcon';
import classnames from 'classnames';
import './lightbox.css';

const MAIN_CLASS = 'lightbox';

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

  const modalClassName = `${MAIN_CLASS}_modal`;
  const contentClassName = `${MAIN_CLASS}_content`;
  const imageClassName = `${contentClassName}_image`;
  const buttonClassName = `${contentClassName}_button-container`;
  const iconClassName = `${modalClassName}_icon-container`;
  return (
    <div className={classnames(MAIN_CLASS, {[`${MAIN_CLASS}--is-not-active`]:!Boolean(img)})}>
      {isLoading && <LoaderInline />}
      <div className={classnames(modalClassName,{[`${modalClassName}--is-loading`]: isLoading})}>
        <div data-testid="close-button" alt="close" className={iconClassName} onClick={() => onClose()}>
          <CloseIcon name="close" />
        </div>
      </div>
      <div className={classnames(contentClassName,{[`${contentClassName}--is-loading`]: isLoading})}>
        <div className={classnames(buttonClassName, {[`${buttonClassName}--is-enabled`]:Boolean(onPrev)})} data-testid="prev-button" alt="prev">
          <div onClick={() => (onPrev ? handleOnPrev() : null)} className={iconClassName}>
            <LeftIcon name="left" />
          </div>
        </div>
        <img src={img} className={classnames(imageClassName,{[`${imageClassName}--is-loading`]: isLoading})} alt={`lightbox of the selected picture with id ${id}`} onLoad={handleOnLoad} />
        <div className={classnames(buttonClassName, {[`${buttonClassName}--is-enabled`]:Boolean(onNext)})} data-testid="next-button" alt="next">
          <div onClick={() => (onNext ? handleOnNext() : null)} className={iconClassName}>
            <RightIcon name="right" />
          </div>
        </div>
      </div>
    </div>
  );
};

Ligthbox.propTypes = LightboxPropTypes;
export default Ligthbox;
