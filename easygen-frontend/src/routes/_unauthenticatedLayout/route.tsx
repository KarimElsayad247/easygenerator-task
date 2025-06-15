import { Outlet } from '@tanstack/react-router';

export const Route = createFileRoute({
  component: UnauthenticatedLayoutComponent,
});

function UnauthenticatedLayoutComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <h1 className={'text-4xl text-center p-4'}>Welcome!</h1>
        <Outlet />
      </div>
    </div>
  );
}
