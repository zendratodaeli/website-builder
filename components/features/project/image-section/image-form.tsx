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
import { Image } from "@/lib/generated/prisma";
import { ImageFormSchema } from "@/lib/image/validation-schema";

type Props = {
  url?: Image["url"];
  alt?: Image["alt"];
  onSubmit: (url: Image["url"], alt?: Image["alt"]) => void;
};

export function ImageForm({ url = "", alt="", onSubmit }: Props) {
  const form = useForm<z.infer<typeof ImageFormSchema>>({
    resolver: zodResolver(ImageFormSchema),
    defaultValues: { url, alt },
  });

  function handleSubmit({url, alt}: z.infer<typeof ImageFormSchema>) {
   onSubmit(url, alt)
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
                <Textarea placeholder="Enter valid image url" {...field} />
              </FormControl>
              <FormDescription>
                Enter the image url.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alt Text</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter alt text" {...field} />
              </FormControl>
              <FormDescription>
                Describe alt text
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
