const Checkbox = ({ label = "Checkbox", checked = false, setChecked = () => { }, className }) => {

    console.log(checked);
    

    return (
        <div className={`relative flex items-center cursor-pointer group ${className}`} onClick={() => setChecked(!checked)}>
            <div className={`w-[16px] h-[16px] border rounded-sm flex items-center justify-center transition-all duration-200 
                 ${checked ? "bg-primaryC border-primaryC" : "bg-backgroundC border-gray-400"}`}
            >
                {checked && (
                    <svg
                        className="w-2 h-2 text-backgroundC"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 12 10"
                    >
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                )}
            </div>
            <span className={`ml-1 text-[14px] group-hover:opacity-80 ${checked ? 'text-primaryC' : 'text-gray-500'} transition-colors duration-200`}>
                {label}
            </span>
        </div>
    );
};

export default Checkbox;
