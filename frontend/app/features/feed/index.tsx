import { useInfiniteQuery } from "@tanstack/react-query";
import { useTRPC } from "trpc/react";
import { EventCard } from "./EventCard";
import InfiniteScroll from "~/components/InfinitScroll";
import type { ExperienceForFeed } from "./types";

export default function Feed() {
  const trpc = useTRPC();
  const experiences = useInfiniteQuery(
    trpc.experience.feed.infiniteQueryOptions(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
        {
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Create Event
          </button>
        }
      </div>
      <InfiniteScroll
        onLoadMore={experiences.fetchNextPage}
        hasMore={experiences.hasNextPage}
        loading={experiences.isFetchingNextPage}
      >
        <div>
          <EventList
            events={
              experiences.data?.pages.flatMap((page) => page.experiences) ?? []
            }
          />
        </div>
      </InfiniteScroll>
    </div>
  );
}

function EventList({ events }: { events: ExperienceForFeed[]}) {
  return (
    <div className="space-y-8">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
}
