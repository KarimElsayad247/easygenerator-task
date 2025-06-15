import { useAuth } from '@/contexts/auth/useAuth.ts';

export const Route = createFileRoute({
  component: IndexComponent,
});

function IndexComponent() {
  const { user } = useAuth();

  return (
    <div className="p-2">
      <h1 className={"text-4xl"}>Welcome to the application.</h1>
      <p className={"text-lg"}>You are {user?.name}</p>
      <p>Your email is {user?.email}</p>
    </div>
  );
}
