"use client";

import { useRouter } from "next/navigation";
import { FiXCircle } from "react-icons/fi";

export default function PaymentFailedPage() {
    const router = useRouter();

    return (
        <div className="min-h-[90vh] w-full flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
                <div className="flex justify-center mb-4 text-red-500 text-5xl">
                    <FiXCircle />
                </div>
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                    Your payment has failed
                </h1>
                <p className="text-gray-600 mb-8">
                    Please choose how you'd like to proceed with your order.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => router.push("/cancel-order")}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition"
                    >
                        Cancel Order
                    </button>
                    <button
                        onClick={() => router.push("/place-order-cod")}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-3 px-6 rounded-lg transition"
                    >
                        Place Order with Cash on Delivery
                    </button>
                    <button
                        onClick={() => router.push("/retry-payment")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition"
                    >
                        Retry Payment
                    </button>

                </div>
                <p className="text-gray-600 mb-8">
                    Please choose how you'd like to proceed with your order.
                </p>
            </div>
        </div>
    );
}
