import { useSelector } from "react-redux";

const QuantityControl = ({ quantity, increaseQuantity, decreaseQuantity }) => {
  const { loading } = useSelector((state) => state?.cartData)

  return (
    <div className="flex items-center justify-between rounded-sm w-32 border-2 border-[var(--tmp-txt)] bg-[var(--tmp-pri)]">
      <button
        disabled={loading}
        className={`w-1/4 text-[var(--tmp-txt)] border-none rounded-sm ${loading ? 'cursor-wait' : 'cursor-pointer'} transition duration-300 text-2xl hover:opacity-80`}
        onClick={decreaseQuantity}
      >
        -
      </button>
      <span className="h-8 text-[var(--tmp-txt)] flex justify-center my-[6px] items-center text-xl w-1/2 border-l border-r border-gray-500">
        { quantity}

      </span>
      <button
        disabled={loading}
        className={`w-1/4 text-[var(--tmp-txt)] border-none rounded-md ${loading ? 'cursor-wait' : 'cursor-pointer'} transition duration-300 text-2xl hover:opacity-80`}
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
