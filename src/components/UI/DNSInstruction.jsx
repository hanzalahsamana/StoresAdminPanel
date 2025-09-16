import { PiSealWarningFill } from "react-icons/pi";


export default function DnsInstructions({ instructions, currentIps = null }) {
    console.log(instructions);

    return (
        <div className=''>
            {currentIps?.length > 0 && (
                <p className="text-[13px] text-textTC mb-4">Your Current IPs : <span className="text-red-500">{currentIps.join(" __ ")}</span></p>
            )}
            <p className="text-[16px] text-textTC mb-4">Please add these records to your hosting provider then verify again.</p>
            <div className="overflow-x-auto">
                <table className=" rounded-lg">
                    <thead className="">
                        <tr>
                            <th className="py-2 px-6 font-normal text-primaryC text-left">Type</th>
                            <th className="py-2 px-6 font-normal text-primaryC text-left">Name</th>
                            <th className="py-2 px-6 font-normal text-primaryC text-left">Points To</th>
                            <th className="py-2 px-6 font-normal text-primaryC text-left">TTL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instructions?.map((config, i) => (
                            <tr className="bg-backgroundC text-center">
                                <td className="py-2 px-6 text-textTC text-left">{config?.type}</td>
                                <td className="py-2 px-6 text-textTC text-left">{config?.name || config.domain}</td>
                                <td className="py-2 px-6 text-textTC text-left">{config?.value }</td>
                                <td className="py-2 px-6 text-textTC text-left">{config.TTL || 14400}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <p className="text-[13px] mt-[20px] flex items-center gap-2 text-yellow-500 mb-4"><PiSealWarningFill className="text-[16px]" /> remember DNS propagation may take upto 5 min to 48 hours</p>
        </div>
    );
}
