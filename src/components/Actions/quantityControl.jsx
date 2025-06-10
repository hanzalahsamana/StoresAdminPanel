import { FaMinus, FaPlus } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";

const QuantityControl = ({ quantity, increaseQuantity, decreaseQuantity , className }) => {
  const { loading } = useSelector((state) => state?.cartData)

  return (
    <div className={`flex items-center justify-between px-[7px] gap-[5px] w-[120px] rounded-lg border border-[#ccc7c7b8] bg-[var(--tmp-pri)] ${className}`}>
      <button
        disabled={loading}
        className={`h-[40px] text-[#b7b7b7] rounded-sm ${loading ? 'cursor-wait' : 'cursor-pointer'} transition duration-300 text-2xl hover:opacity-80`}
        onClick={decreaseQuantity}
      >
        <FiMinus />
      </button>
      <span className=" text-[var(--tmp-txt)] font-medium flex justify-center  items-center text-xl border-gray-500">
        {quantity}

      </span>
      <button
        disabled={loading}
        className={`h-[40px] text-[#b7b7b7] rounded-md ${loading ? 'cursor-wait' : 'cursor-pointer'} transition duration-300 text-2xl hover:opacity-80`}
        onClick={increaseQuantity}
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default QuantityControl;
