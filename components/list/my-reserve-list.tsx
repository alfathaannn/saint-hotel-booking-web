import React from 'react'
import Image from 'next/image'
import { getReservationByUserId } from '@/lib/data'
import { notFound } from 'next/navigation';
import { formatCurrency, formatDate } from '@/lib/utils';
import { differenceInCalendarDays } from 'date-fns';
import Link from 'next/link';

const MyReserveList = async () => {
    const reservations = await getReservationByUserId();
    if (!reservations || reservations.length === 0) return notFound();

    return (

        <div className="space-y-6">
            {reservations.map((item) => {
                const duration = differenceInCalendarDays(item.endDate, item.startDate);
                const isUnpaid = item.payment?.status === "unpaid";

                return (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                        {/* Header - dengan justify-between */}
                        <div className="flex items-center justify-between px-6 py-4 bg-linear-to-r from-gray-50 to-white border-b border-gray-100">
                            {/* Left - Reservation ID */}
                            <div>
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reservation ID</span>
                                <h2 className="text-xs font-mono font-semibold text-gray-800 mt-0.5">#{item.id}</h2>
                            </div>

                            {/* Right - Status */}
                            <div className="text-right">
                                <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Payment</span>
                                <h2 className="text-xs font-mono font-semibold text-gray-800 uppercase mt-0.5">
                                    {item.payment?.status}
                                </h2>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col md:flex-row">
                            {/* Image */}
                            <div className="md:w-48 lg:w-56 relative p-3">
                                <Image
                                    src={item.Room.image}
                                    alt={item.Room.name}
                                    width={500}
                                    height={300}
                                    className="w-full h-64 md:h-full object-cover rounded-lg"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 p-6">
                                <div className="flex flex-col h-full">
                                    {/* Room Name */}
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                                        {item.Room.name}
                                    </h3>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">Price per night</span>
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {formatCurrency(item.price)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">Arrival Date</span>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {formatDate(item.startDate.toISOString())}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">Departure Date</span>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {formatDate(item.endDate.toISOString())}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">Duration</span>
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {duration} {duration === 1 ? "Night" : "Nights"}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">Total Amount</span>
                                                <span className="text-lg font-bold text-cyan-600">
                                                    {item.payment && formatCurrency(item.payment.amount)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-auto flex justify-end">
                                        {isUnpaid ? (
                                            <Link
                                                href={`/checkout/${item.id}`}
                                                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-sm transform hover:-translate-y-0.5"
                                            >
                                                Pay Now
                                            </Link>
                                        ) : (
                                            <Link
                                                href={`/myreservation/${item.id}`}
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-xl transition-all duration-200"
                                            >
                                                View Details
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default MyReserveList