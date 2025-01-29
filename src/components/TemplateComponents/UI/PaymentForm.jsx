"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Input } from "postcss";
import { toast } from "react-toastify";
import { clearCartData, deleteCartData } from "@/Redux/CartData/cartDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { addOrderDataApi } from "@/Apis/PlaceOrder";
import { SITE_NAME } from "../../../config";
import { selectPageByType } from "@/Redux/PagesContent/PagesContentSlice";
import Loader from "./loader";
import FormInput from "./formInput";

const PaymentForm = ({ shipping, total, tax, discount, cartItem }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    appartment: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const SiteLogo = useSelector((state) =>
    selectPageByType(state, "Site Logo")
  );

  const validateForm = () => {
    const newErrors = {};
    const { email, country, firstName, lastName, address, city, phone } =
      formData;

    if (!email) newErrors.email = "email is required";
    if (!country) newErrors.country = "Country is required";
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!address) newErrors.address = "Address is required";
    if (!city) newErrors.city = "City is required";
    if (!phone) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const {
      email,
      country,
      firstName,
      lastName,
      address,
      appartment,
      city,
      postalCode,
      phone,
    } = formData;
    const extractedData = cartItem.map(({ name, quantity, selectedSize, discountedPrice, _id, images }) => ({
      name,
      selectedSize,
      _id,
      image: images[0],
      quantity,
      totalOfProduct: discountedPrice * quantity,
    }));

    const data = {
      from: SITE_NAME,
      to: SiteLogo?.image, //temporary
      customerInfo: {
        email,
        firstName,
        lastName,
        phone,
        method: 'COD',
        city,
        country,
        address,
        postalCode,
        appartment,
      },
      orderData: extractedData,
      orderInfo: {
        tax: tax,
        shipping: shipping,
        discount: discount,
        total: total,
      },
    };

    try {
      setLoading(true)
      await addOrderDataApi(data);
      dispatch(deleteCartData())
      localStorage.removeItem('cartId')
      setFormData({
        email: '',
        country: "",
        firstName: "",
        lastName: "",
        address: "",
        appartment: "",
        city: "",
        postalCode: "",
        phone: "",
      });
      setErrors({});
      setLoading(false)
      toast.success("Your order has confirmed and will deliverd in 2 to 3 working days")
    } catch (err) {
      setLoading(false)
      toast.error("Error sending email:", err)
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div className="w-full flex flex-col items-end max-[750px]:items-center py-[45px] px-[30px]">
      <div className="max-w-[500px] w-full">
        <form onSubmit={handleSubmit} className="flex flex-wrap">

          <div className="w-full">
            <h2 className="text-[24px] font-medium mb-4">Payment</h2>
            <p className="text-gray-500 mb-4">
              All transactions are secure and encrypted.
            </p>
            <div className="cursor-pointer h-[50px] pl-[20px] border-[1px] flex items-center rounded-md border-[blue] bg-[#e9f0fc] ">
              Cash on Delivery (COD)
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-[24px] font-medium my-4">Contact</h2>

            <FormInput
              type="email"
              placeholder="Email"
              handleChange={handleChange}
              field={"email"}
              errors={errors}
              formData={formData}
            />
          </div>
          <div className="w-full">
            <h3 className="text-[24px] font-medium mb-6 mt-3">Billing address</h3>
            <FormInput
              type="text"
              placeholder="Country"
              handleChange={handleChange}
              field={"country"}
              errors={errors}
              formData={formData}
            />
            <div className="flex gap-[10px] w-full">
              <FormInput
                type="text"
                placeholder="First Name"
                handleChange={handleChange}
                field={"firstName"}
                errors={errors}
                formData={formData}
              />
              <FormInput
                type="text"
                placeholder="Last Name"
                handleChange={handleChange}
                field={"lastName"}
                errors={errors}
                formData={formData}
              />
            </div>
            <FormInput
              type="text"
              placeholder="Address"
              handleChange={handleChange}
              field={"address"}
              errors={errors}
              formData={formData}
            />
            <FormInput
              type="text"
              placeholder="Appartment (Optional)"
              handleChange={handleChange}
              field={"appartment"}
              errors={errors}
              formData={formData}
            />
            <div className="flex gap-[10px] w-full">
              <FormInput
                type="text"
                placeholder="City"
                handleChange={handleChange}
                field={"city"}
                errors={errors}
                formData={formData}
              />
              <FormInput
                type="number"
                placeholder="Postal Code (Optional)"
                handleChange={handleChange}
                field={"postalCode"}
                errors={errors}
                formData={formData}
              />
            </div>
            <FormInput
              type="tel"
              placeholder="Phone"
              handleChange={handleChange}
              field={"phone"}
              errors={errors}
              formData={formData}
            />
          </div>
          <button className="py-[20px] w-full mt-3 bg-[#407fc4] text-[#e6e6e6] text-[18px] font-semibold rounded-md transition-all duration-300 hover:scale-105">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
