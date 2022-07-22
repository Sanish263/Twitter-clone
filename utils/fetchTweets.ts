import { Tweet } from "../typings";

export const fetchTweets = async () => {
    const envar = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${envar}/api/getTweets`)

    const data = await res.json();

    const tweets: Tweet[] = data.tweets;

    return tweets;
}