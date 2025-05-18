import AuthGuard from '@/core/auth/AuthGuard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  component: Profile,
});

function Profile() {
  return (
    <AuthGuard>
      <div className="mx-auto mt-10 max-w-md">
        <h2 className="mb-4 text-2xl font-semibold">User Profile</h2>
        <p>Welcome back, user@example.com</p>
      </div>
    </AuthGuard>
  );
}
