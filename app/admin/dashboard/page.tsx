import React from 'react'
import DashboardCards from '@/components/admin/dashboard-cards'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { ReservationTable } from '@/components/admin/reservation-table'
import { getAllReservations } from '@/lib/data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
}

const DashboardPage = async () => {
    const reservations = await getAllReservations();
    if (!reservations) {
        return notFound();
    }
    return (
        <section className="flex flex-col min-h-screen px-4 md:px-6 lg:px-8 py-20 gap-4 max-w-7xl mx-auto">
            <div className="text-3xl sm:text-4xl font-bold justify-center items-center flex py-8">
                this is page&nbsp;{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-cyan-400">
                    Dashboard Saint Hotel 
                </span>
            </div>
            <div className="mt-6 mb-6">
                <Suspense fallback={<div className='flex justify-center items-center'>Loading...</div>}>
                    <DashboardCards />
                </Suspense>
                
                <Suspense fallback={<div className='flex justify-center items-center'>Loading reservations...</div>}>
                    <ReservationTable data={reservations} />
                </Suspense>
            </div>
        </section>
    )
}

export default DashboardPage