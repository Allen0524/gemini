import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
// import { Toggle } from '@allen0318563/react-toggle';
import { Toggle } from '../src/Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
};

export default meta;
type Story = StoryObj<typeof meta>;

// export const Primary: Story = {
//   args: {
//     pressed: false,
//     defaultPressed: false,
//   },
// };

export const Controlled = () => {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Toggle pressed={pressed} onPressedChange={setPressed}>
      {pressed ? 'on' : 'off'}
    </Toggle>
  );
};

export const UnControlled = () => {
  return <Toggle id="test1" aria-label="Toogle something" defaultPressed={false}></Toggle>;
};
