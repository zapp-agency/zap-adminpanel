import { getSecureCookie } from '@/utils/services/common/cookies';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, type ReactNode } from 'react';

export default function AuthGuard({ children }: { children: ReactNode }): ReactNode | null {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(getSecureCookie('user'));

  useEffect(() => {
    if (!isLoggedIn) navigate({ to: '/login' });
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <>{children}</> : null;
}
