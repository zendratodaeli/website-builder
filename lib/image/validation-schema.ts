import z from "zod";

export const ImageFormSchema = z.object({
  url: z.string().url({message: "Invalid url"}),
  alt: z.string().optional()
});
