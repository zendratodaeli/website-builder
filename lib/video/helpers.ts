import { YOUTUBE_REGEX } from "./constants";

export const isValidYouTubeURL = (url: string): boolean => {
  return !!url.match(YOUTUBE_REGEX);
};

export function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(YOUTUBE_REGEX);
  const videoId = match && match[1];
  return videoId ? `https://www.youtube.com/embed/${match[1]}` : url;
}