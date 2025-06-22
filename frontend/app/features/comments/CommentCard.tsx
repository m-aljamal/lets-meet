import type { Comment } from "@lets-meet/server/types";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import CommentEditForm from "./CommentEditForm";
import { useTRPC } from "trpc/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const deleteComment = useMutation(
    trpc.comments.deleteComment.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.comments.byExperienceId.queryOptions({
            experienceId: comment.experienceId,
          })
        );
        queryClient.invalidateQueries(
          trpc.experience.feed.infiniteQueryOptions({})
        );
      },
    })
  );
  if (isEditing) {
    return <CommentEditForm comment={comment} setIsEditing={setIsEditing} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{comment.content}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditing(true)}
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => deleteComment.mutate({ commentId: comment.id })}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
