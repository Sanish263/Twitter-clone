import React from 'react'
import {
    MoonIcon,
    SunIcon,
} from '@heroicons/react/outline'
import useDarkMode from '../hook/useDarkMode'

function ToggleSwitch() {

    const [setTheme, colorTheme] = useDarkMode();

    return (
        <div>
<label className="relative flex items-center justify-between py-3">
  <input
    onClick = {()=> setTheme(colorTheme)} 
    className="peer absolute left-1/2 h-full w-full -translate-x-1/2 cursor-pointer appearance-none rounded-md" type="checkbox" />
  <span className={`relative z-20 ml-4 flex h-6 w-[55px] flex-shrink-0 cursor-pointer items-center rounded-full bg-gray-300 p-1 duration-300 ease-in-out after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-md after:duration-300 dark:bg-slate-700 after:absolute dark:after:ml-8 after:-mr-8`}>

<SunIcon className="absolute -z-10 h-4 w-4 text-gray-300" /> <MoonIcon className="absolute -z-10 h-4 w-4 translate-x-8 text-slate-700" /> 

    
    

  </span>
</label>
        </div>
    )
}

export default ToggleSwitch

