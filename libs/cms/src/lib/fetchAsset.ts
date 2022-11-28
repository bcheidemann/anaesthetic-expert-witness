import { client } from "./client";
import { ImageAsset } from "./types";

export async function fetchImageAsset(id: string): Promise<ImageAsset | null> {
  const [ asset ] = await client.fetch<ImageAsset[]>('*[_type == "imageAsset" && id == "aew-logo"]');

  return asset || null;
}

export function imageAssetToImageUrl(asset: ImageAsset): string {
  const ref = asset.image.asset._ref;

  const id = ref.replace(/-[a-z]+$/, '').replace(/^image-/, '');
  const extension = ref.split('-').pop();

  return `https://cdn.sanity.io/images/gvr7lqga/production/${id}.${extension}`;
}
