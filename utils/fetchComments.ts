import { Comment } from "../typings";

export const fetchComments = async (tweetId: string) => {
    const res = await fetch(`/api/getComments?tweetId=${tweetId}`)
    // We create the api endpoint getComments in getComments.ts
    // The functionality of this is to fetch the comments

    const comments: Comment[] = await res.json();

    return comments;
}
