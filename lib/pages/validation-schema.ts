import z from "zod";

export const pagesFormSchema = z.object({
  label: z.string().nonempty({ message: "Field is required"}),
  href: z.string().nonempty({ message: "Field is required"})
  .refine((href) => href.startsWith("/")),
})