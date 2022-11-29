import { fetchImageAsset } from '@aew/cms';

type Props = Awaited<ReturnType<typeof Header.getStaticProps>>;

export function Header({ logo }: Props) {
  return (
    <header>
      <img {...logo} />
    </header>
  )
}

Header.getStaticProps = async function() {
  const imageHeight = 164;
  const logoAsset = await fetchImageAsset('aew-logo');

  if (!logoAsset) {
    return {
      logo: {
        alt: logoAsset.title,
        src: '',
        height: `${imageHeight}px`,
        width: `${imageHeight}px`,
      }
    }
  }

  const aspectRatio = logoAsset.image.details.width / logoAsset.image.details.height;

  return {
    logo: {
      alt: logoAsset.title,
      src: logoAsset.image.builder.height(164).url(),
      height: `${imageHeight}px`,
      width: `${Math.round(aspectRatio * imageHeight)}px`
    }
  };
}
