import { QueryClientProvider, useInfiniteQuery } from "@tanstack/react-query";
import { queryClient, trpc } from "./utils/trpc";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/MoodeToggle";
import InfiniteScroll from "./components/InfinitScroll";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ModeToggle />
          <Index />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

function Index() {
  const experiences = useInfiniteQuery(
    trpc.experience.feed.infiniteQueryOptions(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )
  );

  return (
    <InfiniteScroll
      onLoadMore={experiences.fetchNextPage}
      hasMore={experiences.hasNextPage}
      loading={experiences.isFetchingNextPage}
      endMessage={
        <div className="text-center py-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <p className="text-xl font-semibold">All caught up!</p>
          <p className="text-sm text-muted-foreground mt-2">
            You've viewed all available items
          </p>
        </div>
      }
    >
      <ExperienceList
        experiences={
          experiences.data?.pages.flatMap((page) => page.experiences) ?? []
        }
      />
    </InfiniteScroll>
  );
}

function ExperienceList({ experiences }: { experiences: any[] }) {
  return (
    <div>
      {experiences.map((experience) => (
        <div key={experience.id} className="border p-25">
          {experience.title}
        </div>
      ))}
    </div>
  );
}
