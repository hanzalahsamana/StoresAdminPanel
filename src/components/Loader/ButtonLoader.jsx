export default function ButtonLoader({ className = '' }) {
  return (
    <div className={`flex items-center justify-center text-backgroundC ${className}`}>
      <div className="animate-spin  transition-all w-[20px] h-[20px] border-[3px] border-gray-400 border-b-transparent rounded-full  ">
      </div>
    </div>
  );
}