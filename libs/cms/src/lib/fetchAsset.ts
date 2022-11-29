import { getImageDetails, imageUrlBuilderFactory } from '@aew/cms-image-utils';

import { client } from "./client";
import { ImageAsset,RawImageAsset } from "./types";

export const imageUrlBuilder = imageUrlBuilderFactory(client);

export async function fetchImageAsset(id: string): Promise<ImageAsset | null> {
  const [ asset ] = await client.fetch<RawImageAsset[]>(`*[_type == "imageAsset" && id == "${id}"]`);

  if (!asset) {
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
