import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  React.useEffect(() => {
    const doc = document.documentElement;

    doc.className = 'max-md:dark';
  }, []);

  return (
    <React.Fragment>
      <div className="p-xs borders-xs ">سلام علیکم</div>
      <Outlet />
    </React.Fragment>
  );
}
