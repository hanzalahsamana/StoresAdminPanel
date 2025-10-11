import React from "react";
import ContentLoader from "react-content-loader";

const CheckoutLoader = (props) => {
  return (
    <div className="grid grid-cols-2 w-full h-screen">
      {/* LEFT SIDE - Form Details */}
      <div className="bg-[var(--tmp-pri)] h-full overflow-hidden px-3 py-5 border-r">
        <ContentLoader
          speed={1}
          backgroundColor="#e5e7eb"
          foregroundColor="#f3f4f6"
          style={{ width: "100%", height: "100%" }}
          {...props}
        >
          {/* Header */}
          <rect x="80%" y="0" rx="6" ry="6" width="20%" height="20" />

          {/* Section title */}
          <rect x="25%" y="60" rx="6" ry="6" width="20%" height="40" />

          {/* Input fields (Name, Email, Phone, etc.) */}
          <rect x="25%" y="110" rx="6" ry="6" width="70%" height="10" />
          <rect x="25%" y="130" rx="6" ry="6" width="70%" height="10" />
          <rect x="25%" y="150" rx="6" ry="6" width="60%" height="10" />
          <rect x="25%" y="190" rx="6" ry="6" width="75%" height="1" />

          {/* <rect x="25%" y="320" rx="6" ry="6" width="70%" height="18" /> */}

          {/* Input fields (Name, Email, Phone, etc.) */}
          <rect x="25%" y="220" rx="6" ry="6" width="20%" height="40" />

          <rect x="25%" y="270" rx="6" ry="6" width="70%" height="10" />
          <rect x="25%" y="290" rx="6" ry="6" width="70%" height="10" />
          <rect x="25%" y="310" rx="6" ry="6" width="60%" height="10" />
          <rect x="25%" y="350" rx="6" ry="6" width="75%" height="1" />

          <rect x="25%" y="400" rx="6" ry="6" width="70%" height="10" />
          <rect x="25%" y="420" rx="6" ry="6" width="50%" height="10" />


          {/* Payment method cards */}
          {/* <rect x="25%" y="350" rx="10" ry="10" width="35%" height="50" /> */}
          {/* <rect x="25%" y="390" rx="10" ry="10" width="70%" height="60" /> */}

          {/* Notes input */}
          {/* <rect x="25%" y="420" rx="6" ry="6" width="70%" height="80" /> */}

          {/* Footer */}
          {/* <rect x="25%" y="530" rx="8" ry="8" width="70%" height="20" /> */}
        </ContentLoader>
      </div>

      {/* RIGHT SIDE - Order Summary */}
      <div className="bg-[var(--tmp-acc)] h-full overflow-hidden px-3 py-5">
        <ContentLoader
          speed={1}
          backgroundColor="#e5e7eb"
          foregroundColor="#f3f4f6"
          style={{ width: "100%", height: "100%" }}
          {...props}
        >
          {/* Header */}
          {/* <rect x="10%" y="20" rx="6" ry="6" width="40%" height="25" /> */}

          {/* Product list (simulating 3 items) */}
          <rect x="3%" y="10" rx="4" ry="4" width="60" height="60" />
          <rect x="15%" y="13" rx="6" ry="6" width="60%" height="6" />
          <rect x="15%" y="26" rx="6" ry="6" width="30%" height="6" />
          <rect x="15%" y="50" rx="6" ry="6" width="20%" height="16" />

          <rect x="3%" y="90" rx="4" ry="4" width="60" height="60" />
          <rect x="15%" y="93" rx="6" ry="6" width="60%" height="6" />
          <rect x="15%" y="106" rx="6" ry="6" width="30%" height="6" />
          <rect x="15%" y="130" rx="6" ry="6" width="20%" height="16" />

          <rect x="3%" y="10" rx="4" ry="4" width="60" height="60" />
          <rect x="15%" y="13" rx="6" ry="6" width="60%" height="6" />
          <rect x="15%" y="26" rx="6" ry="6" width="30%" height="6" />
          <rect x="15%" y="50" rx="6" ry="6" width="20%" height="16" />

          {/* <rect x="10%" y="150" rx="10" ry="10" width="80%" height="70" /> */}
          {/* <rect x="10%" y="230" rx="10" ry="10" width="80%" height="70" /> */}

          {/* Subtotal / Shipping / Discount / Total */}
          <rect x="5%" y="240" rx="6" ry="6" width="75%" height="10" />
          <rect x="5%" y="270" rx="6" ry="6" width="75%" height="10" />
          <rect x="5%" y="300" rx="6" ry="6" width="75%" height="10" />
          {/* <rect x="10%" y="460" rx="6" ry="6" width="80%" height="30" /> */}

          {/* Apply coupon field */}
          {/* <rect x="10%" y="510" rx="8" ry="8" width="80%" height="40" /> */}

          {/* Proceed button */}
          <rect x="3%" y="350" rx="10" ry="10" width="80%" height="55" />
        </ContentLoader>
      </div>
    </div>
  );
};

export default CheckoutLoader;
