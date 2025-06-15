import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/contexts/auth/useAuth.ts';
import { useEffect, useState } from 'react';

export const Route = createFileRoute({
  component: AuthenticatedLayoutComponent,
});

function AuthenticatedLayoutComponent() {
  const { isLoggedIn, signOut } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn().then((userLoggedIn) => {
      if (!userLoggedIn) {
        // Remove access token before navigating to login page
        signOut().then(() => navigate({ to: '/sign-in' }));
      } else {
        setLoading(false)
      }
    });
  }, [isLoggedIn, signOut, navigate, location.pathname]);

  if(isLoading) {
    return ""
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Outlet />
    </div>
  );
}
