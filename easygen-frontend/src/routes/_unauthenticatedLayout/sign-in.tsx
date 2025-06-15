import { LoginForm } from '@/components/LoginForm.tsx';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
