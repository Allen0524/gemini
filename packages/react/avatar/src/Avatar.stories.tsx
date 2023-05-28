import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
};

export default meta;
type Story = StoryObj<typeof meta>;
// export const Controlled = () => {
//   return <div>avatar test</div>;
// };

export function Primary() {
  return (
    <Avatar.Root>
      <Avatar.Image src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"></Avatar.Image>
      <Avatar.Fallback>404</Avatar.Fallback>
    </Avatar.Root>
  );
}
