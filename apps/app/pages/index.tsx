import { css } from '@emotion/react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Page } from '../components/page';

export default function page(
  { footerProps, pageProps, headerProps }: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <div
      css={css`
        min-height: 100vh; /* Support browsers which don't support dynamic viewport height */
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
      `}
    >
      <Header {...headerProps} />
      <main
        css={css`
          flex: 1;
        `}
      >
        <Page {...pageProps} />
      </main>
      <Footer {...footerProps} />
    </div>
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
