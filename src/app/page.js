"use client";
import React from "react";

const JazzCashRedirectButton = () => {
  const handleJazzCashPayment = async () => {
    try {
      const response = await fetch("http://localhost:1234/api/v1/jazzcash-initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 500 }), // Change to dynamic if needed
      });

      const data = await response.json();

      // Create form
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://sandbox.jazzcash.com.pk/CustomerPortal/TransactionManagement/TransactionSelection";

      for (const key in data) {
        if (data[key] !== null && data[key] !== undefined) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = data[key];
          form.appendChild(input);
        }
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <button onClick={handleJazzCashPayment} className="bg-green-600 text-white px-4 py-2 rounded">
      Pay with JazzCash
    </button>
  );
};

export default JazzCashRedirectButton;
