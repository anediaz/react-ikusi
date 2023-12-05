import * as React from 'react';
import './picture.css';
export interface PictureProps {
    src: string;
    id: string;
    onClick: () => void;
    isClickable: boolean;
}
export declare const Picture: ({ src, id, onClick, isClickable }: PictureProps) => React.JSX.Element;
