import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../Button';
import { useModalHandler } from './Modal.hook';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from './Modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
  args: {
    placement: 'bottom',
    radius: 'lg',
    backdrop: 'opaque',
    size: 'md',
    hasClose: true,
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'center'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full'],
    },
    hasClose: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const StoryModal: Story = {
  render: (args) => {
    const { isOpen, onClose, onOpen, onOpenChange } = useModalHandler();

    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          {...(args as Omit<React.ComponentProps<typeof Modal>, 'isOpen' | 'onOpenChange'>)}
        >
          <ModalContent>
            <>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                  officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                  deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Action</Button>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};
