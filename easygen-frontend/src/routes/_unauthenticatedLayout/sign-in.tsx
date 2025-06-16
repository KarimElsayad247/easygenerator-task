import { LoginForm } from '@/components/LoginForm.tsx';

type SignInPageParams = {
  newSignUp?: number;
};

export const Route = createFileRoute({
  component: RouteComponent,
  validateSearch: (_search: Record<string, unknown>): SignInPageParams => {
    return {};
  },
});

function RouteComponent() {
  return <LoginForm />;
}
