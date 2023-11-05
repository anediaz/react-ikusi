import React from 'react';
import { Gallery as GalleryComponent } from '../components';
import { GalleryProps } from '../components/Gallery/Gallery';
import { Meta, StoryFn } from "@storybook/react";

import { BasicArgs, NoLightboxArgs, SmallScreenGalleryArgs } from './fixtures';

const GalleryStory = {
  title: 'Gallery/Gallery',
  component: GalleryComponent,
}as Meta;

const Template: StoryFn<typeof GalleryComponent> = (args:GalleryProps) => <GalleryComponent {...args} />
const Basic = Template.bind({})
Basic.args = BasicArgs;

const NoLightbox = Template.bind({})
NoLightbox.args = NoLightboxArgs;

const SmallScreenGallery = Template.bind({})
SmallScreenGallery.args = SmallScreenGalleryArgs;

export default GalleryStory;
export { Basic, NoLightbox, SmallScreenGallery };
