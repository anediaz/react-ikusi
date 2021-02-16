import React from 'react';
import Gallery from '../components/Gallery';

import {photos} from './data.js';

const GalleryStory = {
  title: 'Gallery',
  component: Gallery
};

const Template = ({photos, withLightbox}) => <Gallery photos={photos} withLightbox={withLightbox}/>;

const Basic = Template.bind({});
Basic.args = {
    photos,
    withLightbox: true,
  }

export default GalleryStory;
export {Basic};