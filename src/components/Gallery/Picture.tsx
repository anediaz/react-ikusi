import * as React from 'react';
import classnames from 'classnames';
import './picture.css';
const MAIN_CLASS='gallery-picture'

interface PictureProps{
    src: string;
    id:string; 
    onClick:() => void;
    isClickable:boolean
}

export const Picture = ({ src, id, onClick,isClickable
  }:PictureProps) => {
    return (
        <img
          src={src}
          alt={`picture with id ${id}`}
          onClick={onClick}
          className={classnames(MAIN_CLASS, {[`${MAIN_CLASS}--is-clickable`]: isClickable })}
        />
      );
  }