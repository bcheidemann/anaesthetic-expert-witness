import { client } from '@aew/cms';
import { FooterSection, Route } from '@aew/cms-types';
import { css } from '@emotion/react';
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ComponentProps } from 'react';

import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Page } from '../components/page';

export function Layout(
  { footerProps, pageProps, headerProps }: {
    headerProps: ComponentProps<typeof Header>,
    pageProps: ComponentProps<typeof Page>,
    footerProps: ComponentProps<typeof Footer>,
  }
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