import { SignupForm } from '@/components/SignupForm.tsx';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignupForm />;
}
