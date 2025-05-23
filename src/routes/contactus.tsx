import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contactus')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="~mt-60/15">Hello "/contactus"!</div>;
}
