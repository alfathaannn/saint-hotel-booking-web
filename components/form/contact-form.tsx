"use client"

import React from 'react'

import { useActionState } from "react"
import { contactMessage } from '@/lib/action'
import clsx from 'clsx'

export const ContactForm = () => {
    const [state, formAction, isPending] = useActionState(contactMessage, null);
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            
            {state?.message && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm"
                    role='alert'>
                    <div className="font-medium">
                        {state.message}
                    </div>
                </div>
            )}
            <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Full Name"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                        />
                        <div className="" aria-live='polite' aria-atomic='true'>
                            <p className='text-red-500 text-sm'>
                                {state?.errors?.name?.[0]}
                            </p>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email Address"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                        />
                        <div className="" aria-live='polite' aria-atomic='true'>
                            <p className='text-red-500 text-sm'>
                                {state?.errors?.email?.[0]}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Your Subject"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                    <div className="" aria-live='polite' aria-atomic='true'>
                        <p className='text-red-500 text-sm'>
                            {state?.errors?.subject?.[0]}
                        </p>
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Your Message "
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                    ></textarea>
                    <div className="" aria-live='polite' aria-atomic='true'>
                        <p className='text-red-500 text-sm'>
                            {state?.errors?.message?.[0]}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className={clsx("bg-cyan-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2", isPending && "opacity-50 cursor-not-allowed")}
                    >
                        {isPending ? "Sending..." : "Send Message"}
                        <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </button>

                    <p className="text-sm text-gray-400">
                        <span className="text-red-500">*</span> Required fields
                    </p>
                </div>
            </form>
        </div>
    )
}
