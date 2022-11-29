import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

export type FooterSection = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  title: string;
  content: any;
  index: number;
  type: 'default' | 'smallPrint';
};

export type RawImageAsset = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  id: string;
  image: unknown;
  title: string;
};

export type ImageAsset = Omit<RawImageAsset, 'image'> & { image: ImageUrlBuilder };
