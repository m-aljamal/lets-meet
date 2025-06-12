import { useState } from "react";
import { useParams, useNavigate } from "react-router";

import { useAuth } from "../../lib/auth";
import { CalendarIcon, HeartIcon, MapPinIcon, Users } from "lucide-react";

// Mock data - replace with actual API call
const mockEvent = {
  id: "1",
  title: "Tech Meetup 2024",
  description:
    "Join us for an evening of networking and tech talks with industry experts. We'll have presentations from leading tech companies, networking sessions, and plenty of opportunities to connect with like-minded professionals.",
  imageUrl:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  date: "2024-03-15T18:00:00",
  location: "San Francisco, CA",
  attendeesCount: 120,
  attendees: [
    { id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: "2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=2" },
    // Add more mock attendees
  ],
};

export function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAttending, setIsAttending] = useState(false);

  // TODO: Replace with actual API call to fetch event details
  const event = mockEvent;

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAttendToggle = () => {
    if (!user) {
      navigate("/auth/signin");
      return;
    }
    setIsAttending(!isAttending);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            {isFavorite ? (
              <HeartIcon className="h-8 w-8 text-red-500" />
            ) : (
              <HeartIcon className="h-8 w-8 text-gray-600" />
            )}
          </button>
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {event.title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>{event.attendeesCount} attending</span>
            </div>
          </div>
          <p className="text-gray-700 mb-8">{event.description}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={handleAttendToggle}
              className={`px-6 py-3 rounded-md text-base font-medium ${
                isAttending
                  ? "bg-green-100 text-green-800"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {isAttending ? "Attending" : "I'm Coming"}
            </button>
          </div>
        </div>
      </div>

      {/* Attendees Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Attendees</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {event.attendees.map((attendee) => (
              <div
                key={attendee.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <img
                  src={attendee.avatar}
                  alt={attendee.name}
                  className="h-10 w-10 rounded-full"
                />
                <span className="text-gray-900">{attendee.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
