import Button from '@/components/ui/Button';
import Toaster from '@/components/ui/Toaster';
import { toast } from '@/utils/Toast/toast.util';
import { createFileRoute } from '@tanstack/react-router';
import { CheckmarkCircle01Icon } from 'hugeicons-react';

export const Route = createFileRoute('/alert')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Toaster position={'bottom-right'} />
      <Button
        onClick={() => {
          toast({
            title: 'this is toaster',
            subtitle: 'this is toaster subtitle ',
            color: 'danger',
            icon: <CheckmarkCircle01Icon />,
          });
        }}
      >
        Toast
      </Button>
    </div>
  );
}
