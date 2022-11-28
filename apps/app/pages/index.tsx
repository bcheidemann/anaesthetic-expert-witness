import { InferGetStaticPropsType } from 'next';
import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react'
import { css } from '@emotion/react';
import { colors } from '@aew/theme';
import { Divider } from '@mui/material';

export default function page(
  { footerSections }: InferGetStaticPropsType<typeof getStaticProps>
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
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main
        css={css`
          flex: 1;
        `}
      >
        <p>Duis do Lorem laboris ad excepteur exercitation elit ex sit nisi consequat consectetur. Consequat ullamco elit veniam occaecat id occaecat dolor ad sint laboris et velit. Nisi enim cupidatat cupidatat aliquip exercitation ad culpa voluptate officia amet. Adipisicing laborum est reprehenderit magna. Do nisi incididunt cillum ullamco esse dolore elit excepteur adipisicing in laboris sit deserunt consectetur. Ipsum amet ea laboris consectetur deserunt sit consequat est fugiat sunt voluptate.</p>

<p>Id laboris elit ipsum in commodo consectetur laboris minim. Amet fugiat nulla excepteur quis pariatur irure consectetur. Proident duis tempor tempor dolore duis sint aute aute ea ipsum.</p>

<p>Ad Lorem in adipisicing et id sit minim consectetur aliquip esse. Est eu reprehenderit ipsum cillum nisi exercitation veniam ea sit qui ad. Fugiat ea tempor esse excepteur dolor laborum sunt velit. Officia laboris labore eiusmod magna aute eu minim magna non laboris. Non qui esse commodo cupidatat nisi reprehenderit ut.</p>

<p>Ad in esse exercitation velit reprehenderit dolor eu proident sint sunt laboris nisi. Ipsum consectetur consequat sint incididunt nostrud elit. Aute adipisicing amet occaecat tempor sunt irure nulla officia proident aliqua culpa laboris irure laborum. Ut nisi officia non esse culpa Lorem sit officia aliqua laboris amet fugiat veniam.</p>

<p>Tempor duis nulla culpa amet tempor nisi tempor irure qui dolore mollit pariatur aliquip magna. Commodo irure officia Lorem qui aliqua. Ipsum nostrud in ea mollit cupidatat aliqua laboris laborum eu commodo nulla excepteur. Est enim occaecat culpa non ipsum. Velit sit excepteur duis tempor labore amet. Nisi sunt irure id commodo velit exercitation quis nisi. Ad Lorem mollit amet culpa duis.</p>

<p>Et deserunt velit id duis est. Lorem officia consectetur excepteur adipisicing do id irure mollit. Consequat magna aliquip velit proident Lorem laboris. Nulla minim eiusmod enim eiusmod id reprehenderit aute sit Lorem.</p>

<p>Veniam aliqua adipisicing laboris excepteur officia aute sit. Deserunt esse velit veniam quis. Magna ad reprehenderit ipsum cupidatat aute. Officia est ex aliquip fugiat eiusmod Lorem laborum id.</p>

<p>Dolore aliqua duis laboris aute. Ullamco voluptate duis irure eiusmod amet tempor cupidatat. Labore mollit veniam exercitation excepteur nostrud consequat enim est ea eiusmod. Eu qui ex ipsum in sunt irure voluptate ex ipsum duis ipsum est ad veniam. Ex duis velit officia elit cillum esse esse nulla. Labore ex laborum consequat quis cillum esse id eu in velit.</p>

<p>Irure anim voluptate in Lorem consectetur aute ea incididunt tempor. Irure pariatur ex ipsum est consequat qui dolore ad commodo nisi. Mollit laborum laboris esse esse irure ex. Pariatur laboris dolore aute enim eiusmod reprehenderit adipisicing anim aliqua ex exercitation cupidatat ad.</p>

<p>Velit non culpa incididunt ut non nostrud officia voluptate laboris minim eu proident id. Ea adipisicing dolor amet adipisicing minim proident nostrud Lorem consectetur non aliqua. Nostrud laboris esse in exercitation irure Lorem proident in. Culpa fugiat id sit consequat exercitation commodo officia anim. Amet velit aliqua dolor deserunt do cillum eiusmod sit ipsum eiusmod esse aliquip esse. Laboris enim incididunt consectetur pariatur eu in occaecat.</p>
      </main>
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
    </div>
  );
}

type FooterSection = {
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

const client = createClient({
  projectId: 'gvr7lqga',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: false
});

export async function getStaticProps() {
  const footerSections = (await client.fetch<FooterSection[]>(`*[_type == "footerSection"]`)).sort((a, b) => a.index - b.index);

  return {
    props: {
      footerSections
    }
  };
}
