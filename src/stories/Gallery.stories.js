import React from "react";
import { action } from "@storybook/addon-actions";
import Gallery from "../components/Gallery";

export default {
  title: "Gallery",
  component: Gallery
};

const photos = [
  {
    src: "https://live.staticflickr.com/65535/48948696008_d2e6304452_o.jpg",
    height: 2335,
    width: 1638
  },
  {
    src: "https://live.staticflickr.com/65535/48948696113_bc1883a344_o.jpg",
    height: 2048,
    width: 1462
  },
  {
    src: "https://live.staticflickr.com/65535/48949437047_3719a11fe3_o.gif",
    height: 778,
    width: 1100
  },
  {
    src: "https://live.staticflickr.com/65535/48949239306_353bd1416c_o.jpg",
    height: 2048,
    width: 1470
  },
  {
    src: "https://live.staticflickr.com/65535/48949572371_2e574dc7a8_o.png",
    height: 1415,
    width: 2204
  },
  {
    src: "https://live.staticflickr.com/65535/49236387428_56e2798676_o.jpg",
    height: 2388,
    width: 1668
  },
  {
    src: "https://live.staticflickr.com/65535/49237083642_e871d0498c_o.jpg",
    height: 2048,
    width: 2048
  },
  {
    src: "https://live.staticflickr.com/65535/49236387048_6af7204d6d_o.jpg",
    height: 2388,
    width: 1668
  },
  {
    src: "https://live.staticflickr.com/65535/49236860141_08b85988d4_o.jpg",
    height: 2388,
    width: 1668
  },
  {
    src: "https://live.staticflickr.com/65535/49236386288_8d3c9781b4_o.jpg",
    height: 2388,
    width: 1668
  },
  {
    src: "https://live.staticflickr.com/65535/49237835198_cfe3edd967_o.jpg",
    height: 1798,
    width: 1237
  },
  {
    src: "https://live.staticflickr.com/65535/49237835263_f838efd37f_o.jpg",
    height: 1909,
    width: 2909
  },
  {
    src: "https://live.staticflickr.com/65535/49237832698_07d06bd7d2_o.png",
    height: 2144,
    width: 1515
  },
  {
    src: "https://live.staticflickr.com/65535/49237831013_27800d6aab_o.jpg",
    height: 2409,
    width: 1056
  },
  {
    src: "https://live.staticflickr.com/65535/49237830028_40ae4d3bd3_o.jpg",
    height: 2608,
    width: 1874
  },

  {
    src: "https://live.staticflickr.com/65535/49237827163_7c87a0f3bc_o.jpg",
    height: 768,
    width: 1024
  },
  {
    src: "https://live.staticflickr.com/65535/48948696008_d2e6304452_o.jpg",
    height: 2335,
    width: 1638
  },
  {
    src: "https://live.staticflickr.com/65535/48948696113_bc1883a344_o.jpg",
    height: 2048,
    width: 1462
  },
  {
    src: "https://live.staticflickr.com/65535/49236860141_08b85988d4_o.jpg",
    height: 2388,
    width: 1668
  },
  {
    src: "https://live.staticflickr.com/65535/49236386288_8d3c9781b4_o.jpg",
    height: 2388,
    width: 1668
  },
  {
    src: "https://live.staticflickr.com/65535/49237835198_cfe3edd967_o.jpg",
    height: 1798,
    width: 1237
  }
];
export const DefaultConfig = () => <Gallery photos={photos} />;
export const WithoutLightbox = () => (
  <Gallery photos={photos} withLightbox={false} />
);

export const CustomConfig = () => (
  <Gallery
    photos={photos}
    configurations={[
      { maxWidth: 340, cols: 1, margin: 1 },
      { maxWidth: 1024, cols: 2, margin: 1 },
      { minWidth: 1025, cols: 6, margin: 1 }
    ]}
  />
);

DefaultConfig.story = {
  name: "Default config"
};
