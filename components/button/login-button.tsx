import React from 'react'
import { FaGoogle } from 'react-icons/fa6'
import { signIn } from '@/auth'

export const LoginGoogleButton = ({redirectUrl}: {redirectUrl: string}) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", {redirectTo: redirectUrl});
      }}
    >
      <button className='flex items-center justify-center gap-2 w-full px-6 py-3 bg-linear-to-r from-cyan-400 to-cyan-500 text-white font-semibold rounded-xl hover:from-cyan-500 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer'>
        <FaGoogle className='size-6' />
        Sign In with Google
      </button>
    </form>
  )
}