#

<img src="https://live.staticflickr.com//65535//49596034956_0cd35c0db4_o.png" />

#

React photo displaying component library

- Creates a masonry for image displaying
- Supports row direction layout
- Configurable for different screen sizes
- Responsive
- Combined with a lightbox to display each image

:bulb: The word **_ikusi_** from the package name react-ikusi means **_see_** in Basque language.
Click [here](https://en.wikipedia.org/wiki/Basque_language) for more information.

## Preview

Customizable configurations for different screen sizes
| | |
| ---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------: |
| <img src="https:\/\/live.staticflickr.com\/65535\/49596351782_fbf41d588f_o.jpg" alt="example"/> | <img src="https://live.staticflickr.com//65535//49595603383_d76c9a0d9a_o.png" alt="example"/> |

## Installation

```
npm install react-ikusi
```

## Minimal Setup Example

```jsx
const photos = [
  {
    src: "http://example.com/example/img1.jpg",
    width: 4,
    height: 3
  },
  {
    src: "http://example.com/example/img2.jpg",
    width: 1,
    height: 1
  }
];

"https://live.staticflickr.com/65535/49595136583_f326bc8ef5_o.jpg",
  "https://live.staticflickr.com/65535/49595636006_ce5a2e029a_o.jpg",
  "https://live.staticflickr.com/65535/49595635976_7d941dac9e_o.jpg",
  "https://live.staticflickr.com/65535/49595136513_235b10c43e_o.jpg",
  "https://live.staticflickr.com/65535/49595136473_eb70b9a091_o.png";

import Gallery from "react-ikusi";
<Gallery photos={photos} />;
```

## API Documentation

###

<ins>**Details of props 'photos'**</ins>

| Name   | Description                                                   | Type   | Required |
| ------ | ------------------------------------------------------------- | ------ | -------- |
| src    | Url source of the original photo                              | string | true     |
| width  | Original width of the photo in pixels                         | number | true     |
| height | Original height of the photo in pixels                        | number | true     |
| bigSrc | Url source of the photo in big size (for Lightbox displaying) | string | false    |

\
<ins>**Details of props 'configurations'**</ins>

It is an array which may contain multiple elements for different screen sizes.

It determines the number of elements to be displayed per row and their margin.

| Name     | Description                                      | Type   | Required |
| -------- | ------------------------------------------------ | ------ | -------- |
| cols     | Number of elements per row                       | number | true     |
| margin   | Space around each element of the Gallery (px)    | number | true     |
| minWidth | Minimum width for the current configuration (px) | number | false    |
| maxWidth | Maximum width for the current configuration (px) | number | false    |

\
\
An exemple of Gallery's layout :

<img src="https://live.staticflickr.com//65535//49595136583_f326bc8ef5_o.jpg" width="45%" alt="layout"/>

<img src="https://live.staticflickr.com//65535//49595636006_ce5a2e029a_o.jpg" width="45%" alt="layout"/>
<img src="https:\/\/live.staticflickr.com\/65535\/49595635976_7d941dac9e_o.jpg" width="45%" alt="layout"/>
<img src="https:\/\/live.staticflickr.com\/65535\/49595136513_235b10c43e_o.jpg" width="45%" alt="layout"/>
