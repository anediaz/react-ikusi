import * as React from 'react';
import './loader-inline.css';
import classnames from 'classnames';
const DEFAULT_SIZE = 80;

interface LoaderInlineProps {
  height?: number;
  width?: number;
  color?: string;
  opacity?: string;
}

const getDivStyle = ({color, opacity, height, width}:{
  height: number;
  width: number;
  color?: string;
  opacity?: string;
}) => {
  return {
    background: color || '#ccc',
    opacity: opacity || 1,
    top: `${height * 0.4125}px`,
    width: `${width * 0.1625}px`,
    height: `${height * 0.1625}px`,
    borderRadius: `${height * 0.5}px`
  }
}

export const LoaderInline = ({width=DEFAULT_SIZE,height=DEFAULT_SIZE, color, opacity}:LoaderInlineProps) => {
  return(

  <div role="progressbar" aria-valuetext="loader-inline" className={classnames("loader-inline","lds-ellipsis")} style={{width: `${width}px`, height:`${height}px`}}>
    {[...Array(4)].map((_, index) => <div key={index} style={getDivStyle({width, height, opacity, color })} className="loader-inline_div"/>)}
  </div>
)}