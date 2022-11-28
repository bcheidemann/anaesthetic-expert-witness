import { css } from '@emotion/react';
import { PortableText } from '@portabletext/react';
import { colors } from '@aew/theme';
import { Divider } from '@mui/material';
import { client, FooterSection } from 'libs/cms/src';

type Props = Awaited<ReturnType<typeof Footer.getStaticProps>>;

export function Footer({ footerSections }: Props) {
  return (
    <footer
      css={css`
        height: fit-content;

        background: ${colors.blue.base};
        color: ${colors.text.white};

        a {
          color: ${colors.text.white};
          font-weight: 700;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      `}
    >
      <div
        css={css`
          padding: 30px;

          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
        `}
      >
        {
          footerSections
            .filter(({ type }) => type === 'default')
            .map((section) => (
              <section
                key={section._id}
                css={css`
                  max-width: 400px;
                  width: fit-content;
                  height: fit-content;

                  padding: 10px 30px;

                  border: 1px solid ${colors.blue[100]};
                  border-radius: 30px;

                  transition: 0.2s background;
                  
                  &:hover {
                    background: ${colors.blue[100]};
                    border: 1px solid ${colors.blue[300]};
                  }
                `}
              >
                <h2>{section.title}</h2>
                <PortableText
                  value={section.content}
                />
              </section>
            ))
        }
      </div>
      <Divider sx={{ marginInline: 'auto', background: colors.blue[300], height: 1 }} />
      <div
        css={css`
          padding: 15px 30px;

          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 0 30px;

          background: ${colors.blue[100]};
        `}
      >
        {
          footerSections
            .filter(({ type }) => type === 'smallPrint')
            .map((section) => (
              <section
                key={section._id}
                css={css`
                  width: fit-content;
                  height: fit-content;
                `}
              >
                <PortableText
                  value={section.content}
                />
              </section>
            ))
        }
      </div>
    </footer>
  )
}

Footer.getStaticProps = async function() {
  return {
    footerSections: (await client.fetch<FooterSection[]>(`*[_type == "footerSection"]`)).sort((a, b) => a.index - b.index),
  };
}
