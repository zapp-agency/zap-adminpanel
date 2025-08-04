import Button from '@/components/ui/Button';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-xs borders-xs grid h-screen place-content-center">
      <Button variant="ghost" color="error" iconOnly size="md">
        تایید
      </Button>
    </div>
  );
}
