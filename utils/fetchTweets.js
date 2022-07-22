
export const fetchTweets = async () => {
    const procenv = "process.env.NEXT_PUBLIC_BASE_URL";
    const url = `${procenv}api/getTweets`;

    const res = await fetch(url)

    const data = await res.json()
    const tweets = data.tweets
    return tweets
}


