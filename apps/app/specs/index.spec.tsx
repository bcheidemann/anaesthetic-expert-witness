import { render } from '@testing-library/react';
import React from 'react';

import Page from '../pages/index';

describe('Page - Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Page animals={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
