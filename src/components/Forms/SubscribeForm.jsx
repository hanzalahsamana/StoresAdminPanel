'use client';

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormInput from "./FormInput";
import { addSubscriber } from "@/APIs/Customer/Subscriber";
import { GoArrowRight } from "react-icons/go";
import { CgSpinner } from "react-icons/cg";
import TemplateFormInput from "./TemplateFormInput";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { siteName } = useSelector((state) => state.siteName);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      await addSubscriber(siteName, email);
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-3 max-w-[400px] mt-4"
    >
      <TemplateFormInput
        label="Email"
        value={email}
        size="large"
        onChange={(e) => {
          setError(null);
          setEmail(e.target.value);
        }}
        placeholder="Enter your email"
        className="!outline-black !bg-[var(--tmp-sec)] !border-[1.5px] text-[var(--tmp-wtxt)]"
        labelClassname="!bg-[var(--tmp-sec)]"
        error={error}
        autocomplete="off"
        actionIcon={
          <button
            type="submit"
            disabled={loading}
            className="absolute right-0 top-[-3px] text-[#5c5a5a] hover:text-[#7f7b7b] disabled:opacity-50"
          >
            {loading ? (
              <CgSpinner className="text-[24px] animate-spin" />
            ) : (
              <GoArrowRight className="text-[24px]" />
            )}
          </button>
        }
      />

    </form>
  );
};

export default SubscribeForm;
