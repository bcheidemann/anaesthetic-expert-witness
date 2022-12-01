import { ImageDetails } from '@aew/cms-image-utils';
import { Image } from '@aew/cms-types';
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

export type ImageAsset = Omit<Image, 'image'> & {
  image: {
    builder: ImageUrlBuilder;
    details: ImageDetails;
  }
};
