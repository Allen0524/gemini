import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from '../../../../stitches.config';
import * as Checkbox from '../src/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
      <Checkbox.Indicator className={indicatorClass()}>
        {checked ? String.fromCharCode(10003) : ''}
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
};

export const UnControlled = () => {
  const defaultchecked = true;

  return (
    <>
      <button
        onClick={(event) => {
          const elm = document.getElementById('checkbox-test1');
          const buttonElm = event.currentTarget;

          buttonElm.innerText = `get current check state: ${elm?.dataset.state || defaultchecked}`;
        }}
      >
        get current check state: {defaultchecked ? 'checked' : 'unChecked'}
      </button>
      <Checkbox.Root
        id="checkbox-test1"
        aria-label="check something"
        defaultChecked={defaultchecked}
      >
        <Checkbox.Indicator className={indicatorUnControlledClass()} />
      </Checkbox.Root>
    </>
  );
};

const indicatorClass = css({
  display: 'block',
  width: 20,
  height: 20,
});

const indicatorUnControlledClass = css({
  display: 'block',
  width: 20,
  height: 20,

  '&[data-state="checked"]': {
    backgroundColor: 'green',
  },

  '&[data-state="unChecked"]': {
    backgroundColor: 'gray',
  },
});
