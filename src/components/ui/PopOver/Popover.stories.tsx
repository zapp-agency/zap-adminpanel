import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../Button';
import { PopOver, PopoverContent, PopoverTrigger } from './Popover';

const meta: Meta<typeof PopoverContent> = {
  component: PopoverContent,
  args: {
    placement: 'bottom',
    radius: 'lg',
    className: '',
    style: {},
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top-start',
        'top',
        'top-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
        'right-start',
        'right',
        'right-end',
      ],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof PopoverContent>;

export const Primary: Story = {
  render: (args) => (
    <div className="flex h-screen w-full items-center justify-center">
      <PopOver>
        <PopoverTrigger>
          <Button>Click Me</Button>
        </PopoverTrigger>
        <PopoverContent {...args}>
          <div className="gap-sm flex flex-col">
            <p className="text-size-16 font-bold text-black">title!</p>
            <p className="text-content-gray text-size-14">this is popover content</p>
          </div>
        </PopoverContent>
      </PopOver>
    </div>
  ),
};
