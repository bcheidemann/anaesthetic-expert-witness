import { client, fetchImageAsset } from '@aew/cms';
import { NavBarItem as CmsNavBarItem, Route } from '@aew/cms-types';
import { colors } from '@aew/theme';
import { css } from '@emotion/react';
import { Paper } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = Awaited<ReturnType<typeof Header.getStaticProps>>;

export function Header({ logo, navBarItems }: Props) {
  const { asPath } = useRouter();

  return (
    <Paper
      component="header"
      elevation={4}
      css={css`
        background-color: ${colors.blue[900]};

        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;

        border-radius: 0 0 16px 16px;
        margin-bottom: -16px;

        padding: 16px;

        @media (max-width: 960px) {
          justify-content: center;
        }
      `}
    >
      <img
        css={css`
          @media (max-width: 960px) {
            display: none;
          }
        `}
        {...logo}
      />
      <nav>
        <ul
          css={css`
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 16px;
            padding: 0;
            margin: 0;

            li {
              display: block;
              float: left;

              list-style: none;
              padding: 8px 24px;
              border-radius: 8px;

              text-align: center;
              font-weight: 600;
              font-size: 1.25rem;

              background: ${colors.blue[900]};
              color: ${colors.text.black};

              &:hover {
                background: ${colors.blue.base};
                color: ${colors.text.white};
              }

              &.active {
                background: ${colors.blue.base};
                color: ${colors.text.white};
              }
            }
          `}
        >
          {navBarItems.map((navBarItem) => {
            if (!navBarItem.route?.path) {
              return null;
            }

            const to = navBarItem.route.path.current;

            return (
              <Link
                key={navBarItem._id}
                href={to}
              >
                <li
                  className={asPath === to ? 'active' : ''}
                >
                  {navBarItem.title}
                </li>
              </Link>
            )
          })}
        </ul>
      </nav>
    </Paper>
  )
}

Header.getStaticProps = async function () {
  const imageHeight = 46;
  const logoAsset = await fetchImageAsset('aew-logo');
  type NavBarItem = Pick<CmsNavBarItem, 'title' | '_id'> & { route: Pick<Route, 'path'> };
  const navBarItems = await client.fetch<NavBarItem[]>(`
    *[_type == "navBarItem"] | order(index asc) {
      _id,
      title,
      route -> {
        path
      }
    }
  `);

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
    },
    navBarItems,
  };
}
