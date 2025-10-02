'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { verifyOtp } from '@/APIs/Auth/verifyOTP';
import { SendOTP } from '@/APIs/Auth/sendOTP';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/loader';
import UnProtectedRoute from '@/AuthenticRouting/UnProtectedRoutes';
import Form from '@/components/Forms/Form';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/Redux/Authentication/AuthSlice';

const OtpVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [email, setEmail] = useState(null);
  const inputRefs = useRef([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('emailForVerify');
      if (!savedEmail) router.push('/authentication/register');
      setEmail(savedEmail);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (email) handleResendOtp();
  }, [email]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    if (otp.every((digit) => digit !== '')) handleVerifyOtp();
  }, [otp]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === 'ArrowRight' && index < otp.length - 1) inputRefs.current[index + 1]?.focus();
    if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return toast.error(`Resend OTP in ${cooldown} seconds.`);

    setResendLoading(true);
    try {
      const response = await SendOTP({ email });
      toast.success('A new OTP has been sent.');
      setCooldown(response.remainingTime || 120);
    } catch (error) {
      const { errorCode, message, remainingTime } = error.response?.data || {};

      if (errorCode === 'OtpCooldown') return setCooldown(remainingTime);
      if (errorCode === 'UserNotFound') {
        localStorage.removeItem('emailForVerify');
        return router.push('/authentication/register');
      }

      if (errorCode === 'AlreadyVerified') {
        localStorage.removeItem('emailForVerify');
        return router.push('/authentication/login');
      }
      console.error(error);
      toast.error(message || 'Something went wrong!');
    } finally {
      setResendLoading(false);
    }
  };
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const { token, user } = await verifyOtp({ email, otp: otp.join('') });
      localStorage.removeItem('emailForVerify');
      localStorage.setItem('userToken', JSON.stringify(token));
      dispatch(setCurrentUser({ token, ...user }));
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || error.message);
      if (error.response?.data?.errorCode === 'OTP_EXPIRED') setCooldown(0);
    }
  };

  return (
    <UnProtectedRoute>
      <div className="min-h-screen p-4 flex items-center justify-center bg-secondaryC">
        <Form handleSubmit={handleVerifyOtp} buttonLabel={'Verify OTP'} label={'OTP Verification'} loading={loading || resendLoading} className="w-max">
          <p className=" text-gray-600">
            OTP sent to: <b>{email}</b>
          </p>
          <button
            onClick={handleResendOtp}
            disabled={resendLoading || cooldown > 0}
            className={`mt-4 text-sm ${resendLoading || cooldown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-primaryC'}`}
          >
            {resendLoading ? 'Resending...' : cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
          </button>
          <div className=" space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryC"
              />
            ))}
          </div>
        </Form>
      </div>
    </UnProtectedRoute>
  );
};

export default OtpVerification;
