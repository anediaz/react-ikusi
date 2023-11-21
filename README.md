#

<img src="https://live.staticflickr.com//65535//49596034956_0cd35c0db4_o.png" />

<a href="https://www.npmjs.com/package/react-ikusi">See on NPM</a> &nbsp;&nbsp;[![See on NPM][npm-image]][storybook-url]

<a href="https://anediaz.github.io/react-ikusi/?path=/docs/react-ikusi--docs">See on Storybook</a> &nbsp;&nbsp;[![See on Storybook][storybook-image]][storybook-url]

#

[npm-url]: https://www.npmjs.com/package/react-ikusi
[npm-image]: https://github.com/anediaz/react-ikusi/assets/17216937/1f2391bf-fae5-4a59-af03-74b9918df37b
[storybook-url]: https://anediaz.github.io/react-ikusi/?path=/docs/react-ikusi--docs
[storybook-image]: https://github.com/anediaz/react-ikusi/assets/17216937/48dfea53-4d6c-4d30-b2bf-6670ad9755af

A lightweight React responsive masonry component to display images.
Built with CSS Flexbox:
-   Supports row direction layout
-   Configurable for different screen sizes
-   Responsive
-   Combined with a lightbox to display each image

:bulb: The word **_ikusi_** from the package name react-ikusi means **_see_** in Basque language.
Click [here](https://en.wikipedia.org/wiki/Basque_language) for more information.

## Getting started
You can download `react-ikusi` from the NPM registry via `npm` or
`yarn`

```shell
yarn add react-ikusi
npm install react-ikusi --save
```
## Demo
See <a href="https://anediaz.github.io/react-ikusi/?path=/docs/react-ikusi--docs">react-ikusi Storybook</a>

## Example

Customizable configurations for different screen sizes
| | |
| ---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------: |
| <img src="https://live.staticflickr.com//65535//49596351782_fbf41d588f_n.jpg" alt="example"/> | <img src="https://live.staticflickr.com//65535//49595603383_d76c9a0d9a_n.png" alt="example"/> |

## Usage
Here's the minimal setup example:

```jsx
const photos = [
    {
        src: 'http://example.com/example/img1.jpg',
        width: 4,
        height: 3,
    },
    {
        src: 'http://example.com/example/img2.jpg',
        width: 1,
        height: 1,
    },
];

'https://live.staticflickr.com/65535/49595136583_f326bc8ef5_o.jpg',
    'https://live.staticflickr.com/65535/49595636006_ce5a2e029a_o.jpg',
    'https://live.staticflickr.com/65535/49595635976_7d941dac9e_o.jpg',
    'https://live.staticflickr.com/65535/49595136513_235b10c43e_o.jpg',
    'https://live.staticflickr.com/65535/49595136473_eb70b9a091_o.png';

import Gallery from 'react-ikusi';
<Gallery photos={photos} />;
```

## Props

###

<ins>**Photo**</ins>

| Name   | Description                                                   | Type   | Required |
| ------ | ------------------------------------------------------------- | ------ | -------- |
| id    | Unique identifier of the photo                                 | string | true     |
| src    | Url source of the original photo                              | string | true     |
| width  | Original width of the photo in pixels                         | number | true     |
| height | Original height of the photo in pixels                        | number | true     |
| bigSrc | Url source of the photo in big size (for Lightbox displaying) | string | false    |

\
<ins>**Configuration**</ins>

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
An example of Gallery layout :

<img src="https://live.staticflickr.com//65535//49595136583_f326bc8ef5_n.jpg" width="45%" alt="layout"/> <img src="https://live.staticflickr.com//65535//49595636006_ce5a2e029a_n.jpg" width="45%" alt="layout"/>

<img src="https://live.staticflickr.com//65535//49595635976_7d941dac9e_n.jpg" width="45%" alt="layout"/> <img src="https://live.staticflickr.com/65535/49595136513_235b10c43e_n.jpg" width="45%" alt="layout"/>
