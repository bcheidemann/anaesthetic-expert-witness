import imageUrlBuilderFactory from '@sanity/image-url';
import { client } from "./client";
import { RawImageAsset, ImageAsset } from "./types";

export const imageUrlBuilder = imageUrlBuilderFactory(client);

export async function fetchImageAsset(id: string): Promise<ImageAsset | null> {
  const [ asset ] = await client.fetch<RawImageAsset[]>(`*[_type == "imageAsset" && id == "${id}"]`);

  if (!asset) {
    return null;
  }

  return {
    ...asset,
    image: imageUrlBuilder.image(asset.image),
  };
}
