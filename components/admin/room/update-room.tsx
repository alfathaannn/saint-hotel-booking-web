import React from 'react'
import UpdateRoomForm from '@/components/admin/room/update-room-form'
import { getAmenities, getRoomsById } from '@/lib/data'
import { notFound } from 'next/navigation'

const UpdateRoom = async ({roomId}: {roomId: string}) => {
    const [room, amenities] = await Promise.all([
        getRoomsById(roomId),
        getAmenities()
    ])
    if (!amenities || !room) return notFound();

    return (
        <div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2 mt-10 px-4 md:px-6'>Update Room</h1>
            <p className='text-gray-600 mb-6 px-4 md:px-6'>Update room to hotel</p>
            <UpdateRoomForm amenities={amenities} room={room}/>
        </div>
    )
}

export default UpdateRoom