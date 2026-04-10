import React from 'react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import UpdateRoom from '@/components/admin/room/update-room'


const UpdateRoomPage = async ({
    params
}: {
    params: Promise<{ id: string }>
}) => {
    const roomId = (await params).id;
    if (!roomId) { notFound(); }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <Suspense fallback={<div>Loading...</div>}>
                <UpdateRoom roomId={roomId} />
            </Suspense>
        </section>
    )
}

export default UpdateRoomPage