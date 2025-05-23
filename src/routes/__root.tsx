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
      <Outlet />
    </React.Fragment>
  );
}
