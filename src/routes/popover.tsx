import Button from '@/components/ui/Button';
import PopOver from '@/components/ui/PopOver';
import { PopoverContent, PopoverTrigger } from '@/components/ui/PopOver/Popover';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/popover')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <PopOver>
        <PopoverTrigger>
          <Button>Click Me</Button>
        </PopoverTrigger>
        <PopoverContent placement="bottom-start" radius={'lg'}>
          <div className="gap-sm flex flex-col">
            <p className="text-size-16 font-bold text-black">title!</p>
            <p className="text-content-gray text-size-14">this is popover content</p>
          </div>
        </PopoverContent>
      </PopOver>
    </div>
  );
}
