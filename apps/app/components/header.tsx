import { css } from '@emotion/react';
import { PortableText } from '@portabletext/react';
import { colors } from '@aew/theme';
import { Divider } from '@mui/material';
import { fetchImageAsset } from 'libs/cms/src';

type Props = Awaited<ReturnType<typeof Header.getStaticProps>>;

export function Header({ logo }: Props) {
  return (
    <header>
      <img {...logo} />
    </header>
  )
}

Header.getStaticProps = async function() {
  const logoAsset = await fetchImageAsset('aew-logo');

  if (!logoAsset) {
    return {
      logo: {
        alt: logoAsset.title,
        src: ''
      }
    }
  }

  return {
    logo: {
      alt: logoAsset.title,
      src: logoAsset.image.height(164).url(),
      height: '164px',
    }
  };
}
