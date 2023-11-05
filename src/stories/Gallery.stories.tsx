import React from 'react';
import { Gallery as GalleryComponent } from '../components';
import { Configuration, NonEmptyArray } from '../components/Gallery/Gallery';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import photos from './data';


const Template: ComponentStory<typeof GalleryComponent> = (
    args,
) => {
    return (
        <GalleryComponent {...args} />);
};

const Basic: typeof Template = Template.bind(
    {},
);

export const BasicArgs = {
  photos,
  withLightbox:true
}

Basic.args = BasicArgs;

const GalleryStory = {
  title: 'Gallery/Gallery',
  component: GalleryComponent,
} as ComponentMeta<typeof GalleryComponent>;

const NoLightbox: typeof Template = Template.bind(
  {},
);

export const NoLightboxArgs = {
  photos,
  withLightbox:false
}

NoLightbox.args = NoLightboxArgs;

const configurations:NonEmptyArray<Configuration> = [
  { maxWidth: 340, cols: 3, margin: 1 },
  { maxWidth: 1024, cols: 3, margin: 1 },
  { minWidth: 1025, cols: 3, margin: 1 },
];

const SmallScreenGallery: typeof Template = Template.bind(
  {},
);
export const SmallScreenGalleryArgs = {
  photos,
  withLightbox: true,
  configurations,
};
SmallScreenGallery.args = SmallScreenGalleryArgs;

export default GalleryStory;
export { Basic, NoLightbox, SmallScreenGallery };
