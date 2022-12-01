import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

function imageRefToDetails(imageRef: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, id, resString, format] = imageRef.split('-');
  const [width, height] = resString.split('x').map(Number);

  return {
    id,
    width,
    height,
    format,
  }
}

export type ImageDetails = ReturnType<typeof imageRefToDetails>;

export function getImageDetails(builder: ImageUrlBuilder) {
  const source = builder.options.source;

  if (!source) {
    return null;
  }

  if (typeof source === 'string') {
    throw new Error('Not implemented');
  }

  if ('_ref' in source) {
    return imageRefToDetails(source._ref);
  }

  if ('asset' in source) {
    const { _ref } = source.asset;

    if (typeof _ref === 'string') {
      return imageRefToDetails(_ref);
    }
  }

  throw new Error('Not implemented');
}
