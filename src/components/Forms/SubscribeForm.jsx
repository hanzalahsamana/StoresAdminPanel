'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormInput from './FormInput';
import { addSubscriber } from '@/APIs/Customer/Subscriber';
import { GoArrowRight } from 'react-icons/go';
import { CgSpinner } from 'react-icons/cg';
import TemplateFormInput from './TemplateFormInput';
import Button from '../Actions/Button';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { siteName } = useSelector((state) => state.siteName);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!email) {
      setError('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setLoading(true);

    try {
      await addSubscriber(siteName, email);
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3 max-w-[400px] mt-4">
      <FormInput
        value={email}
        size="large"
        onChange={(e) => {
          setError(null);
          setEmail(e.target.value);
        }}
        placeholder="Enter your email"
        error={error}
        autocomplete="off"
        suffix={
          <Button
            type="submit"
            disabled={loading}
            className="!w-max !max-w-max !min-w-max "
            variant='text'
            label=''
            icon={<GoArrowRight className="text-[24px]" />}
            loading={loading}
          />
        }
        isStore={true}
        className="bg-[var(--tmp-pri)]"
      />
    </form>
  );
};

export default SubscribeForm;
