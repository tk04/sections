export interface TweetUser {
  profile_image_url: string;

  verified: boolean;

  name: string;

  id: number;

  username: string;
}
export interface Poll {
  label: string;

  votes: number;
}
export interface Media {
  media_key: string;

  type: string;

  url: string;

  preview_image_url: string;
}
export interface Tweet {
  text: string;

  id: number;

  likes: number;

  user: TweetUser;

  retweets: number;

  replies: number;

  pollOptions: Poll[];

  media: Media[];
}
