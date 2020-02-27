A photo Gallery.

```jsx
import Gallery from "./Gallery";

let photos = [
  {
    src: "https://live.staticflickr.com/7426/27944068095_bc5d213883_n.jpg",
    height: 213,
    width: 320,
    bigSrc: "https://live.staticflickr.com/7426/27944068095_bc5d213883_b.jpg"
  },
  {
    src: "https://live.staticflickr.com/7683/27764775600_29273ee817_n.jpg",
    height: 240,
    width: 320,
    bigSrc: "https://live.staticflickr.com/7683/27764775600_29273ee817_b.jpg"
  },
  {
    src: "https://live.staticflickr.com/7109/27944070795_cbbbce5fd6_n.jpg",
    height: 240,
    width: 320,
    bigSrc: "https://live.staticflickr.com/7109/27944070795_cbbbce5fd6_b.jpg"
  },
  {
    id: "27944071185",
    src: "https://live.staticflickr.com/7296/27944071185_8f00b5cd9c_n.jpg",
    height: 240,
    width: 320,
    bigSrc: "https://live.staticflickr.com/7296/27944071185_8f00b5cd9c_b.jpg"
  },
  {
    id: "31933155153",
    src: "https://live.staticflickr.com/302/31933155153_2d1b8c1393_n.jpg",
    height: 213,
    width: 320,
    bigSrc: "https://live.staticflickr.com/302/31933155153_2d1b8c1393_b.jpg"
  },
  {
    id: "32623747591",
    src: "https://live.staticflickr.com/566/32623747591_bf1915cd8c_n.jpg",
    height: 213,
    width: 320,
    bigSrc: "https://live.staticflickr.com/566/32623747591_bf1915cd8c_b.jpg"
  },
  {
    id: "32593761762",
    src: "https://live.staticflickr.com/736/32593761762_b7351ac28a_n.jpg",
    height: 213,
    width: 320,
    bigSrc: "https://live.staticflickr.com/736/32593761762_b7351ac28a_b.jpg"
  },
  {
    id: "32747338065",
    src: "https://live.staticflickr.com/749/32747338065_5af1f7def8_n.jpg",
    height: 240,
    width: 320,
    bigSrc: "https://live.staticflickr.com/749/32747338065_5af1f7def8_b.jpg"
  },
  {
    id: "32593766952",
    url_n: "https://live.staticflickr.com/779/32593766952_cec693cfd1_n.jpg",
    height: 252,
    width: 320,
    bigSrc: "https://live.staticflickr.com/779/32593766952_cec693cfd1_b.jpg"
  }
];

<Gallery photos={photos} style={{ width: "90%" }} />;
```
