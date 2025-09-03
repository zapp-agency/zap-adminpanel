import type { Meta, StoryObj } from '@storybook/react-vite';
import InputText from '.';

const meta: Meta<typeof InputText> = {
  component: InputText,
  args: {
    variant: 'solid',
    title: 'input text',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'light'],
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
