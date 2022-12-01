import { render } from '@testing-library/react';
import React from 'react';

import Page from '../pages';

describe('Page - Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Page
        footerProps={{
          footerSections: [],
        }}
        headerProps={{
          logo: {
            alt: 'Alt Text',
            height: 100,
            width: 100,
            src: 'https://via.placeholder.com/100',
          }
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
