import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: PostId,
  loader: async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      postId: params.postId,
    };
  },
  pendingComponent: () => <div className="">loading ...</div>,
});

function PostId() {
  const { postId } = Route.useLoaderData();
  console.log(postId);
  return <div>Hello {postId}!</div>;
}
