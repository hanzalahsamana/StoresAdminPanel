"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/APIs/Auth/verifyOtp";
import { toast } from "react-toastify";
import { SendOTP } from "@/APIs/Auth/addUser";
import Loader from "@/components/loader";

const OtpVerification = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(true);
    const [resendLoading, setResendLoading] = useState(false);
    const [cooldown, setCooldown] = useState(4);
    const inputRefs = useRef([]);
    const router = useRouter();

    const [email, setEmail] = useState(null);

    useEffect(() => {
        // Check if running on the client side
        if (typeof window !== "undefined") {
            console.log("ghus gaya");
            setLoading(false)

            const savedEmail = localStorage.getItem("emailForVerify");
            setEmail(savedEmail); // Set email from localStorage
            if (!savedEmail) {
                console.log(email);

                router.push("/authentication/register");
            }
        }
    }, []);

    useEffect(() => {
        if (!email && !loading) {
            router.push("/authentication/register");
        }
    }, [email]);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [cooldown]);

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "") {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        } else if (e.key === "ArrowRight" && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const otpCode = otp.join("");

        try {
            await verifyOtp({ email, otp: otpCode })
            localStorage.removeItem("emailForVerify");
            // router.push("/login");
            console.log("⚱️dangerous 📟");

        } catch (error) {
            console.log("⚱️", error);
            toast.error(error.response ? error.response.data.message : error.message)

            if (error?.response?.data?.errorCode === "OTP_EXPIRED") {
                setCooldown(0);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (cooldown > 0) {
            toast.error("You can resend the OTP only after the cooldown.")
            return;
        }
        setResendLoading(true);
        try {
            await SendOTP({ email, isResend: true });
            toast.success("A new OTP has been sent to your email.")
            setCooldown(120);
        } catch (error) {
            console.error(error.message);
            toast.error(error.response ? error.response.data.message : error.message)

        } finally {
            setResendLoading(false);
        }
    };

    if (loading) {
        <Loader />
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col p-[25px] bg-white rounded-md items-center justify-center mt-8 shadow-lg">
                <h2 className="text-2xl font-semibold">OTP Verification</h2>
                <p className="mt-[20px] w-full text-start text-[#414141] text-[14px]">OTP sent to:{" "} <b>{email}</b></p>
                <div className="py-[20px] flex justify-start w-full">
                    <button
                        onClick={handleResendOtp}
                        disabled={resendLoading || cooldown > 0}
                        className={` ${resendLoading || cooldown > 0
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-indigo-500"
                            }`}
                    >
                        {resendLoading
                            ? "Resending..."
                            : cooldown > 0
                                ? `Resend OTP in ${cooldown}s`
                                : "Resend OTP"}
                    </button>
                </div>
                <form onSubmit={handleVerifyOtp}>
                    <div className="flex space-x-2 justify-center py-[10px]">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        ))}
                    </div>

                    <div className="mt-6 w-full">
                        <button
                            type="submit"
                            disabled={loading || otp.includes("")}
                            className={`px-6 py-3 w-full rounded-sm font-semibold  ${loading || otp.includes("") ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-indigo-500 text-white hover:bg-indigo-600"
                                }`}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OtpVerification;
