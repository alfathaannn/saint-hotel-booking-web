import React from 'react'
import HeaderSection from '@/components/header/header-section/header-section'
import Image from 'next/image'
import aboutImage from '@/public/about-image.png'
import { IoEyeOutline, IoLocateOutline } from 'react-icons/io5'
import Link from 'next/link'

import { Metadata } from 'next'
export const metadata: Metadata = {
    title: "About Saint Hotel",
    description: "Who we are",
}

function AboutPage() {
    return (
        <div>
            <HeaderSection
                title="About Saint Hotel"
                subtitle="Lorem ipsum dolor sit amet consectetur dad adaadipisicing elit."
            />

            {/* About Content */}
            <div className="max-w-7xl mx-auto py-20 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Image Section */}
                    <div className="relative">
                        {/* Main Image */}
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={aboutImage}
                                alt="About Our Hotel"
                                width={650}
                                height={650}
                                className='object-cover object-center w-full h-full hover:scale-105 transition-transform duration-700'
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-8">
                        {/* Main Heading */}
                        <h2 className="text-5xl font-bold text-gray-800 leading-tight">
                            Who
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500"> We Are</span>
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio illo culpa aliquid,
                            molestiae nisi reprehenderit. We are committed to providing exceptional service and
                            unforgettable moments for our guests.
                        </p>

                        {/* Vision & Mission Cards */}
                        <div className="grid gap-6">
                            <ul className="list-item space-y-6">
                                <li className='flex gap-5'>
                                    <div className="flex-none mt-1">
                                        <IoEyeOutline className="text-2xl text-cyan-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold mb-1">Vision :</h4>
                                        <p className="text-gray-700">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio illo culpa aliquid, molestiae nisi reprehenderit.</p>
                                    </div>
                                </li>
                                <li className='flex gap-5'>
                                    <div className="flex-none mt-1">
                                        <IoLocateOutline className="text-2xl text-cyan-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                                        <p className="text-gray-700">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio illo culpa aliquid, molestiae nisi reprehenderit.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage