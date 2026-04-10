import React from 'react'
import CheckoutDetail from '@/components/checkout/checkout-detail'
import { Suspense } from 'react'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
    title: "Checkout",
    description: "Checkout",
}

const CheckoutPage = async ({ params }: { params: { id: string } }) => {
    const reservationId = (await params).id;
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-12">
            <Suspense fallback={<div>Loading...</div>}>
                <CheckoutDetail reservationId={reservationId} />
            </Suspense>
            <Script
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
                strategy='lazyOnload'
            />
        </div>
    )
}

export default CheckoutPage