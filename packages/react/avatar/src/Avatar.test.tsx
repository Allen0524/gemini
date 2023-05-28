import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import * as Avatar from './Avatar';

const IMAGE_ALT_TEXT = 'tested iamge';
const FALLBACK_TEXT = 'fallback text';

describe('Avatar with fallback', () => {
  it('should have no accessibility violations', async () => {
    let rendered: RenderResult;

    rendered = render(
      <Avatar.Root>
        <Avatar.Fallback>404</Avatar.Fallback>
      </Avatar.Root>
    );

    expect(await axe(rendered.container)).toHaveNoViolations();
  });
});

describe('Basic functionality', () => {
  let rendered: RenderResult;

  beforeAll(() => {
    (window.Image as any) = class MockImage {
      onload: () => void = () => {};
      src = '';
      constructor() {
        setTimeout(() => {
          this.onload();
        }, 300);
        return this;
      }
    };
  });

  beforeEach(() => {
    rendered = render(
      <Avatar.Root>
        <Avatar.Image alt={IMAGE_ALT_TEXT} src="/test.jpg"></Avatar.Image>
        <Avatar.Fallback>{FALLBACK_TEXT}</Avatar.Fallback>
      </Avatar.Root>
    );
  });

  it('should render the fallback image initially', () => {
    const fallbackElm = rendered.queryByText(FALLBACK_TEXT);
    expect(fallbackElm).toBeInTheDocument();
  });

  it('should not render the image initially', () => {
    const imageElm = rendered.queryByRole('img');
    expect(imageElm).not.toBeInTheDocument();
  });

  it('should render the image after it has loaded', async () => {
    const imageElm = await rendered.findByRole('img');
    expect(imageElm).toBeInTheDocument();
  });

  it('should have and alt text on image', async () => {
    const imageElm = await rendered.findByAltText(IMAGE_ALT_TEXT);
    expect(imageElm).toBeInTheDocument();
  });
});
