import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
  ChatIcon,
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Props {
    tweet: Tweet
}

function Tweet({tweet}: Props) {

  const {data:session} = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState('');

  const refreshComments = async() => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments);
  }

  useEffect(() => {
    refreshComments();
  }, [])

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    const commentToast = toast.loading('Posting Comment...')

    const comment:CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: 'POST',
    })

    toast.success('Comment Posted!', {
      id: commentToast,
    })

    setInput('');
    setCommentBoxVisible(false);
    refreshComments();
  }

  return (
    <div 
      key={tweet._id}
      className='flex flex-col space-x-3 border-y p-5 border-gray-100 dark:border-gray-800 transition ease-in dark:hover:bg-gray-800 hover:bg-gray-50'
    >
      <div className='flex space-x-3'>
        <img 
          className=' h-10 w-10 rounded-full object-cover' src={tweet.profileImg} alt="" />

        <div>
          <div className='flex items-center space-x-1'>
            <p className='mr-1 font-bold '>{tweet.username}</p>
            <p className='hidden text-sm text-gray-500 sm:inline'>@{tweet.username.replace(/\s+/g, '').toLowerCase()} · 
            </p>

            <TimeAgo 
              className=' text-sm text-gray-500'
              date={tweet._createdAt} 
            />
          </div>

          <p className=' pt-1'>{tweet.text}</p>
          {/* {tweet.image? <img className='w-full' src={tweet.image} alt="" /> : null} */}

          {tweet.image && <img className='m-5 ml-0 mb-1 max-h-60 rounded-lg shadow-sm object-cover' src={tweet.image} alt="" />}
        </div>
      </div>

      <div className='flex justify-between mt-5 pr-2'>

        <div 
          onClick={()=> session && setCommentBoxVisible(!commentBoxVisible)} 
          className=' flex cursor-pointer items-center space-x-1 text-gray-400 group '
        >
          <div className=' rounded-full group-hover:bg-blue-100 group-active:bg-blue-200 group-hover:text-blue-400 group-active:text-blue-400
          dark:group-hover:bg-blue-900/60 dark:group-hover:text-blue-300/90 dark:group-active:bg-blue-800/60 dark:group-active:text-blue-300/90'
          >
            <ChatAlt2Icon className='h-5 w-5 m-1.5 ' />
          </div>
          <p className='group-hover:text-blue-400 group-active:text-blue-400'>{comments.length}</p>
        </div>

        <div className=' flex cursor-pointer items-center space-x-3 text-gray-400 rounded-full hover:bg-emerald-100 hover:text-green-500 active:bg-green-200 active:text-green-500 dark:hover:bg-emerald-900 dark:hover:text-green-400 dark:active:text-green-400 dark:active:bg-emerald-800'>
          <SwitchHorizontalIcon className='h-5 w-5 m-1.5' />
        </div>

        <div className=' flex cursor-pointer items-center space-x-3 text-gray-400 rounded-full hover:bg-red-100 hover:text-red-400 active:bg-red-200 active:text-red-400 
        dark:hover:bg-red-900/50 dark:hover:text-red-700 dark:active:text-red-700 dark:active:bg-red-900/70 '>
          <HeartIcon className='h-5 w-5 m-1.5 active:fill-red-400 dark:active:fill-red-700 ' />
        </div>

        <div className=' flex cursor-pointer items-center space-x-3 text-gray-400 rounded-full hover:bg-blue-100 hover:text-blue-400 active:bg-blue-200 active:text-blue-400 dark:hover:bg-blue-900/60 dark:hover:text-blue-300 dark:active:bg-blue-800/60 dark:active:text-blue-300'>
          <UploadIcon className='h-5 w-5 m-1.5' />
        </div>
      </div>

    {/* Comment Box logic */}
    {commentBoxVisible && (
      <form onSubmit={handleSubmit} className=' flex mt-3 space-x-3'>
        <input 
            className=' flex-1 rounded-lg hover:bg-gray-200 bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-200 p-2 outline-none'
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text" 
            placeholder='Write a comment...' />
        <button 
          disabled={!input}
          className='text-twitter dark:disabled:text-gray-500 disabled:text-gray-200' type='submit'>Post</button>
      </form>
    )}

    {commentBoxVisible && comments?.length > 0 && (
      <div className=' my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 dark:border-gray-700 p-5'>
        {comments.map((comment) => (
          <div key={comment._id+comment._createdAt}className='relative flex space-x-2' >
            <hr className=' absolute border-x dark:border-gray-700 left-5 top-10 h-8 '/>
            <img src={comment.profileImg}
                className='mt-2 h-7 w-7 object-cover rounded-full'
                alt="" />

                <div>
                  <div className=' flex items-center space-x-1'>
                    <p className=' mr-1 font-bold'>{comment.username}</p>
                    <p className=' hidden text-sm text-gray-500 lg:inline '>{comment.username.replace(/\s+/g, '').toLowerCase()}</p>

                  <TimeAgo 
                    className=' text-sm text-gray-500'
                    date={comment._createdAt} 
                  />
                  </div>
                  <p>{comment.comment}</p>
                </div>
          </div>
        ))}
      </div>
    )}
    </div>
  )
}

export default Tweet