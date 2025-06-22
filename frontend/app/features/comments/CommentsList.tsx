import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "trpc/react";
import CommentCard from "./CommentCard";

type Props = {
  eventId: string;
  commentsCount: number;
};

export default function CommentsList({ eventId, commentsCount }: Props) {
  const trpc = useTRPC();
  const comments = useQuery(
    trpc.comments.byExperienceId.queryOptions(
      {
        experienceId: eventId,
      },
      {
        enabled: commentsCount > 0,
      }
    )
  );
  return (
    <div className="space-y-4 mx-4">
      {comments.isLoading && <div>Loading...</div>}
      {comments.data?.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
        
      ))}
    </div>
  );
}
