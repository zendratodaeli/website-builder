"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { pagesFormSchema } from "@/lib/pages/validation-schema"
import { Page } from "@/lib/generated/prisma"

type Props = {
  label?: string;
  href?: string;
  onSubmit: (label: Page["label"], href: Page["href"]) => void;
}
const PagesForm = ({label = "", href = "", onSubmit}: Props) => {
  const form = useForm<z.infer<typeof pagesFormSchema>>({
    resolver: zodResolver(pagesFormSchema),
    defaultValues: {
      label,
      href
    },
  })
 
  function handleSubmit({label, href}: z.infer<typeof pagesFormSchema>) {
    onSubmit(label, href);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
       
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Name of the hyperlink" {...field} />
              </FormControl>
              <FormDescription>
                The label will be used on your header of the webpage.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="href"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Href</FormLabel>
              <FormControl>
                <Input placeholder="Where do you want to redirect user to?" {...field} />
              </FormControl>
              <FormDescription>
                The hyperlink will be used to redirect users to certain pages.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default PagesForm
