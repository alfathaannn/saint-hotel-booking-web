import{ LoginGoogleButton } from '@/components/button/login-button'
import Link from 'next/link'
import { Metadata } from 'next'
import React from 'react'

// METADATA
export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your account",
}

const signInPage = async ({searchParams}: {searchParams: Promise<{redirect_url?: string}>}) => {
    const params = (await searchParams).redirect_url;
    let redirectUrl;
    if (!params) {
        redirectUrl = "/";
    } else {
        redirectUrl = `/${params}`;
    }
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Sign In</h2>
                <p className='text-center text-gray-600 mb-6'>Sign in to your account</p>
                <div className="py-4 text-center">
                    <LoginGoogleButton redirectUrl={redirectUrl}/>
                </div>
                <p className="text-center text-gray-600 mt-6">Dont have an account? &nbsp;
                    <Link href="/auth/signup" className="text-cyan-500 font-semibold">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default signInPage