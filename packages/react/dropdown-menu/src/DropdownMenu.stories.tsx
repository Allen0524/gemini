import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css, keyframes } from '../../../../stitches.config';
import * as DropdownMenu from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
};

export default meta;

const data = [
  { id: '0', value: 'item 0' },
  { id: '1', value: 'item 1' },
  { id: '2', value: 'item 2' },
  { id: '3', value: 'item 3' },
  { id: '4', value: 'item 4' },
];

export const Basic = () => {
  const [value, setValue] = React.useState('0');
  const text = data.find((item) => item.id === value)?.value;

  return (
    <DropdownMenu.Root
      value={value}
      onValueChange={(id) => {
        setValue(id);
      }}
    >
      <DropdownMenu.Trigger
        style={{
          border: 'none',
          outline: 'none',
          padding: '0px',
          // margin: '0px 0px 0px 200px',
          width: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <div
          style={{
            // width: '300px',
            width: '100%',
            border: '1px solid black',
          }}
        >
          {text}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={animatedContentClass()}>
          {data.map(({ id, value }) => {
            return (
              <DropdownMenu.Item key={id} id={id} style={{ cursor: 'pointer' }}>
                {value}
              </DropdownMenu.Item>
            );
          })}
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
  display: 'inline-block',
  boxSizing: 'border-box',
  maxHeight: '220px',
  // width: '300px',
  width: 'var(--gemini-dropdown-menu-anchor-width)',
  marginTop: '4px',
  overflowX: 'hidden',
  overflowY: 'auto',
  border: '1px solid red',

  '&[data-state="open"]': {
    animation: `${animateIn} 300ms ease forwards`,
  },
  '&[data-state="closed"]': {
    animation: `${animateOut} 300ms ease forwards`,
  },
});
