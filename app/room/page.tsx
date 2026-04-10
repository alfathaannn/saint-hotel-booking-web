import React from 'react'
import HeaderSection from '@/components/header/header-section/header-section'
import RoomSkeleton from '@/components/skeletons/room-skeleton'
import Main from "@/components/main/main"
import { Suspense } from 'react'

import { Metadata } from 'next'
export const metadata: Metadata = {
    title: "Room Saint Hotel",
    description: "Room",
}

const RoomPage = () => {
    return (
        <div>
            <HeaderSection
                title="Room's Saint Hotel"
                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
            <div className="mt-10 px-4">
                <Suspense fallback={<RoomSkeleton/>}>
                    <Main />
                </Suspense>
            </div>
        </div>
    )
}

export default RoomPage