"use client";
import React, { useState, useActionState } from 'react'
import { addDays } from 'date-fns'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { createReserve } from '@/lib/action';
import { RoomDetailProps, DisabledDateProps } from '@/types/room';
import clsx from 'clsx';

const ReserveForm = ({
    room,
    disabledDates
}: {
    room: RoomDetailProps,
    disabledDates: DisabledDateProps[]
}) => {
    const StartDate = new Date();
    const EndDate = addDays(StartDate, 1);

    const [startDate, setStartDate] = useState<Date | null>(StartDate);
    const [endDate, setEndDate] = useState<Date | null>(EndDate);

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    const [state, formAction, isPending] = useActionState(createReserve.bind(null, room.id, room.price, startDate || StartDate, endDate || EndDate), null);

    // Format tanggal untuk ditampilkan di input
    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    // Nilai yang akan ditampilkan di input datepicker
    const displayValue = startDate && endDate 
        ? `${formatDate(startDate)} - ${formatDate(endDate)}`
        : '';

    const excludeDates = disabledDates.map(item => ({
        start: item.startDate,
        end: item.endDate
    }));

    return (
        <form action={formAction} className="space-y-1">

            {/* Divider */}
            <div className="border-t border-gray-100 mb-2"></div>
            
            {/* Date Picker */}
            <div className='flex flex-col justify-center items-center'>
                <label className="block mb-3 text-sm font-semibold text-gray-700">
                    Arrival - Departure
                </label> 
                <div className="relative">
                    <DatePicker
                        selected={startDate}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        onChange={handleDateChange}
                        selectsRange={true}
                        dateFormat="dd MMMM yyyy"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer"
                        calendarClassName="shadow-xl border-0 rounded-xl"
                        dayClassName={() => "hover:bg-cyan-100 transition-colors"}
                        weekDayClassName={() => "text-gray-500 font-medium text-xs"}
                        monthClassName={() => "text-gray-800 font-semibold"}
                        placeholderText="Pilih tanggal"
                        value={displayValue}
                        excludeDateIntervals={excludeDates}
                    />
                </div>
                <div className="h-5 mt-1" aria-live='polite' aria-atomic='true'>
                    <p className='text-sm text-red-500'>{state?.messageDate}</p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-2"></div>
            
            {/* Name Input */}
            <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Your Name
                </label>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                />
                <div className="h-5 mt-1" aria-live='polite' aria-atomic='true'>
                    <p className='text-sm text-red-500'>{state?.errors?.name}</p>
                </div>
            </div>
            
            {/* Phone Input */}
            <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Phone Number
                </label>
                <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Phone Number" 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white placeholder:text-gray-400"
                />
                <div className="h-5 mt-1" aria-live='polite' aria-atomic='true'>
                    <p className='text-sm text-red-500'>{state?.errors?.phone}</p>
                </div>
            </div>

            {/* Submit Button */}
            <div aria-live='polite' aria-atomic='true'>
                <p className='text-sm text-red-500 mb-2'>{state?.message}</p>
            </div>
            <button 
                type='submit' 
                disabled={isPending}
                className={clsx(
                    "w-full bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
                    isPending && "opacity-50 cursor-not-allowed"
                )}
            >
                {isPending ? 'Processing...' : 'Reserve Now'}
            </button>
        </form>
    )
}

export default ReserveForm