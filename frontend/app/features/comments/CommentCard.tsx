import type { Comment } from "@lets-meet/server/types";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{comment.content}</CardTitle>
      </CardHeader>
    </Card>
  );
}
