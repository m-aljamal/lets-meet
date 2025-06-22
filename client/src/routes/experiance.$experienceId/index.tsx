import { trpc } from "@/router";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/experiance/$experienceId/")({
  component: ExperiancePage,
  loader: async ({ params, context: { trpc, queryClient } }) => {
    await queryClient.prefetchQuery(
      trpc.experience.byId.queryOptions({
        id: params.experienceId,
      })
    );
  },
});

function ExperiancePage() {
  const { experienceId } = Route.useParams();
  const experience = useQuery(
    trpc.experience.byId.queryOptions({
      id: experienceId,
    })
  );
  return (
    <div>
      <h2 className="text-2xl font-bold">{experience.data?.title}</h2>
      <p className="mt-4">{experience.data?.content}</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        {/* Add comments component here */}
      </div>
    </div>
  );
}
