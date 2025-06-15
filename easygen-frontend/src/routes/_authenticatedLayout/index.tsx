import { useAuth } from '@/contexts/auth/useAuth.ts';
import { Button } from '@/components/ui/Button.tsx';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute({
  component: IndexComponent,
});

function IndexComponent() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut();
    navigate({ to: '/sign-in' });
  };

  return (
    <div className="p-2">
      <h1 className={'text-4xl'}>Welcome to the application.</h1>
      <p className={'text-lg mt-4'}>
        You are <span className={'font-bold'}>{user?.name}</span>
      </p>
      <p className={'mt-2'}>
        Your email is <span className={'font-bold'}>{user?.email}</span>
      </p>
      <Button
        className={'mt-8 cursor-pointer'}
        variant={'default'}
        onClick={logout}
      >
        Log out
      </Button>
    </div>
  );
}
