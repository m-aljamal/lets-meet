import { useState } from "react";
import { useNavigate } from "react-router";
import { EventCard } from "../features/feed/EventCard";
import { useAuth } from "../lib/auth";

// Mock data - replace with actual API call
const mockMyEvents = [
  {
    id: "1",
    title: "Tech Meetup 2024",
    description:
      "Join us for an evening of networking and tech talks with industry experts.",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "2024-03-15T18:00:00",
    location: "San Francisco, CA",
    attendeesCount: 120,
  },
  // Add more mock events
];

export function MyEvents() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [attending, setAttending] = useState<string[]>([]);

  if (!user) {
    navigate("/auth/signin");
    return null;
  }

  const handleFavoriteToggle = (eventId: string) => {
    setFavorites((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleAttendToggle = (eventId: string) => {
    setAttending((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
        <button
          onClick={() => navigate("/events/create")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
        >
          Create New Event
        </button>
      </div>

      {mockMyEvents.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new event.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/events/create")}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Event
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMyEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              isFavorite={favorites.includes(event.id)}
              isAttending={attending.includes(event.id)}
              onFavoriteToggle={() => handleFavoriteToggle(event.id)}
              onAttendToggle={() => handleAttendToggle(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
