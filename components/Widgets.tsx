import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { TwitterMomentShare } from 'react-twitter-embed';

function Widgets() {

  return (
    <div className=' px-2 mt-2 col-span-2 hidden lg:inline space-y-4 '>
        {/* Search */}
        <div className=' flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 transition duration-500 p-3 rounded-full mt-2'>
            <SearchIcon className=' h-5 w-5 text-gray-400' />
            <input 
                type="text" 
                placeholder='Search Twitter' 
                className=' flex-1 outline-none bg-transparent'
            />
        </div>

        <div className='hidden dark:flex'>
        <TwitterTimelineEmbed
            sourceType="list"
            ownerScreenName='palafo'
            slug='breakingnews'
            options={{height: 400}}
            theme='dark'
            noScrollbar={true}          
            /> 
            </div>

        <div className=' dark:hidden'>
        <TwitterTimelineEmbed
            sourceType="list"
            ownerScreenName='palafo'
            slug='breakingnews'
            options={{height: 400}}
            theme='light'
            noScrollbar={true} 
            />
            </div>


      <div className='hidden dark:flex'>
        <TwitterTimelineEmbed
            sourceType="profile"
            screenName='naval'
            options={{height: 400}}
            theme='dark'
            noScrollbar={true}
            /> 
            </div>

        <div className=' dark:hidden'>
        <TwitterTimelineEmbed
            sourceType="profile"
            screenName='naval'
            options={{height: 400}}
            theme='light'
            noScrollbar={true}
            />
            </div> 
    </div>
  )
}

export default Widgets


