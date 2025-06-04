"use client";

import Link from "next/link";

const Home = () => {
  return (
    <>
      <p className="text-[20px]">This will be our home page website</p>
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
