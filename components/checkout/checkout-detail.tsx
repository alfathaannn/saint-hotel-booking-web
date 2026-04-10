import React from 'react'
import Image from 'next/image'
import { getReservationById } from '@/lib/data'
import { formatDate, formatCurrency } from '@/lib/utils'
import { differenceInCalendarDays } from 'date-fns'
import PaymentButton from "@/components/button/payment-button"

const CheckoutDetail = async ({ reservationId }: { reservationId: string }) => {
    const reservation = await getReservationById(reservationId);
    if (!reservation || !reservation.payment) {
        return <div>Reservation not found</div>
    }
    const duration = differenceInCalendarDays(reservation.endDate, reservation.startDate);

    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <div className='grid md:grid-cols-2 gap-8'>

                {/* Right Column - Reservation Summary */}
                <div className="order-2 md:order-1">
                    <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="bg-gray-100 px-6 py-4 border-b border-gray-100">
                            <h3 className='text-xl font-bold text-gray-800'>Reservation Summary</h3>
                            <p className='text-sm text-gray-500 mt-1'>Complete booking information</p>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                {/* Reservation ID */}
                                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                    <span className="text-sm font-medium text-gray-600">Reservation ID</span>
                                    <span className="text-sm font-mono bg-gray-50 px-3 py-1 rounded-lg text-gray-800">
                                        {reservation.id}
                                    </span>
                                </div>

                                {/* Guest Information Section */}
                                <div className="pt-2">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Guest Information</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Full Name</span>
                                            <span className="text-sm font-medium text-gray-800">{reservation.User.name}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Email Address</span>
                                            <span className="text-sm font-medium text-gray-800 truncate max-w-[200px] text-right">
                                                {reservation.User.email}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Phone Number</span>
                                            <span className="text-sm font-medium text-gray-800">{reservation.User.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-100 my-2"></div>

                                {/* Stay Details Section */}
                                <div className="pt-2">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Stay Details</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Arrival Date</span>
                                            <span className="text-sm font-medium text-gray-800">{formatDate(reservation.startDate.toISOString())}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Departure Date</span>
                                            <span className="text-sm font-medium text-gray-800">{formatDate(reservation.endDate.toISOString())}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Duration</span>
                                            <span className="text-sm font-medium text-gray-800">
                                                {duration} {duration === 1 ? "Night" : "Nights"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-100 my-2"></div>

                                {/* Payment Section */}
                                <div className="pt-2">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Payment Details</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Total Price</span>
                                            <span className="text-lg font-bold text-cyan-600">{formatCurrency(reservation.payment.amount)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Payment Status</span>
                                            <span className={`
                                                inline-flex px-3 py-1 rounded-full text-xs font-semibold
                                                ${reservation.payment.status === 'PAID'
                                                    ? 'bg-green-100 text-green-700'
                                                    : reservation.payment.status === 'PENDING'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-red-100 text-red-700'
                                                }
                                            `}>
                                                {reservation.payment.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Column - Room Details */}
                <div className="order-1 md:order-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="bg-linear-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                            <h3 className='text-xl font-bold text-gray-800'>Room Details</h3>
                            <p className='text-sm text-gray-500 mt-1'>Your selected accommodation</p>
                        </div>

                        <div className='p-6'>
                            <div className=''>
                                <div className='relative w-28 h-28 rounded-xl overflow-hidden shadow-md shrink-0 mb-5'>
                                    <Image
                                        src={reservation.Room.image}
                                        alt={reservation.Room.name}
                                        width={500}
                                        height={300}
                                        className='object-cover w-full rounded-t-sm aspect-video md:rounded-none md:rounded-s-sm transition-transform duration-300'
                                    />
                                </div>
                                <div className='flex-1'>
                                    <h4 className='text-lg md:text-xl font-bold text-gray-800 mb-2'>{reservation.Room.name}</h4>
                                    <div className='flex items-baseline gap-1'>
                                        <span className='text-lg md:text-xl font-bold text-cyan-600'>{formatCurrency(reservation.Room.price)}</span>
                                        <span className='text-xs md:text-sm text-gray-500'>/ night</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Payment Button will go here */}
                    <PaymentButton reservation={reservation} />
                </div>
            </div>
        </div>
    )
}

export default CheckoutDetail