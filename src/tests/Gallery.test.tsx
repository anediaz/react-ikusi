import React from 'react';
import {
  render, fireEvent, screen,
} from '@testing-library/react';
import { Basic, NoLightbox } from '../stories/Gallery.stories';
import { BasicArgs, NoLightboxArgs } from '../stories/fixtures';

test('loads and displays Gallery', async () => {
  // Arrange
  render(<Basic {...BasicArgs} />);

  // Assert: show loader
  const loader = await screen.findByRole('progressbar');
  expect(loader).toBeInTheDocument();

  // Assert: images appear
  const items = await screen.findAllByAltText((content) => content.startsWith('picture with id'));
  expect(items).toHaveLength(BasicArgs.photos.length);

  // Assert: loading spinner no longer exists
  const hiddenLoadingSpinner = screen.queryByAltText('progressbar');
  expect(hiddenLoadingSpinner).toBeNull();
});

test('displays a lightbox when clicking on a picture', async () => {
  // Arrange: click on a picture
  render(<Basic {...BasicArgs} />);
  const picture = screen.getByAltText('picture with id 3');
  fireEvent.click(picture);

  // Assert: lightbox appears after click event
  const lightbox = await screen.findByAltText('lightbox of the selected picture with id 3');
  expect(lightbox).toBeInTheDocument();

  // Assert: lightbox dissapears after ESC enter
  fireEvent.keyDown(lightbox, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  });
  const closedLightbox = screen.queryByAltText('lightbox of the selected picture with id 3');
  expect(closedLightbox).toBeNull();
});

test('lightbox contains navigation and close buttons', async () => {
  // Arrange: Click on the first picture and display lightbox (for a 2 photos Gallery)
  const [photo1, photo2] = BasicArgs.photos;
  render(<Basic photos={[photo1, photo2]} />);
  const picture = screen.getByAltText('picture with id 1');
  fireEvent.click(picture);

  // Assert: show loader
  const loaders = screen.getAllByRole('progressbar');
  const loader = loaders.find((i) => i.getAttribute('aria-valuetext') === 'loader-inline');
  expect(loader).toBeInTheDocument();

  // Assert: only next and close buttons appear (as it is the first picture)
  expect(screen.getByTestId('close-button')).toBeInTheDocument();
  expect(screen.getByTestId('next-button')).toHaveClass('lightbox_content_button-container--is-enabled');
  expect(screen.getByTestId('prev-button')).not.toHaveClass('lightbox_content_button-container--is-enabled');

  // Arrange: click on 'next' button
  const lightbox = await screen.findByAltText('lightbox of the selected picture with id 1');
  fireEvent.keyDown(lightbox, {
    key: 'Right',
    code: 'Right',
    keyCode: 39,
    charCode: 39,
  });

  // Assert: next picture appears and the current is not present any more
  const newLightbox = await screen.findByAltText('lightbox of the selected picture with id 2');
  expect(screen.queryByAltText('lightbox of the selected picture with id 1')).toBeNull();
  // Assert: prev & close appear. next is not present (as it is the last picture)
  expect(screen.getByTestId('close-button')).toBeInTheDocument();
  expect(screen.getByTestId('prev-button')).toHaveClass('lightbox_content_button-container--is-enabled');
  expect(screen.getByTestId('next-button')).not.toHaveClass('lightbox_content_button-container--is-enabled');

  // Arrange: click on 'prev' button
  fireEvent.keyDown(newLightbox, {
    key: 'Left',
    code: 'Left',
    keyCode: 37,
    charCode: 37,
  });
  // Assert: previous picture appears and the current is not present any more
  await screen.findByAltText('lightbox of the selected picture with id 1');
  expect(screen.queryByAltText('lightbox of the selected picture with id 2')).toBeNull();
});

test('not display a lightbox if Gallery without lightbox', async () => {
  // Arrange: click on a picture
  render(<NoLightbox {...NoLightboxArgs} />);
  const picture = screen.getByAltText('picture with id 3');
  fireEvent.click(picture);

  // Arrange: the picture's lightbox is not displayed
  expect(screen.queryByAltText('lightbox of the selected picture with id 3')).toBeNull();
});
