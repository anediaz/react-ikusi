import { GalleryProps, ConfigurationProps } from '../components/Gallery/Gallery';
import photos from './data';

export const BasicArgs = {
    photos,
    withLightbox:true
} as GalleryProps;

export const NoLightboxArgs = {
   photos,
   withLightbox:false
} as GalleryProps;

const configurations:ConfigurationProps[] = [
    { maxWidth: 340, cols: 3, margin: 1 },
    { maxWidth: 1024, cols: 3, margin: 1 },
    { minWidth: 1025, cols: 3, margin: 1 },
  ];

export const SmallScreenGalleryArgs = {
    photos,
    withLightbox: true,
    configurations,
};