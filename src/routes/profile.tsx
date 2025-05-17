import { createFileRoute } from "@tanstack/react-router";
import AuthGuard from "../core/auth/AuthGuard";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  return (
    <AuthGuard>
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <p>Welcome back, user@example.com</p>
      </div>
    </AuthGuard>
  );
}
