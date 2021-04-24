import React from 'react';
import { Gallery } from '../components';
import photos from './data';

const GalleryStory = {
  title: 'Gallery/Gallery',
  component: Gallery,
};

const Template = (args) => <Gallery {...args} />;

const Basic = Template.bind({});
Basic.args = {
  photos,
  withLightbox: true,
};

const WithoutLightbox = Template.bind({});
WithoutLightbox.args = {
  photos,
  withLightbox: false,
};

const configurations = [
  { maxWidth: 340, cols: 3, margin: 1 },
  { maxWidth: 1024, cols: 3, margin: 1 },
  { minWidth: 1025, cols: 3, margin: 1 },
];

const WithMobileConfig = Template.bind({});
WithMobileConfig.args = {
  photos,
  withLightbox: true,
  configurations,
};

export default GalleryStory;
export { Basic as Default, WithoutLightbox as NoLightbox, WithMobileConfig as SmallScreenGallery };
