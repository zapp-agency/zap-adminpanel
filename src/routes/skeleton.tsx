import Skeleton from '@/components/ui/Skeleton';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/skeleton')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="p-2xl gap-md rounded-4 flex w-[480px] flex-col items-center justify-center">
        <h3>Skeleton</h3>
        <Skeleton />
      </div>
    </div>
  );
}
