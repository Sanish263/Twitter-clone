import { getProviders, signIn } from 'next-auth/react'
import React from 'react'

export default function signin({ providers }) {
    return (
        <>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-800 py-6 sm:py-12"> 
            <div className="absolute inset-0 bg-center"></div>
            <div className="relative bg-black px-6 pb-36 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                <div className="mx-auto max-w-md ">
                    <div className=" p-2 px-14">
                        <div className=" flex flex-col space-y-6 py-8 ">
                            <div className=" flex justify-center -mt-3">
                                <img src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/twitter-icon-18-256.png" className=" h-8 w-8 object-contain fillgra" alt="" />
                            </div>
                
                        <div className="text-base leading-7 text-gray-400">
                            <p className="flex justify-center text-4xl font-bold text-slate-200 pb-8">Join Twitter today</p>            
                        </div>
                
                    {Object.values(providers).map((provider) => (
                                    <div key={provider.name} className=" bg-white hover:bg-gray-100 flex justify-evenly rounded-full p-[5px] cursor-pointer">
                            <button onClick={() => signIn(provider.id, { callbackUrl: "/"})} className=" py-[1px]">
                            <span className=" flex space-x-2">
                                <img 
                                src={provider.name === "Google" ? "https://cdn.iconscout.com/icon/free/png-64/google-2981831-2476479.png" : "https://cdn.iconscout.com/icon/free/png-64/twitter-486881-2364950.png"} 
                                className=" h-6 w-6 object-contain" 
                                alt="" />
                                <p className=" font-semibold">Sign in with {provider.name}</p>
                            </span>
                            </button>
                        </div>
                    ))}
                        <div className=" flex flex-row items-center gap-x-2 text-gray-400 ">
                            <span className=" flex w-32 h-[1px] bg-gray-300/50 mx-1 opacity-60">
                            </span>
                            <p>or</p>
                            <span className=" flex w-32 h-[1px] bg-gray-300/50 mx-1 opacity-60">
                            </span>
                        </div>
                        
                        <div className=" bg-white hover:bg-gray-100 flex justify-evenly rounded-full p-[5px]">
                            <button className=" cursor-default py-[1px]">
                            <span className=" flex space-x-1">
                                <p className=" cursor-default font-semibold">Sign up with phone or email</p>
                            </span>
                            </button>
                        </div>
                
                        <div className=" text-gray-300/50 font-thin text-sm">
                            <p>By signing up, you agree to the 
                            <span className=" text-[#1DA1F2] hover:underline cursor-pointer">Terms of Service</span> and 
                            <span className=" text-[#1DA1F2] hover:underline cursor-pointer"> Privacy Policy</span>, including 
                            <span className=" text-[#1DA1F2] hover:underline cursor-pointer">Cookie Use.</span> </p>
                        </div>
                    
                        </div>
                
                    </div>
                </div>
            </div>
        </div>
            </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()
        return {
            props: { providers },
        }
    }