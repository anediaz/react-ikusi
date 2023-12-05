import { GalleryProps, ConfigurationProps } from '../components/Gallery/Gallery';
import photos from './data';

export const BasicArgs:GalleryProps = {
    photos,
    withLightbox:true
};

export const NoLightboxArgs:GalleryProps = {
   photos,
   withLightbox:false
};

const configurations:ConfigurationProps[] = [
    { maxWidth: 340, cols: 3, margin: 1 },
    { maxWidth: 1024, cols: 3, margin: 1 },
    { minWidth: 1025, cols: 3, margin: 1 },
  ];

export const SmallScreenGalleryArgs:GalleryProps = {
    photos,
    withLightbox: true,
    configurations,
};