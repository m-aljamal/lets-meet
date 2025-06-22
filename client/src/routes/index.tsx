import InfiniteScroll from "@/components/InfinitScroll";
import { trpc } from "@/router";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async ({ context: { trpc, queryClient } }) => {
    await queryClient.prefetchInfiniteQuery(
      trpc.experience.feed.infiniteQueryOptions({})
    );
  },
});

function Index() {
  const experiencesQuery = useSuspenseInfiniteQuery(
    trpc.experience.feed.infiniteQueryOptions(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )
  );

  return (
    <InfiniteScroll
      onLoadMore={experiencesQuery.fetchNextPage}
      hasMore={experiencesQuery.hasNextPage}
      loading={experiencesQuery.isFetchingNextPage}
    >
      <ExperienceList
        experiences={experiencesQuery.data.pages.flatMap(
          (page) => page.experiences
        )}
      />
    </InfiniteScroll>
  );
}

function ExperienceList({ experiences }: { experiences: any[] }) {
  return (
    <div>
      {experiences.map((experience) => (
        <div key={experience.id} className="border p-25">
          <Link
            to={`/experiance/$experienceId`}
            params={{ experienceId: experience.id }}
          >
            {experience.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
