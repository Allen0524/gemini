import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
};

export default meta;
type Story = StoryObj<typeof meta>;

export function Primary() {
  return <Button.Root>123</Button.Root>;
}
