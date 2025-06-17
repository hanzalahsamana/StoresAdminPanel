"use client";
import React from "react";
import moment from "moment";
import HmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";

const JazzCashRedirectButton = () => {
  const handleJazzCashPayment = () => {
    const amountRupees = 500;
    const amount = (amountRupees * 100).toString(); // to paisas

    const integritySalt = "xvb2v39vzz"; // Your shared secret
    const merchantId = "MC150798";
    const password = "3gx5x3y35v"; // used only in hash
    const returnURL = "https://abcd-3.webx.pk/PaymentResponse.aspx";

    const txnRef = `T${moment().format("YYYYMMDDHHmmss")}`;
    const txnDateTime = moment().format("YYYYMMDDHHmmss");
    const txnExpiry = moment().add(1, "days").format("YYYYMMDDHHmmss");

    const payload = {
      pp_Version: "1.1",
      pp_TxnType: "MWALLET",
      pp_Language: "EN",
      pp_MerchantID: merchantId,
      pp_SubMerchantID: "",
      pp_Password: password, // Include this only for hashing
      pp_TxnRefNo: txnRef,
      pp_Amount: amount,
      pp_TxnCurrency: "PKR",
      pp_TxnDateTime: txnDateTime,
      pp_BillReference: "billRef123",
      pp_Description: "Test Payment",
      pp_TxnExpiryDateTime: txnExpiry,
      pp_ReturnURL: returnURL,
    };

    // Prepare string for hashing
    const filteredForHash = Object.entries(payload)
      .filter(([_, v]) => v !== "" && v !== null && v !== undefined)
      .reduce((obj, [k, v]) => {
        obj[k] = v;
        return obj;
      }, {});

    const sortedKeys = Object.keys(filteredForHash).sort();
    const stringToHash =
      integritySalt + "&" + sortedKeys.map((k) => filteredForHash[k]).join("&");

    const secureHash = HmacSHA256(stringToHash, integritySalt)
      .toString(Hex)
      .toUpperCase();

    // Add secure hash & remove password before sending
    payload.pp_SecureHash = secureHash;
    delete payload.pp_Password;

    // Create form and submit
    const form = document.createElement("form");
    form.method = "POST";
    form.action =
      "https://sandbox.jazzcash.com.pk/CustomerPortal/TransactionManagement/TransactionSelection";

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button
      onClick={handleJazzCashPayment}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Pay with JazzCash
    </button>
  );
};

export default JazzCashRedirectButton;
