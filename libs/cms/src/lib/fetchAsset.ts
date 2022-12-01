import { getImageDetails } from '@aew/cms-image-utils';
import { Image } from "@aew/cms-types";

import { client } from "./client";
import { imageUrlBuilder } from './imageBuilder';
import { ImageAsset } from "./types";

export async function fetchImageAsset(id: string): Promise<ImageAsset | null> {
  const [ asset ] = await client.fetch<Image[]>(`*[_type == "imageAsset" && id == "${id}"]`);

  if (!asset?.image) {
    return null;
  }

  return {
    ...asset,
    image: {
      builder: imageUrlBuilder.image(asset.image),
      details: getImageDetails(imageUrlBuilder.image(asset.image)),
    },
  };
}
