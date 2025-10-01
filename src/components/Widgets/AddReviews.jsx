'use client';

import React, { useEffect, useState } from 'react';
import StarRating from '../UI/starRating';
import './style.css';
import { addReview, getReview } from '@/APIs/Customer/Review';
import { toast } from 'react-toastify';
import TemplateFormInput from '../Forms/TemplateFormInput';
import ButtonLoader from '../Loader/ButtonLoader';
import FormInput from '../Forms/FormInput';
import Button from '../Actions/Button';

const AddReviews = ({ storeId, productSlug, setReviewInState }) => {
  const [reviewData, setReviewData] = useState({
    reviewTitle: '',
    rating: 3,
    message: '',
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setReviewData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!reviewData.name.trim()) newErrors.name = 'Name is required.';
    if (!reviewData.email.trim()) newErrors.email = 'Email is required.';
    if (!reviewData.message.trim()) newErrors.message = 'Review message is required.';
    return newErrors;
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const newReview = await addReview(storeId, productSlug, reviewData);
      setReviewInState((prevReviews) => [newReview, ...prevReviews]);

      toast.success('Review submitted successfully!');
      setReviewData({
        reviewTitle: '',
        rating: 3,
        message: '',
        name: '',
        email: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center bg-[var(--tmp-pri)]">
      <div className="max-w-3xl p-5 w-full">
        <h2 className="text-3xl font-semibold text-center text-[var(--tmp-txt)]">Your Feedback Matters!</h2>
        <div className="flex justify-center sm:justify-between items-center my-[20px]">
          <h2 className="hidden sm:flex text-lg text-center text-[var(--tmp-ltxt)]">Write a review for this product</h2>
          <StarRating rating={reviewData.rating} setRating={(star) => handleChange('rating', star)} />
        </div>

        <form onSubmit={handleAddReview} className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="">
              <FormInput
                placeholder="Jhon Doe"
                onChange={(e) => handleChange('name', e.target.value)}
                value={reviewData.name}
                name="name"
                size="large"
                error={errors.name}
                layout="label"
                label="Name"
                isStore={true}
              />
            </div>

            {/* Email */}
            <div className="">
              <FormInput
                placeholder="abc@example.com"
                onChange={(e) => handleChange('email', e.target.value)}
                value={reviewData.email}
                name="email"
                size="large"
                layout="label"
                label="Email"
                error={errors.email}
                isStore={true}
              />
            </div>
          </div>

          {/* Review Title (optional) */}
          <div className="my-4">
            <FormInput
              placeholder="On Time Delivery"
              required={false}
              onChange={(e) => handleChange('reviewTitle', e.target.value)}
              value={reviewData.reviewTitle}
              name="reviewTitle"
              size="large"
              layout="label"
              label="Review Title"
              isStore={true}
            />
          </div>

          {/* Message */}
          <div className="my-4">
            <textarea
              maxLength={300}
              name="message"
              placeholder="Write your review"
              value={reviewData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="reviewInput w-full h-32 px-4 py-2 rounded-[5px] text-[var(--tmp-ltxt)] bg-[var(--tmp-pri)] border-[1.5px] border-[var(--tmp-lBor)] placeholder:text-[var(--tmp-ltxt)] focus:outline-none"
            />
            {errors?.message && <p className="text-red-500 text-xs mt-1">{errors?.message}</p>}
          </div>

          <Button
            disabled={loading}
            type="submit"
            loading={loading}
            variant="store"
            label="Share Your Review"
            className="font-bold transition-all duration-300 hover:scale-105 !h-[50px]"
            size=""
          />
        </form>
      </div>
    </div>
  );
};

export default AddReviews;
