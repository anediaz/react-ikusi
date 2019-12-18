A photo Gallery.

```jsx
import Gallery from "./Gallery";

let photos = [
  {
    id: 27944068095,
    url_n: "https://live.staticflickr.com/7426/27944068095_bc5d213883_n.jpg",
    url_l: "https://live.staticflickr.com/7426/27944068095_bc5d213883_b.jpg",
    height_n: 213,
    width_n: 320
  },
  {
    id: 27764775600,
    url_n: "https://live.staticflickr.com/7683/27764775600_29273ee817_n.jpg",
    url_l: "https://live.staticflickr.com/7683/27764775600_29273ee817_b.jpg",
    height_n: 240,
    width_n: 320
  },
  {
    id: 27944070795,
    url_n: "https://live.staticflickr.com/7109/27944070795_cbbbce5fd6_n.jpg",
    url_l: "https://live.staticflickr.com/7109/27944070795_cbbbce5fd6_b.jpg",
    height_n: 240,
    width_n: 320
  },
  {
    id: "27944071185",
    url_n: "https://live.staticflickr.com/7296/27944071185_8f00b5cd9c_n.jpg",
    url_l: "https://live.staticflickr.com/7296/27944071185_8f00b5cd9c_b.jpg",
    height_n: 240,
    width_n: 320
  },
  {
    id: "31933155153",
    url_n: "https://live.staticflickr.com/302/31933155153_2d1b8c1393_n.jpg",
    url_l: "https://live.staticflickr.com/302/31933155153_2d1b8c1393_b.jpg",
    height_n: 213,
    width_n: 320
  },
  {
    id: "32623747591",
    url_n: "https://live.staticflickr.com/566/32623747591_bf1915cd8c_n.jpg",
    url_l: "https://live.staticflickr.com/566/32623747591_bf1915cd8c_b.jpg",
    height_n: 213,
    width_n: 320
  },
  {
    id: "32593761762",
    url_n: "https://live.staticflickr.com/736/32593761762_b7351ac28a_n.jpg",
    url_l: "https://live.staticflickr.com/736/32593761762_b7351ac28a_b.jpg",
    height_n: 213,
    width_n: 320
  },
  {
    id: "32747338065",
    url_n: "https://live.staticflickr.com/749/32747338065_5af1f7def8_n.jpg",
    url_l: "https://live.staticflickr.com/749/32747338065_5af1f7def8_b.jpg",
    height_n: 240,
    width_n: 320
  },
  {
    id: "32593766952",
    url_n: "https://live.staticflickr.com/779/32593766952_cec693cfd1_n.jpg",
    url_l: "https://live.staticflickr.com/779/32593766952_cec693cfd1_b.jpg",
    height_n: 252,
    width_n: 320
  }
];
let photoInfos = {
  default: "url_n",
  big: "url_l",
  width: "width_n",
  height: "height_n"
};

<Gallery photos={photos} photoInfos={photoInfos} style={{ width: "90%" }} />;
```
