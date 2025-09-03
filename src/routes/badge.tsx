import Badge from '@/components/ui/Badge';
import { createFileRoute } from '@tanstack/react-router';
import { Home01Icon } from 'hugeicons-react';

export const Route = createFileRoute('/badge')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="gap-2xl flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-2xl">Badge</h1>
      <Badge
        color={'success'}
        badgeContent={
          <div className="flex items-center justify-center gap-2">
            <Home01Icon width={16} />
            HOME
          </div>
        }
      >
        <div className="bg-neutral-5 rounded-2 size-12"></div>
      </Badge>
    </div>
  );
}
