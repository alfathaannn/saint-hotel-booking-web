"use client"

import { useTransition } from 'react'
import { reservationProps } from '@/types/reservation'

declare global {
    interface Window {
        snap: {
            pay: (token: string) => void;
        }
    }
}

const PaymentButton = ({ reservation }: { reservation: reservationProps }) => {
  const [isPending, startTransition] = useTransition();
  const handlePayment = async () => {
    startTransition(async () => {
        try {
            const response = await fetch('/api/payment', {
                method: 'POST',
                body:JSON.stringify(reservation)
            });
            const {token} = await response.json();
            if(token) {
                window.snap.pay(token);
            }
        } catch (error) {
            console.log(error);
        }
      
    })
  }
  return (
    <button onClick={handlePayment} className='mt-6 w-full px-6 py-3 bg-linear-to-r from-cyan-400 to-cyan-500 text-white font-semibold rounded-xl hover:from-cyan-500 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg'>
        {isPending ? "Processing..." : "Process Payment"}
    </button>
  )
}

export default PaymentButton