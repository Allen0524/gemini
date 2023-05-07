import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof meta>;
// export const Controlled = () => {
//   return <div>avatar test</div>;
// };

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
