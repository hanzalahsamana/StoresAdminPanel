"use client";

import Button from "@/components/Actions/Button";
import JazzCashForm from "@/components/Actions/JazzcashRedirectButton";
// import JazzcashRedirectButton from "@/components/Actions/JazzcashRedirectButton";
import { payment } from "@/Utils/payment";
import Link from "next/link";

const Home = () => {
  const handlePayment = async () => {
    await payment();
  };
  return (
    <>
      <p className="text-[20px]">This will be our home page website</p>
      <Button size="small" label="Jazzcash payment" action={handlePayment} />
      {/* <JazzcashRedirectButton/> */}
      <JazzCashForm/>
      <Link
        className="text-blue-500 hover:underline text-[20px]"
        href="/authentication/login"
      >
        Login
      </Link>
    </>
  );
};
export default Home;
