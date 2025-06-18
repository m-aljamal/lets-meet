import { z } from "zod";
import { createCommentSchema } from "@lets-meet/shared/schema/comment";
import type { Experience } from "@lets-meet/server/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

type CommentCreateForm = z.infer<typeof createCommentSchema>;

export default function CommentForm({
  experienceId,
}: {
  experienceId: Experience["id"];
}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const addComment = useMutation(
    trpc.comments.addComment.mutationOptions({
      onSuccess:  () => {
        form.reset();
        queryClient.invalidateQueries(
          trpc.comments.byExperienceId.queryOptions({
            experienceId,
          })
        );
        queryClient.invalidateQueries(
          trpc.experience.feed.infiniteQueryOptions({})
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
      content: "",
    },
  });

  const onSubmit = (data: CommentCreateForm) => {
    addComment.mutate({
      content: data.content,
      experienceId,
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
        <Button
          disabled={addComment.isPending}
          type="submit"
        >
          {addComment.isPending ? "Adding..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
