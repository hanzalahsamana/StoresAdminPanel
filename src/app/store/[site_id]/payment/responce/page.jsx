"use client";

import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/loader";

export default function PaymentResponse() {
  const router = useRouter();

  useEffect(() => {
    const txnRefNo = localStorage.getItem("txnRefNo");

    if (!txnRefNo) {
      router.replace("/checkout?error=Missing transaction reference");
      return;
    }

    const verifyPayment = async () => {
      try {
        // 🔁 Call your backend to run inquiry with JazzCash
        const res = await axios.post("/api/payment/inquiry", {
          txnRefNo,
        });

        const { success, orderId } = res.data;

        if (success) {
          router.replace(`/thank-you?orderId=${orderId}`);
        } else {
          router.replace("/checkout?error=Payment verification failed");
        }
      } catch (err) {
        console.error("❌ Inquiry Error:", err);
        router.replace("/checkout?error=Server error");
      }
    };

    verifyPayment();
  }, [router]);

  return <Loader content="Verifying Payment via JazzCash Inquiry..." />;
}

<div className="h-[60px] w-full hidden max-[700px]:flex justify-between items-center">
  <p
    className="flex items-center gap-2 text-[#299ae0]"
    onClick={() => setCartIsVisible(!cartIsVisible)}
  >
    Show Order summary {cartIsVisible ? <FaChevronUp /> : <FaChevronDown />}
  </p>
  <p className="text-[#252525]">Rs {total?.toFixed(2)}</p>
</div>;
