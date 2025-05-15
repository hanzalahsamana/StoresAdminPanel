"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteCartData } from "@/Redux/CartData/cartDataSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/TemplateLoader";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";
import { addOrderDataApi } from "@/APIs/Order/PlaceOrder";
import FormInput from "@/components/Forms/FormInput";
import { paymentFormValidate } from "@/Utils/FormsValidator";


const initialFormData = {
  email: "",
  country: "",
  firstName: "",
  lastName: "",
  address: "",
  appartment: "",
  city: "",
  postalCode: "",
  phone: "",
}


const PaymentForm = ({ shipping, total, tax, discount, cartItem }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const { siteName } = useSelector((state) => state.siteName);
  const SiteLogo = useSelector((state) =>
    selectPageByType(state, "Site Logo")
  );
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paymentFormValidate(formData, setErrors)) {
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
      from: siteName,
      to: SiteLogo?.image,
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
      await addOrderDataApi(siteName, data);
      dispatch(deleteCartData({ siteName }))
      localStorage.removeItem('cartId')
      setFormData(initialFormData);
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
    <div className="w-full bg-[var(--tmp-pri)] flex flex-col items-end max-[750px]:items-center py-[45px] px-[30px]">
      <div className="max-w-[500px] w-full">
        <form onSubmit={handleSubmit} className="flex flex-wrap">

          <div className="w-full ">
            <h2 className="text-[24px] font-medium mb-4 text-[var(--tmp-txt)]">Payment</h2>
            <p className="text-[var(--tmp-ltxt)] mb-4">
              All transactions are secure and encrypted.
            </p>
            <div className="cursor-pointer h-[50px] pl-[20px] border-[1px] flex items-center rounded-md border-[blue] bg-[#e9f0fc] ">
              Cash on Delivery (COD)
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-[24px] font-medium my-4 text-[var(--tmp-txt)]">Contact</h2>

            <FormInput
            size="large"
              type="email"
              placeholder="Email"
              name={"email"}
              value={formData?.email}
              handleChange={handleChange}
              error={errors?.email}
            />
          </div>
          <div className="w-full flex flex-col space-y-[18px]">
            <h3 className="text-[24px] font-medium mb-6 mt-3 text-[var(--tmp-txt)]">Billing address</h3>

            <FormInput
            size="large"
              placeholder="Country"
              handleChange={handleChange}
              name={"country"}
              error={errors?.country}
              value={formData?.country}
            />

            <div className="flex gap-[10px] w-full">
              <FormInput
              size="large"
                placeholder="First Name"
                handleChange={handleChange}
                name={"firstName"}
                error={errors?.firstName}
                value={formData?.firstName}
              />
              <FormInput
              size="large"
                placeholder="Last Name"
                handleChange={handleChange}
                name={"lastName"}
                error={errors?.lastName}
                value={formData?.lastName}
              />
            </div>
            <FormInput
            size="large"
              placeholder="Address"
              handleChange={handleChange}
              name={"address"}
              error={errors?.address}
              value={formData?.address}
            />
            <FormInput
            size="large"
              placeholder="Appartment"
              handleChange={handleChange}
              name={"appartment"}
              error={errors?.appartment}
              value={formData?.appartment}
              required={false}
            />
            <div className="flex gap-[10px] w-full">
              <FormInput
              size="large"
                placeholder="City"
                handleChange={handleChange}
                name={"city"}
                error={errors?.city}
                value={formData?.city}
              />
              <FormInput
              size="large"
                type="number"
                placeholder="Postal Code"
                handleChange={handleChange}
                name={"postalCode"}
                error={errors?.postalCode}
                value={formData?.postalCode}
                required={false}
              />
            </div>
            <FormInput
            size="large"
              type="tel"
              placeholder="Phone"
              handleChange={handleChange}
              name={"phone"}
              error={errors?.phone}
              value={formData?.phone}
            />
          </div>
          <button className="py-[14px] w-full mt-3 bg-[#407fc4] text-[var(--tmp-wtxt)] text-[22px] font-semibold rounded-md transition-all duration-300 hover:scale-105">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
