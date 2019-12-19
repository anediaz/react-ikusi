Photo Lightbox

```jsx
import Lightbox from "./Lightbox";

let photos = [
  {
    id: "27944068095",
    src: "https://live.staticflickr.com/7426/27944068095_bc5d213883_b.jpg"
  },
  {
    id: "27764775600",
    src: "https://live.staticflickr.com/7683/27764775600_29273ee817_b.jpg"
  },
  {
    id: "27944070795",
    src: "https://live.staticflickr.com/7109/27944070795_cbbbce5fd6_b.jpg"
  },
  {
    id: "27944071185",
    src: "https://live.staticflickr.com/7296/27944071185_8f00b5cd9c_b.jpg"
  },
  {
    id: "31933155153",
    src: "https://live.staticflickr.com/302/31933155153_2d1b8c1393_b.jpg"
  },
  {
    id: "32623747591",
    src: "https://live.staticflickr.com/566/32623747591_bf1915cd8c_b.jpg"
  },
  {
    id: "32593761762",
    src: "https://live.staticflickr.com/736/32593761762_b7351ac28a_b.jpg"
  },
  {
    id: "32747338065",
    src: "https://live.staticflickr.com/749/32747338065_5af1f7def8_b.jpg"
  },
  {
    id: "32593766952",
    src: "https://live.staticflickr.com/779/32593766952_cec693cfd1_b.jpg"
  }
];

initialState = { selectedImg: null };
<div>
  <button onClick={() => setState({ selectedImg: 0 })}>Open lightbox</button>
  <Ligthbox
    photos={photos}
    img={state.selectedImg}
    close={() => setState({ selectedImg: null })}
  />
</div>;
```
