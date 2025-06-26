import React, { useRef } from 'react';

const EasypaisaPostCheckout = () => {
  const formRef = useRef(null);

  const handleSubmit = () => {
    // Submit the form (redirects to Easypaisa)
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <div>
      <h2>Easypaisa POST Method Checkout</h2>

      <form
        ref={formRef}
        method="post"
        action="https://easypaystg.easypaisa.com.pk/easypay/Index.jsf"
      >
        <input type="hidden" name="storeId" value="99999" />
        <input type="hidden" name="amount" value="500.0" />
        <input type="hidden" name="postBackURL" value="https://yourdomain.com/callback" />
        <input type="hidden" name="orderRefNum" value="MS5007" />
        <input
          type="hidden"
          name="merchantHashedReq"
          value="uUqa0sZUkZrAZE0F/YFtVOm1c6KcoQkoU8GJ0ZpF8qM=" // sample hash
        />
        <input type="hidden" name="paymentMethod" value="MA_PAYMENT_METHOD" />
        <input type="hidden" name="autoRedirect" value="1" />
        <input type="hidden" name="emailAddr" value="test@demo.com" />
        <input type="hidden" name="mobileNum" value="03001234567" />
        <input type="hidden" name="expiryDate" value="20251231 235959" />
        <input type="hidden" name="bankIdentifier" value="" />
      </form>

      <button
        className="border p-2 bg-green-100 text-green-600"
        onClick={handleSubmit}
      >
        Proceed to Easypay
      </button>
    </div>
  );
};

export default EasypaisaPostCheckout;
