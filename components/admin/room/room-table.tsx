import React from 'react'
import { getRooms } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import {formatDate, formatCurrency} from '@/lib/utils'
import { DeleteButton } from "@/components/admin/room/button"
import { IoPencilOutline } from 'react-icons/io5'

const RoomTable = async () => {
    const rooms = await getRooms();
    
    if(!rooms.length) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <div className="text-gray-400 mb-4">
                    <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700">No rooms found</h3>
                <p className="text-gray-400 mt-1">Get started by adding your first room</p>
                <Link href="/admin/room/create" className="inline-block mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition">
                    Add Room
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
                <div 
                    key={room.id} 
                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
                >
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                        <Image 
                            src={room.image} 
                            alt={room.name} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Badge */}
                        {/* <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                            Room {room.id?.slice(0, 4) || 'VIP'}
                        </div> */}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        {/* Room Name */}
                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                            {room.name}
                        </h3>
                        
                        {/* Price */}
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-2xl font-bold text-cyan-500">
                                {formatCurrency(room.price)}
                            </span>
                            <span className="text-gray-400 text-sm">/night</span>
                        </div>

                        {/* Created At */}
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Added {formatDate(room.createdAt.toISOString())}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-3 border-t border-gray-100">
                            <Link href={`/admin/room/update/${room.id}`} className="flex-1 px-4 py-2 text-center text-sm font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                                <IoPencilOutline className='size-4' />
                                Edit
                            </Link>
                            <DeleteButton id={room.id} image={room.image} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RoomTable