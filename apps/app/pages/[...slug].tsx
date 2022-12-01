import { client } from '@aew/cms';
import { Route } from '@aew/cms-types';
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';

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

export async function getStaticPaths(context: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const routes = await client.fetch<Pick<Route, 'path'>[]>(`*[_type == "route"]{ path }`);

  return {
    paths: routes
      .filter((route) => route.path.current !== '/')
      .map((route) => ({
        params: {
          slug: route.path.current.replace(/^\//, '').split('/'),
        },
      })),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (!context.params?.slug) {
    throw new Error('Missing slug');
  }

  const slug = Array.isArray(context.params.slug)
    ? context.params.slug.join('/')
    : context.params.slug;

  const headerProps = await Header.getStaticProps();
  const pageProps = await Page.getStaticProps(`/${slug}`);
  const footerProps = await Footer.getStaticProps();

  return {
    props: {
      headerProps,
      pageProps,
      footerProps,
    }
  };
}
