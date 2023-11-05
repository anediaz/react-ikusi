import React from 'react';
import { Gallery as GalleryComponent } from '../components';
import { GalleryProps } from '../components/Gallery/Gallery';
import { Meta, StoryFn } from "@storybook/react";

import { BasicArgs, NoLightboxArgs, SmallScreenGalleryArgs } from './fixtures';

export default {
  title: 'Gallery',
  component: GalleryComponent,
  parameters:{
    docs:{
      description: {
        component: 'React photo displaying component library'
      },
    }
  }
}as Meta;

const Template: StoryFn<typeof GalleryComponent> = (args:GalleryProps) => <GalleryComponent {...args} />
export const BasicGallery = Template.bind({})
BasicGallery.args = BasicArgs;

export const WithoutLightbox = Template.bind({})
WithoutLightbox.args = NoLightboxArgs;

export const SmallScreen = Template.bind({})
SmallScreen.args = SmallScreenGalleryArgs;
