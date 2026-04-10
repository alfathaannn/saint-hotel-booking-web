import React from 'react'
import { LuChartArea, LuShoppingCart, LuUsers } from "react-icons/lu"
import { getRevenueAndReservation, getTotalCustomers } from '@/lib/data'
import { notFound } from 'next/navigation'

const DashboardCards = async () => {
    const [data, customer] = await Promise.all([
        getRevenueAndReservation(),
        getTotalCustomers(),
    ]);

    if (!data || !customer) {
        return notFound();
    }

    const totalRevenue = data.revenue;
    const totalReservation = data.reserve;
    const totalCustomers = customer.length;

    const cards = [
        {
            title: "Total Reservation",
            value: totalReservation,
            icon: LuShoppingCart,
            iconColor: "text-blue-600",
            iconBg: "bg-blue-100",
            prefix: ""
        },
        {
            title: "Total Customers",
            value: totalCustomers,
            icon: LuUsers,
            iconColor: "text-purple-600",
            iconBg: "bg-purple-100",
            prefix: ""
        },
        {
            title: "Total Revenue",
            value: totalRevenue,
            icon: LuChartArea,
            iconColor: "text-emerald-600",
            iconBg: "bg-emerald-100",
            prefix: "Rp "
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-center items-center min-h-[160px]"
                >
                    {/* ICON LABEL */}
                    {/* <div className={`absolute top-0 right-0 p-4 ${card.iconBg} rounded-bl-2xl`}>
                        <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div> */}

                    {/* CONTENT (TENGAH CARD) */}
                    <div className="text-center">
                        {/* VALUE */}
                        <span className="text-4xl font-extrabold text-gray-800 tracking-tight">
                            {card.prefix}{card.value.toLocaleString()}
                        </span>

                        {/* TITLE */}
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mt-4">
                            {card.title}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DashboardCards