import { render } from '@testing-library/react';
import React from 'react';

import Page from '../pages';

describe('Page - Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Page footerSections={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
