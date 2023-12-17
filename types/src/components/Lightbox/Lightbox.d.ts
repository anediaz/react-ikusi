import * as React from 'react';
import './lightbox.css';
export interface LightBoxProps {
    img: string;
    id: string;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
}
export declare const Ligthbox: ({ img, id, onClose, onNext, onPrev, }: LightBoxProps) => React.JSX.Element;
