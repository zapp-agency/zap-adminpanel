import { useForm } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { setSecureCookie } from '../utils/services/common/cookies';

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({
      value,
    }: {
      value: { email: string; password: string };
    }) => {
      await new Promise((resolve) =>
        setTimeout(() => {
          setSecureCookie("user", value);
          resolve(undefined);
        }, 500)
      );
      console.log(value);
      navigate({ to: "/profile" });
    },
  });

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Sign In</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <label>
            Email
            <form.Field
              name="email"
              children={(field) => (
                <input
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                />
              )}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Password
            <form.Field
              name="password"
              children={(field) => (
                <input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                />
              )}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>
          Sign In
        </button>
      </form>
    </div>
  );
}
