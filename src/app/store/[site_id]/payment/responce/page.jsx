"use client";

import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/loader';

export default function PaymentResponse() {
    const router = useRouter();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const query = Object.fromEntries(searchParams.entries());

        console.log("JazzCash response query:", query);

        if (!query) return;

        const processPayment = async () => {
            const { pp_ResponseCode, pp_TxnRefNo } = query;

            // ✅ Update order/payment on backend
            console.log(pp_ResponseCode, pp_TxnRefNo)
            await axios.post('/api/payment/verify', query);

            // if (pp_ResponseCode === '000') {
            //     router.replace(`/thank-you?orderId=${pp_TxnRefNo}`);
            // } else {
            //     router.replace(`/checkout?error=Payment Failed`);
            // }
        };

        processPayment();
    }, [router]);

    return <Loader content="Processing Payment ..." />;
}
