import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { getImageDetails } from './getImageDetails';

describe('getImageDetails', () => {
  it('should return null if no source is provided', () => {
    const builder = {
      options: {},
    } as ImageUrlBuilder;

    const details = getImageDetails(builder);

    expect(details).toBeNull();
  });

  it('should return the image details if the source is a sanity image object', () => {
    const builder = {
      options: {
        source: {
          asset: {
            _ref: 'image-1234-200x300-jpg',
          }
        },
      },
    } as ImageUrlBuilder;

    const details = getImageDetails(builder);

    expect(details).toEqual({
      id: '1234',
      width: 200,
      height: 300,
      format: 'jpg',
    });
  })
});
