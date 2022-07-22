import { Tweet } from "../typings";
import fetch from 'isomorphic-unfetch';

export const fetchTweets = async () => {

    const procenv = process.env.NEXT_PUBLIC_BASE_URL
    const url = `${procenv}/api/getTweets`

    const res = await fetch(url)

    const data = await res.json();

    const tweets: Tweet[] = data.tweets;

    return tweets;
}
