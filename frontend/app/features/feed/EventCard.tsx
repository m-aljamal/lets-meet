import { HeartIcon, MessageCircleIcon, Users } from "lucide-react";
import { Link } from "react-router";
import type { ExperienceForFeed } from "./types";

export function EventCard({
  id,
  title,
  imageUrl,
  location,
  content,
  commentsCount,
  scheduledAt,
  url
}: ExperienceForFeed) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={imageUrl ?? undefined}
          alt={title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={()=>{}}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          {true ? (
            <HeartIcon className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Users className="h-5 w-5 mr-1" />
          <span>{25} attending</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MessageCircleIcon className="h-5 w-5 mr-1" />
          <span>{commentsCount} comments</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <p>{new Date(scheduledAt).toLocaleDateString()}</p>
            <p>{location}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={()=>{}}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                false
                  ? "bg-green-100 text-green-800"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              {false ? "Attending" : "I'm Coming"}
            </button>
            <Link
              to={`/events/${id}`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
