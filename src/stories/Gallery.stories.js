import Gallery from '../components/Gallery';
import {photos} from './data.js';

const GalleryStory = {
  title: 'Gallery/Gallery',
  component: Gallery
};

const Template = (args) => <Gallery {...args}/>;

const Basic = Template.bind({});
Basic.args = {
    photos,
    withLightbox: true,
  }

export default GalleryStory;
export {Basic as Galery};