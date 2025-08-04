import type { Meta, StoryObj } from '@storybook/react-vite';
import InputText from '.';

const meta: Meta<typeof InputText> = {
  component: InputText,
  args: {
    variant: 'Primary',
    title: 'input text',
    icon: '+',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['Primary', 'Outside', 'Secondary'],
    },
    title: {
      control: 'text',
    },
    icon: {
      control: false,
    },
    unit: {
      control: 'text',
    },
    caption: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const Primary: Story = {
  render: (args) => <InputText {...args} />,
};
