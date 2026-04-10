import React from 'react'
import CreateRoomForm from '@/components/admin/room/create-room-form'
import { getAmenities } from '@/lib/data'

const CreateRoom = async () => {
    const amenities = await getAmenities();
    if (!amenities) return null;

    return (
        <div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2 mt-10 px-4 md:px-6'>Create New Room</h1>
            <p className='text-gray-600 mb-6 px-4 md:px-6'>Add a new room to hotel</p>
            <CreateRoomForm amenities={amenities} />
        </div>
    )
}

export default CreateRoom