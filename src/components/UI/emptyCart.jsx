import { getBasePath } from "@/Utils/GetBasePath";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-[var(--tmp-pri)] h-[70vh] max-h-[700px]">
      <h1 className="text-[20px] text-[var(--tmp-txt)] mb-4">Nothing here… yet! Time to fill your cart</h1>
      <Link href={`${getBasePath()}/products`} className="py-[15px] w-[250px] my-6 bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-[16px]  transition-all duration-300 hover:scale-105">
            Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
