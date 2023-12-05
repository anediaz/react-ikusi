import * as React from 'react';
import './gallery.css';
export interface ConfigurationProps {
    cols: number;
    margin: number;
    minWidth?: number;
    maxWidth?: number;
}
export interface GalleryConfigurationProps extends ConfigurationProps {
    width: number;
}
export interface PhotoProps {
    id: string;
    src: string;
    width: number;
    height: number;
    bigSrc?: string;
}
export interface GalleryProps {
    configurations?: ConfigurationProps[];
    withLightbox?: boolean;
    photos: PhotoProps[];
    onClickPhoto?: (id: string) => void;
}
export declare const Gallery: ({ photos, configurations, withLightbox, onClickPhoto, }: GalleryProps) => React.JSX.Element;
