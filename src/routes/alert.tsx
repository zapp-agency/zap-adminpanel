import Alert from '@/components/ui/Alert';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/alert')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      Hello "/alert"! <Alert title="this is toast" subtitle="this is subtitle for the toast" />{' '}
    </div>
  );
}
