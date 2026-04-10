import React from 'react'
import { getRoomsDetailById, getDisabledRoomsById } from '@/lib/data'
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import { formatCurrency } from '@/lib/utils';
import ReserveForm from '@/components/form/reserve-form';

const RoomDetail = async ({ roomId }: { roomId: string }) => {
    const [room, disabledDates] = await Promise.all([
        getRoomsDetailById(roomId),
        getDisabledRoomsById(roomId)
    ]);
    if (!room || !disabledDates) return notFound();

    return (
        <div className='max-w-7xl mx-auto py-12 px-4 md:px-6'>
            <div className='flex flex-col md:flex-row gap-10'>

                {/* Main Content - Kiri */}
                <div className="flex-1 md:w-2/3 space-y-8">

                    {/* Room Name */}
                    <h1 className='text-4xl md:text-5xl font-bold text-gray-900 tracking-tight'>
                        {room.name}
                    </h1>
                    
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-100">
                        <Image
                            src={room.image}
                            alt={room.name}
                            width={770}
                            height={430}
                            priority
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Description */}
                    <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {room.description}
                        </p>
                    </div>
                </div>

                {/* Booking Card - Kanan */}
                <div className="md:w-1/3">
                    <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        {/* Card Header */}
                        <div className="px-6 py-5">
                            <h3 className="text-gray-800 mt-4 font-bold text-xl flex items-center gap-2">
                                Booking Details
                            </h3>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 space-y-6">
                            {/* Capacity & Price */}
                            <div className="bg-linear-to-br from-gray-50 to-white rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-cyan-100 rounded-xl">
                                            <IoPeopleOutline className="size-5 text-cyan-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 uppercase tracking-wide">Capacity</p>
                                            <span className="font-semibold text-gray-800 text-sm">
                                                {room.capacity} {room.capacity === 1 ? "Person" : "People"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400 uppercase tracking-wide">Price per night</p>
                                        <div>
                                            <span className='text-sm font-bold text-gray-900'>
                                                {formatCurrency(room.price)}
                                            </span>
                                            <span className="text-gray-400 text-sm ml-1">/night</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Amenities Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1 h-5 bg-linear-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                                    <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                        Whats Included
                                    </h5>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {room.roomAmenities.slice(0, 6).map((item, index) => (
                                        <div
                                            key={item.id || index}
                                            className="flex items-center gap-2 py-2 px-2 rounded-lg bg-gray-50 hover:bg-cyan-50 transition-all duration-200 group"
                                        >
                                            <div className="shrink-0 w-5 h-5 rounded-full bg-cyan-100 group-hover:bg-cyan-200 flex items-center justify-center transition-colors">
                                                <IoCheckmark className="size-3 text-cyan-600" />
                                            </div>
                                            <span className="text-gray-700 text-xs font-medium truncate">
                                                {item.Amenities.name}
                                            </span>
                                        </div>
                                    ))}
                                    {room.roomAmenities.length > 6 && (
                                        <div className="text-xs text-cyan-500 font-medium mt-1 ml-7">
                                            +{room.roomAmenities.length - 6} more
                                        </div>
                                    )}
                                </div>
                            </div>

                            <ReserveForm room={room} disabledDates={disabledDates} />
                            <p className="text-xs text-gray-400 text-center mt-3">
                                No credit card required • Free cancellation
                            </p>

                            {/* Divider */}
                            <div className="border-t border-gray-100"></div>

                            {/* Total Price Preview */}
                            {/* <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Base price (1 night)</span>
                                    <span className="text-gray-800 font-medium">{formatCurrency(room.price)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Taxes & fees</span>
                                    <span className="text-gray-800 font-medium">Included</span>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="text-xl font-bold text-cyan-600">{formatCurrency(room.price)}</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetail