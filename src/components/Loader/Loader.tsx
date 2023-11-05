import * as React from 'react';
import './loader.css';

export const Loader = () => (
  <div role="progressbar" aria-valuetext="loader">
    <div className='loader_circle1' />
    <div className='loader_circle2' />
    <div className='loader_circle3' />
  </div>
);