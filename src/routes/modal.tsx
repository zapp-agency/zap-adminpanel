import Button from '@/components/ui/Button';
import Modal, {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/Modal/Modal';
import { useModalHandler } from '@/components/ui/Modal/Modal.hook';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/modal')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isOpen, onClose, onOpen, onOpenChange } = useModalHandler();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={'center'}>
        <ModalContent>
          <>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalBody>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                quam.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                quam.
              </p>
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
}
