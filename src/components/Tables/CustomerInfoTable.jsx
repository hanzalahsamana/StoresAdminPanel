import React from 'react';

const CustomerInfoTable = ({ order }) => {
  const { customerInfo } = order;
  const { address, apartment, city, country, email, firstName, lastName, method, phone, postalCode } = customerInfo;

  const customerData = [
    { label: 'Address', value: address },
    { label: 'Appartment', value: apartment },
    { label: 'City', value: city },
    { label: 'Country', value: country },
    { label: 'Email', value: email },
    { label: 'First Name', value: firstName },
    { label: 'Last Name', value: lastName },
    { label: 'Method', value: method },
    { label: 'Phone', value: phone },
    { label: 'Postal Code', value: postalCode },
  ];

  return (
    <div className="h-[100%] flex flex-col justify-between gap-y-2">
      <h1 className="text-black text-[20px] font-semibold">Order Details</h1>
      {customerData.length > 0 &&
        customerData?.map((item, index) => {
          return (
            <div className="py-[16px] flex justify-between items-center border-b border-borderC" key={index}>
              <p className="text-textC text-[16px] font-semibold ">{item?.label}</p>
              <p className="text-[16px] text-[#6b7280]">{item?.value}</p>
            </div>
          );
        })}
    </div>
  );
};

export default CustomerInfoTable;
