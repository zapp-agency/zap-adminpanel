import Button from '@/components/ui/Button';
import { toast } from '@/utils/Toast/toast.util';
import { createFileRoute } from '@tanstack/react-router';
import { CheckmarkCircle01Icon } from 'hugeicons-react';

export const Route = createFileRoute('/alert')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button
        onClick={() => {
          toast({
            title: 'hello',
            subtitle: 'hello',
            color: 'danger',
            icon: <CheckmarkCircle01Icon />,
          });
        }}
      >
        Show
      </Button>
    </div>
  );
}
