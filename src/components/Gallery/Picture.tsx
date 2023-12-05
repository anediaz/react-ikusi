import * as React from 'react';
import classnames from 'classnames';
import './picture.css';
const MAIN_CLASS='gallery-picture'

export interface PictureProps {
    src: string;
    id:string; 
    onClick:() => void;
    isClickable:boolean
}

export const Picture = ({ src, id, onClick,isClickable
  }:PictureProps) => {
    const [isLoaded,setIsLoaded] = React.useState(false);
    return (
      <div className={`${MAIN_CLASS}`}>
        <img
          src={src}
          alt={`picture with id ${id}`}
          onClick={onClick}
          className={classnames(`${MAIN_CLASS}__image`, {[`${MAIN_CLASS}__image--is-clickable`]: isClickable }, {[`${MAIN_CLASS}__image--is-loaded`]: isLoaded })}
          onLoad={() => setIsLoaded(true)}
       />
        </div>
      );
  }