import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '.';

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: 'Click me',
    iconOnly: false,
    variant: 'default',
    color: 'primary',
    size: 'md',
    startContent: '',
    endContent: '',
    radius: undefined,
    disabled:false,
  },
  argTypes: {
    children: {
      control: 'text',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large', 'full'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'neutral', 'success', 'warning', 'error'],
    },
    iconOnly: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    startContent: { control: false },
    endContent: { control: false },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: (args) => <Button {...args} />,
};
