import React from "react";
import { useSelector } from "react-redux";

const CustomerInfo = ({ id }) => {
  const { orders, loading } = useSelector((state) => state?.orderData);
  const order = orders.find((order) => order._id === id);
  const { customerInfo } = order;
  const {
    address,
    appartment,
    city,
    country,
    email,
    firstName,
    lastName,
    method,
    phone,
    postalCode,
  } = customerInfo;

  const customerData = [
    { label: "Address", value: address },
    { label: "Appartment", value: appartment },
    { label: "City", value: city },
    { label: "Country", value: country },
    { label: "Email", value: email },
    { label: "First Name", value: firstName },
    { label: "Last Name", value: lastName },
    { label: "Method", value: method },
    { label: "Phone", value: phone },
    { label: "Postal Code", value: postalCode },
  ];

  return (
    <div className="h-[100%] flex flex-col justify-between gap-y-2">
      {customerData.length > 0 &&
        customerData?.map((item, index) => {
          return (
            <p className="border border-gray-300 bg-gray-100 p-2 rounded-lg">
              <b>{item?.label}:</b>{" "}
              <span className="text-black ml-4">{item?.value || "--"}</span>
            </p>
          );
        })}
    </div>
  );
};

export default CustomerInfo;
