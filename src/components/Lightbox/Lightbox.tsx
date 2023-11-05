import * as React from 'react';
import {LoaderInline} from '../Loader/LoaderInline';
import {CloseIcon} from './assets/CloseIcon';
import {LeftIcon} from './assets/LeftIcon';
import {RightIcon} from './assets/RightIcon';
import classnames from 'classnames';
import './lightbox.css';

const MAIN_CLASS = 'lightbox';

interface LightBoxProps {
  img: string;
  id: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const Ligthbox = ({
  img, id, onClose = () => {}, onNext, onPrev,
}:LightBoxProps) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const handleOnLoad = () => {
    setIsLoading(false);
  };

  const handleOnNext = () => {
    if(onNext){
      onNext();
      setIsLoading(true);
    }
  };

  const handleOnPrev = () => {
    if(onPrev){
      onPrev();
      setIsLoading(true);
    }
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
        <div data-testid="close-button" className={iconClassName} onClick={() => onClose()}>
          <CloseIcon name="close" />
        </div>
      </div>
      <div className={classnames(contentClassName,{[`${contentClassName}--is-loading`]: isLoading})}>
        <div className={classnames(buttonClassName, {[`${buttonClassName}--is-enabled`]:Boolean(onPrev)})} data-testid="prev-button">
          <div onClick={() => (handleOnPrev())} className={iconClassName}>
            <LeftIcon name="left" />
          </div>
        </div>
        <img src={img} className={classnames(imageClassName,{[`${imageClassName}--is-loading`]: isLoading})} alt={`lightbox of the selected picture with id ${id}`} onLoad={handleOnLoad} />
        <div className={classnames(buttonClassName, {[`${buttonClassName}--is-enabled`]:Boolean(onNext)})} data-testid="next-button">
          <div onClick={() => (handleOnNext())} className={iconClassName}>
            <RightIcon name="right" />
          </div>
        </div>
      </div>
    </div>
  );
};