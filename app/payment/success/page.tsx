import Link from "next/link";
import { IoCheckmarkCircle, IoReceiptOutline, IoHomeOutline } from "react-icons/io5";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment Success | Booking Confirmed",
    description: "Your payment has been successfully processed and your booking is confirmed",
};

const PaymentSuccess = async ({ searchParams }: { searchParams: Promise<{ transaction_status: string }> }) => {
    const paymentStatus = (await searchParams).transaction_status;
    if (paymentStatus === "pending") redirect('/payment/pending');
    if (paymentStatus === "failure") redirect('/payment/failure');
    
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-14">
            <div className="max-w-lg">
                {/* Success Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Header Section */}
                    <div className="px-8 pt-8 pb-6 text-center border-b border-gray-100">
                        <div className="inline-flex items-center justify-center bg-green-50 rounded-full mb-4">
                            <IoCheckmarkCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Booking Confirmed!
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Your reservation has been successfully processed
                        </p>
                    </div>

                    {/* Content */}
                    <div className="px-8 py-6">
                        {/* Success Message */}
                        <div className="mb-6">
                            <div className="bg-green-50 rounded-xl p-4">
                                <p className="text-green-800 text-sm font-medium text-center">
                                    ✓ Payment received successfully
                                </p>
                                <p className="text-green-600 text-xs text-center mt-1">
                                    Booking confirmation sent to your email
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 bg-white text-gray-400">Next Steps</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 mt-6">
                            <Link
                                href="/myreservation"
                                className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200"
                            >
                                <IoReceiptOutline className="w-4 h-4" />
                                View My Reservations
                            </Link>

                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 w-full text-cyan-500 hover:text-cyan-600 font-medium py-2 px-6 rounded-xl transition-all duration-200 text-sm"
                            >
                                <IoHomeOutline className="w-4 h-4" />
                                Back to Homepage
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Support Footer */}
                <div className="text-center mt-6 space-y-2">
                    <p className="text-xs text-gray-400">
                        A confirmation email has been sent to your registered email address
                    </p>
                    <p className="text-xs text-gray-400">
                        Need help?{" "}
                        <Link href="/contact" className="text-cyan-600 hover:text-cyan-700 font-medium">
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;