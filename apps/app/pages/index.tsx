import { InferGetStaticPropsType } from 'next';

import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Layout } from '../components/layout';
import { Page } from '../components/page';

export default function page(
  { headerProps, pageProps, footerProps  }: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout
      headerProps={headerProps}
      pageProps={pageProps}
      footerProps={footerProps}
    />
  );
}

export async function getStaticProps() {
  const headerProps = await Header.getStaticProps();
  const pageProps = await Page.getStaticProps('/');
  const footerProps = await Footer.getStaticProps();

  return {
    props: {
      headerProps,
      pageProps,
      footerProps,
    }
  };
}
