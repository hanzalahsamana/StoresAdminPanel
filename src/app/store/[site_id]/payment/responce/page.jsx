"use client";

import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/loader';

export default function PaymentResponse() {
    const router = useRouter();

    useEffect(() => {
        // if (!router.isReady) return;

        const query = router.query;

        const processPayment = async () => {
            console.log("abcdefghijklmnopqrst");

            console.log(query);

            if (!query) return

            const { pp_ResponseCode, pp_TxnRefNo } = query;

            console.log(pp_ResponseCode, pp_TxnRefNo);


            // ✅ Call your backend API to update order/payment status
            await axios.post('/api/payment/verify', query);

            // if (pp_ResponseCode === '000') {
            //     router.replace(`/thank-you?orderId=${pp_TxnRefNo}`);
            // } else {
            //     router.replace(`/checkout?error=Payment Failed`);
            // }
        };

        processPayment();
    }, [router]);

    return <Loader content={'Processing Payment ...'} />;
}
