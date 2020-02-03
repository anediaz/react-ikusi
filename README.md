# react-ikusi

React photo displaying component library

- Creates a masonry for image displaying
- Supports column direction layout
- Configurable for different screen sizes
- Responsive
- Combined with a lightbox to display each image

## Preview

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

<Gallery photos={photos} />;
```
