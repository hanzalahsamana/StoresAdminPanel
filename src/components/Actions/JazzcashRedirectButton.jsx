"use client";

// import React, { useRef } from "react";
// import CryptoJS from "crypto-js";

// const JazzCashRedirectButton = () => {
//   const formRef = useRef(null);

//   const merchantData = {
//     pp_Version: "1.1",
//     pp_TxnType: "MWALLET", // or MPAY / OTC based on type
//     pp_Language: "EN",
//     pp_MerchantID: "MC150798",
//     pp_SubMerchantID: "",
//     pp_Password: "3gx5x3y35v",
//     pp_BankID: "TBANK",
//     pp_ProductID: "RETL",
//     pp_TxnCurrency: "PKR",
//     pp_BillReference: "bill001",
//     pp_Description: "Order Payment",
//     ppmpf_1: "custom1",
//     ppmpf_2: "custom2",
//     ppmpf_3: "custom3",
//     ppmpf_4: "custom4",
//     ppmpf_5: "custom5",
//   };

//   const handleSubmit = () => {
//     const date = new Date();
//     const txnDateTime = formatDate(date);
//     const txnExpiry = formatDate(new Date(date.getTime() + 1 * 60 * 60 * 1000)); // 1 hour later
//     const txnRef = "T" + date.getTime();

//     const pp_Amount = "1000"; // Amount in paisa (1000 = Rs. 10)
//     const pp_ReturnURL = "https://abcd-3.webx.pk/PaymentResponse.aspx";
//     const integritySalt = "7fr8z1d04b"; // Replace with your actual salt

//     const postData = {
//       ...merchantData,
//       pp_TxnRefNo: txnRef,
//       pp_TxnDateTime: txnDateTime,
//       pp_TxnExpiryDateTime: txnExpiry,
//       pp_Amount,
//       pp_ReturnURL,
//       pp_CustomerMobile: "03001234567",
//       pp_CustomerEmail: "test@test.com",
//       pp_CustomerID: "TestUser",
//     };

//     // Step 1: Create string for SecureHash
//     const sorted = Object.keys(postData)
//       .sort()
//       .map((key) => `${key}=${postData[key]}`)
//       .join("&");

//     const hashString = `${integritySalt}&${sorted}`;

//     // Step 2: Generate SecureHash using SHA256
//     const hash = CryptoJS.HmacSHA256(hashString, integritySalt).toString(CryptoJS.enc.Hex);

//     postData["pp_SecureHash"] = hash;

//     // Step 3: Create form and append fields
//     const form = formRef.current;
//     form.innerHTML = ""; // Clear old inputs

//     for (const key in postData) {
//       const input = document.createElement("input");
//       input.type = "hidden";
//       input.name = key;
//       input.value = postData[key];
//       form.appendChild(input);
//     }

//     // Step 4: Submit to JazzCash URL
//     form.action = "https://sandbox.jazzcash.com.pk/CustomerPortal/TransactionManagement/DoTransaction";
//     form.method = "POST";
//     form.submit();
//   };

//   const formatDate = (date) => {
//     const pad = (n) => (n < 10 ? "0" + n : n);
//     return (
//       date.getFullYear().toString() +
//       pad(date.getMonth() + 1) +
//       pad(date.getDate()) +
//       pad(date.getHours()) +
//       pad(date.getMinutes()) +
//       pad(date.getSeconds())
//     );
//   };

//   return (
//     <>
//       <form ref={formRef} />
//       <button onClick={handleSubmit} className="btn-pay">Pay with JazzCash</button>
//     </>
//   );
// };

// export default JazzCashRedirectButton;


import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const JazzCashForm = () => {
  const [formData, setFormData] = useState({
    pp_Version: '1.1',
    pp_TxnType: '',
    pp_MerchantID: 'MC150798',
    pp_Language: 'EN',
    pp_SubMerchantID: '',
    pp_Password: '3gx5x3y35v',
    pp_TxnRefNo: 'T20250618130413',
    pp_Amount: '10000',
    pp_DiscountedAmount: '',
    pp_DiscountBank: '',
    pp_TxnCurrency: 'PKR',
    pp_TxnDateTime: '20250618130444',
    pp_TxnExpiryDateTime: '20250619130444',
    pp_BillReference: 'billRef',
    pp_Description: 'Description of transaction',
    pp_ReturnURL: 'https://dev.xperiode.com/store/683e8be81cd7939b6e016b92/payment/responce',
    pp_SecureHash: '',
    ppmpf_1: '03123456789',
    ppmpf_2: '2',
    ppmpf_3: '3',
    ppmpf_4: '4',
    ppmpf_5: '5'
  });

  const [salt] = useState('xvb2v39vzz');
  const [hashString, setHashString] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const buildHashString = () => {
    let hs = salt + '&';

    const fields = [
      'pp_Amount', 'pp_BillReference', 'pp_Description', 'pp_Language', 'pp_MerchantID',
      'pp_Password', 'pp_ReturnURL', 'pp_SubMerchantID', 'pp_TxnCurrency',
      'pp_TxnDateTime', 'pp_TxnExpiryDateTime', 'pp_TxnRefNo', 'pp_TxnType',
      'pp_Version', 'ppmpf_1', 'ppmpf_2', 'ppmpf_3', 'ppmpf_4', 'ppmpf_5'
    ];

    fields.forEach(field => {
      if (formData[field]) hs += `${formData[field]}&`;
    });

    hs = hs.slice(0, -1); // Remove trailing &
    setHashString(hs);
    return hs;
  };

  const handleSubmit = () => {
    const hashString = buildHashString();
    const hash = CryptoJS.HmacSHA256(hashString, salt);
    const hashHex = hash.toString(CryptoJS.enc.Hex);

    setFormData(prev => ({ ...prev, pp_SecureHash: hashHex }));

    // Create & submit form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/';

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <h3>JazzCash HTTP POST (React)</h3>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="formFielWrapper">
          <label>{key}:</label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            readOnly={['pp_Version', 'pp_MerchantID', 'pp_Language', 'pp_Password'].includes(key)}
          />
        </div>
      ))}

      <div className="formFielWrapper">
        <label>Salt:</label>
        <input type="text" value={salt} readOnly />
      </div>

      <div className="formFielWrapper">
        <label>Hash String:</label>
        <input type="text" value={hashString} readOnly />
      </div>

      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default JazzCashForm;