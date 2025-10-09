import z from "zod";
import { isValidYouTubeURL } from "./helpers";

export const VideoFormSchema = z.object({
  url: z.string().refine((url) => isValidYouTubeURL(url), {
    message: "Invalid Youtube URL",
  }),
});
