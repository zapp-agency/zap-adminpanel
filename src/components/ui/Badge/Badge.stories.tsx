import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from '.';

const meta: Meta<typeof Badge> = {
  component: Badge,
  args: {
    variant: 'light',
    color: 'primary',
    size: 'md',
    badgeContent: '5',
  },
  argTypes: {
    badgeContent: {
      control: 'text',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'light'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'default', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const BadgeStory: Story = {
  render: (args) => (
    <Badge {...args}>
      <div className="bg-neutral-5 rounded-2 size-12"></div>
    </Badge>
  ),
};
