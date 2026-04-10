import React from 'react'
import { Metadata } from 'next'
import ReservationsDetail from '@/components/detail/reservations-detail';

export const metadata: Metadata = {
    title: "Reservation Detail",
    description: "Manage and track your booking history",
}

const MyReservationPage = async ({ 
    params 
}: { 
    params: Promise<{ 
        id: string 
    }> 
}) => {
    const reservationId = (await params).id;

    return (
        <div className='max-w-7xl mx-auto px-4 py-20'>
            <ReservationsDetail reservationId={reservationId} />
        </div>
    )
}

export default MyReservationPage