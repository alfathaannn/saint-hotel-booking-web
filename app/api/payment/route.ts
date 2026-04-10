import { NextRequest, NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { reservationProps } from "@/types/reservation";

const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
})

export const POST = async (request: Request) => {
    const reservation: reservationProps = await request.json();
    try {
        const parameter = {
            transaction_details: {
                order_id: reservation.id,
                gross_amount: reservation.payment?.amount || 0,
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                email: reservation.User.email,
                first_name: reservation.User.name,
            },
        }
        const token = await snap.createTransactionToken(parameter);
        return NextResponse.json({ token });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
    }
}