import { MessageCircleIcon } from "lucide-react";
import CommentsList from "./CommentsList";
import type { ExperienceForFeed } from "../feed/types";
import CommentForm from "./CommentForm";
 
type Props = {
  commentsCount: number;
  eventId: ExperienceForFeed["id"];
};

export default function CommentsSection({ commentsCount, eventId }: Props) {
  return (
    <div className="space-y-4  ">
      <div className="flex items-center text-sm text-gray-500 mb-4 ml-4">
        <MessageCircleIcon className="h-5 w-5 mr-1" />
        <span>{commentsCount} comments</span>
      </div>
      <CommentForm experienceId={eventId} />
      <CommentsList eventId={eventId} commentsCount={commentsCount} />
    </div>
  );
}
