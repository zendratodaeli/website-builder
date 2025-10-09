"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Video } from "@/lib/generated/prisma";
import { getYouTubeEmbedUrl } from "@/lib/video/helpers";
import { VideoFormSchema } from "@/lib/video/validation-schema";

type Props = {
  url?: Video["url"];
  onSubmit: (url: Video["url"]) => void;
};

export function VideoForm({ url = "", onSubmit }: Props) {
  const form = useForm<z.infer<typeof VideoFormSchema>>({
    resolver: zodResolver(VideoFormSchema),
    defaultValues: { url },
  });

  function handleSubmit(values: z.infer<typeof VideoFormSchema>) {
   const embedUrl = getYouTubeEmbedUrl(values.url);
   
   onSubmit(embedUrl)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter valid Youtube url" {...field} />
              </FormControl>
              <FormDescription>
                Only Youtube url is supported at the moment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
