import React from "react";
import type { Comment } from "@lets-meet/server/types";
import { createCommentSchema } from "@lets-meet/shared/schema/comment";
import type z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useTRPC } from "trpc/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  comment: Comment;
  setIsEditing: (isEditing: boolean) => void;
};

type CommentCreateForm = z.infer<typeof createCommentSchema>;

export default function CommentEditForm({ comment, setIsEditing }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const updateComment = useMutation(
    trpc.comments.updateComment.mutationOptions({
      onSuccess: () => {
        setIsEditing(false);
        queryClient.invalidateQueries(
          trpc.comments.byExperienceId.queryOptions({
            experienceId: comment.experienceId,
          })
        );
      },
      onError: (error) => {
        console.error(error);
      },
    })
  );
  const form = useForm<CommentCreateForm>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: comment.content,
    },
  });

  const onSubmit = (data: CommentCreateForm) => {
    console.log(data);

    updateComment.mutate({
      content: data.content,
      commentId: comment.id,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-4 space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add a comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Add a comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button
            disabled={updateComment.isPending}
            type="submit"
          >
            {updateComment.isPending ? "Saving..." : "Save"}
           
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
