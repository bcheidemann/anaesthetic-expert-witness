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

export type ImageAsset = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  id: string;
  image: {
    _type: string;
    asset: {
      _ref: `image-${string}-${string}`,
      _type: 'reference'
    }
  };
  title: string;
};
