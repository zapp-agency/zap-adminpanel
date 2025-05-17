import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen p-4 container">
      <main>home</main>
    </div>
  );
}
