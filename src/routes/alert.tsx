import Toaster from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import { useToast } from '@/core/hooks/useToaster';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/alert')({
  component: RouteComponent,
});

function RouteComponent() {
  const { toast } = useToast();
  return (
    <div className="flex h-screen items-center justify-center">
      <Toaster position={'top-right'} />
      <Button
        onClick={() => {
          toast({ title: 'hello', subtitle: 'hello', color: 'danger' });
        }}
      >
        Show
      </Button>
    </div>
  );
}
