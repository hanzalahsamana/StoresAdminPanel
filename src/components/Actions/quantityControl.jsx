import { FaMinus, FaPlus } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";

const QuantityControl = ({ quantity, increaseQuantity, decreaseQuantity , className }) => {
  const { loading } = useSelector((state) => state?.cartData)

  return (
    <div className={`flex items-center justify-between px-[7px] gap-[5px] w-[120px] rounded-none border border-[var(--tmp-lBor)] bg-[var(--tmp-pri)] ${className}`}>
      <button
        disabled={loading}
        className={`h-[40px] text-[var(--tmp-txt)] rounded-sm ${loading ? 'cursor-wait' : 'cursor-pointer'} transition duration-300 text-2xl hover:opacity-80`}
        onClick={decreaseQuantity}
      >
        <FiMinus strokeWidth={1} />
      </button>
      <span className="text-[var(--tmp-txt)]  flex justify-center  items-center text-xl ">
        {quantity}
      </span>
      <button
        disabled={loading}
        className={`h-[40px] text-[var(--tmp-txt)] rounded-md ${loading ? 'cursor-wait' : 'cursor-pointer'} transition duration-300 text-2xl hover:opacity-80`}
        onClick={increaseQuantity}
      >
        <FiPlus strokeWidth={1} />
      </button>
    </div>
  );
};

export default QuantityControl;
