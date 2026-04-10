import React from 'react'
import { getReservationById } from '@/lib/data'
import { notFound } from 'next/navigation';
import { formatCurrency, formatDate } from '@/lib/utils';
import { differenceInCalendarDays } from 'date-fns';
import Image from 'next/image';

const ReservationsDetail = async ({reservationId}: {reservationId: string}) => {
    const reservation = await getReservationById(reservationId);
    if (!reservation) return notFound();

    const duration = differenceInCalendarDays(reservation.endDate, reservation.startDate);
    const subTotal = duration * reservation.price;
    const totalAmount = reservation.payment?.amount || subTotal;
    
  return (
    <div className='w-full p-4 bg-white rounded-2xl shadow-sm border border-gray-100 lg:p-8 mt-8'>
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Reservation Detail</h2>
            <p className="text-gray-500 text-sm mt-1">Order #{reservation.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Customer & Payment Info */}
            <div className="space-y-8">
                {/* Customer Information */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Customer Information</h3>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3">
                            <span className="text-sm text-gray-500">Name</span>
                            <span className="text-sm font-medium text-gray-800 col-span-2">{reservation.User.name}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="text-sm text-gray-500">Email</span>
                            <span className="text-sm font-medium text-gray-800 col-span-2">{reservation.User.email}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="text-sm text-gray-500">Phone</span>
                            <span className="text-sm font-medium text-gray-800 col-span-2">{reservation.User.phone}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="text-sm text-gray-500">Book Date</span>
                            <span className="text-sm font-medium text-gray-800 col-span-2">{formatDate(reservation.createdAt.toISOString())}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Information */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Payment Information</h3>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3">
                            <span className="text-sm text-gray-500">Method</span>
                            <span className="text-sm font-medium text-gray-800 col-span-2 uppercase">{reservation.payment?.method || "-"}</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <span className="text-sm text-gray-500">Status</span>
                            <span className="text-sm font-medium text-gray-800 col-span-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    reservation.payment?.status === 'paid' ? 'bg-green-100 text-green-700' :
                                    reservation.payment?.status === 'failed' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                } uppercase`}>
                                    {reservation.payment?.status || "PENDING"}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Room Summary Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Room Summary</h3>
                
                <div className="flex gap-4 mb-6">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                        <Image 
                            src={reservation.Room.image} 
                            alt={reservation.Room.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-lg">{reservation.Room.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{formatCurrency(reservation.price)} / night</p>
                    </div>
                </div>

                <div className="space-y-3 border-y border-gray-200 py-4 mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Arrival</span>
                        <span className="text-sm font-semibold text-gray-800">{formatDate(reservation.startDate.toISOString())}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Departure</span>
                        <span className="text-sm font-semibold text-gray-800">{formatDate(reservation.endDate.toISOString())}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Duration</span>
                        <span className="text-sm font-semibold text-gray-800">{duration} {duration === 1 ? 'Night' : 'Nights'}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Subtotal</span>
                        <span className="text-sm font-medium text-gray-800">{formatCurrency(subTotal)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                        <span className="font-semibold text-gray-800">Total Price</span>
                        <span className="text-xl font-bold text-cyan-600">{formatCurrency(totalAmount)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReservationsDetail