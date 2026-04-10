import HeaderSection from '@/components/header/header-section/header-section'
import MyReserveList from '@/components/list/my-reserve-list'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import { Metadata } from 'next'
export const metadata: Metadata = {
    title: "My Reservation",
    description: "Reservation",
}

const MyReservationPage = async () => {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/signin");
    }
    return (
        <div>
            <HeaderSection
                title="My Reservation"
                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 px-8">Hi, {session.user.name}</h1>
                    <p className="text-gray-500 mt-2 px-8">Manage and track your booking history</p>
                </div>
                <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <MyReserveList />
                </section>
            </div>
        </div>
    )
}

export default MyReservationPage