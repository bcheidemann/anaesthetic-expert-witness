import { client } from '@aew/cms';
import { imageUrlBuilder } from '@aew/cms';
import { getImageDetails } from '@aew/cms-image-utils';
import { Route } from '@aew/cms-types';
import { css } from '@emotion/react';
import { PortableText } from '@portabletext/react';

type Props = Awaited<ReturnType<typeof Page.getStaticProps>>;

export function Page({ route }: Props) {
  if (!route) {
    return null;
  }

  return (
    <main
      css={css`
        p {
          line-height: 2;
        }
      `}
    >
      {route.layout.map((layout) => {
        switch (layout._type) {
          case 'banner':
            {
              const {
                _key,
                content,
                backgroundImage,
                css: cssText,
              } = layout;

              return (
                <section
                  key={_key}
                  css={css`
                    position: relative;

                    padding: 40px 180px;

                    @media (max-width: 768px) {
                      padding: 20px 40px;
                    }

                    .content {
                      text-align: center;
                      font-size: 1.5rem;

                      display: flex;
                      justify-content: center;
                      flex-wrap: wrap;
                      column-gap: 60px;
                      row-gap: 10px;

                      max-width: 1200px;
                      margin: 0 auto;
                    }

                    &:before {
                      content: '';

                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;

                      background: url(${imageUrlBuilder.image(backgroundImage.image).url()});
                      background-size: cover;
                      background-position: center;
                      background-attachment: ${backgroundImage.paralax ? 'fixed' : 'unset'};

                      z-index: -1;
                    }

                    ${cssText}
                  `}
                >
                  <div className="content">
                    <PortableText value={content} />
                  </div>
                </section>
              );
            }
          case 'columns':
            {
              const {
                _key,
                columns,
                css: cssText,
              } = layout;

              return (
                <section
                  key={_key}
                  css={css`
                    padding: 60px 40px;

                    .content {
                      display: flex;
                      justify-content: center;
                      flex-wrap: wrap;
                      column-gap: 60px;
                      row-gap: 10px;

                      max-width: 1200px;
                      margin: 0 auto;
                    }

                    ${cssText}
                  `}
                >
                  <div className="content">
                    {columns.map((column) => {
                      switch (column._type) {
                        case 'columnContent':
                          {
                            return (
                              <div
                                key={column._key}
                                css={css`
                                  flex: 1;
                                  min-width: min(300px, 100%);

                                  ${column.content.css}
                                `}
                              >
                                <PortableText value={column.content.content} />
                              </div>
                            );
                          }
                        case 'columnImage':
                          {
                            const image = imageUrlBuilder.image(column.image.image);
                            const {
                              width,
                              height,
                            } = getImageDetails(image);

                            return (
                              <img
                                key={column._key}
                                src={image.url()}
                                alt={column.image.description}
                                width={width}
                                height={height}
                                css={css`
                                  height: auto;
                                  aspect-ratio: ${width} / ${height};

                                  object-fit: cover;
                                  object-position: center;

                                  ${column.image.css}
                                `}
                              />
                            );
                          }
                        default:
                          return null;
                      }
                    })}
                  </div>
                </section>
              );
            }
          case 'content':
            {
              const {
                _key,
                content,
                css: cssText,
              } = layout;

              type ContentType = (typeof content)[number] & { _type: string };
              const PortableTextWithImage = PortableText<ContentType>;

              return (
                <section
                  key={_key}
                  css={css`
                    padding: 40px 180px;

                    .content {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      text-align: center;
  
                      max-width: 1200px;
                      margin: 0 auto;
                    }

                    @media (max-width: 768px) {
                      padding: 20px 40px;
                    }

                    &:before {
                      content: '';

                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;

                      z-index: -1;
                    }

                    ${cssText}
                  `}
                >
                  <div className="content">
                    <PortableTextWithImage
                      value={content as ContentType[]}
                      components={{
                        types: {
                          image: (props) => {
                            const image = imageUrlBuilder.image(props.value.image.asset);
                            const {
                              width,
                              height,
                            } = getImageDetails(image);

                            return (
                              <img
                                src={image.url()}
                                alt={props.value.description}
                                css={css`
                                  ${props.value.css}
                                `}
                                width={width}
                                height={height}
                              />
                            );
                          },
                        }
                      }}
                    />
                  </div>
                </section>
              );
            }
          default:
            return null;
        }
      })}
    </main>
  )
}

Page.getStaticProps = async function(slug: string) {
  const route = await client.fetch<Route>(`*[_type == "route" && path.current == "${slug}"][0]`);

  return {
    route,
  }
}
