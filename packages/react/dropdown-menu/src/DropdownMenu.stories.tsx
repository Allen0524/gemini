import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css, keyframes } from '../../../../stitches.config';
import * as DropdownMenu from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
};

export default meta;

export const Basic = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>open menu</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={animatedContentClass()}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const animateIn = keyframes({
  from: { opacity: 0, maxHeight: '0' },
  to: { opacity: 1, maxHeight: '200px' },
});

const animateOut = keyframes({
  from: { opacity: 1, maxHeight: '200px' },
  to: { opacity: 0, maxHeight: '0' },
});

const animatedContentClass = css({
  boxSizing: 'border-box',
  maxHeight: '200px',
  marginTop: '4px',
  overflow: 'hidden',
  overflowY: 'scroll',
  border: '1px solid red',

  '&[data-state="open"]': {
    animation: `${animateIn} 300ms ease forwards`,
  },
  '&[data-state="closed"]': {
    animation: `${animateOut} 300ms ease forwards`,
  },
});
