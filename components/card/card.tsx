import React from 'react'
import Image from 'next/image'
import heroImage from '@/public/hero-image.png'
import Link from 'next/link'
import { IoPeopleOutline } from "react-icons/io5"
import { Room } from '@/app/generated/prisma/client'
import { formatCurrency } from '@/lib/utils'

export const Card = ({room}: {room: Room}) => {
    return (
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group'>
            {/* Image Container */}
            <div className='h-[280px] w-full relative overflow-hidden'>
                <Image
                    src={room.image}
                    width={384}
                    height={280}
                    alt="Luxury Room"
                    className='object-cover object-center w-full h-full transition-transform duration-500'
                />
                {/* Badge */}
                {/* <div className='absolute top-4 right-4 bg-cyan-400 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                    Best Seller
                </div> */}
            </div>

            {/* Content Container */}
            <div className="p-6">
                {/* Room Title */}
                <Link href={`/room/${room.id}`} className='block mb-2'>
                    <h3 className='text-2xl font-bold text-gray-800 hover:text-cyan-500 transition-colors duration-200'>
                        {room.name}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {room.description}
                </p>

                {/* Capacity */}
                <div className="flex items-center text-gray-500 mb-4">
                    <IoPeopleOutline className="text-lg mr-2" />
                    <span className="text-sm">{room.capacity} {room.capacity === 1 ? "Person" : "People"}</span>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <span className="text-2xl font-bold text-gray-800">{formatCurrency(room.price)}</span>
                        <span className="text-gray-400 text-sm ml-1">/night</span>
                    </div>

                    <Link
                        href={`/room/${room.id}`}
                        className='px-6 py-3 bg-linear-to-r from-cyan-400 to-cyan-500 text-white font-semibold rounded-xl hover:from-cyan-500 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg'
                    >
                        Book Now
                    </Link>
                </div>

                {/* Facilities Icons */}
                <div className="flex items-center gap-4 mt-4 text-gray-400">
                    <div className="flex items-center text-xs">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Free Cancellation
                    </div>
                    <div className="flex items-center text-xs">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Free WiFi
                    </div>
                </div>
            </div>
        </div>
    )
}
