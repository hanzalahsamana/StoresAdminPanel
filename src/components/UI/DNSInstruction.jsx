import { PiSealWarningFill } from "react-icons/pi";


export default function DnsInstructions({ instructions, currentIps = null }) {
    return (
        <div className=''>
            {currentIps?.length > 0 && (
                <p className="text-[13px] text-textTC mb-4">Your Current IPs : <span className="text-red-500">{currentIps.join(" __ ")}</span></p>
            )}
            <p className="text-[16px] text-textTC mb-4">Please add these records to your hosting provider then verify again.</p>
            <div className="overflow-x-auto">
                <table className="w-[500px] rounded-lg">
                    <thead className="">
                        <tr>
                            <th className="py-2 px-4 font-normal text-primaryC">Type</th>
                            <th className="py-2 px-4 font-normal text-primaryC">Name</th>
                            <th className="py-2 px-4 font-normal text-primaryC">Points To</th>
                            <th className="py-2 px-4 font-normal text-primaryC">TTL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white text-center">
                            <td className="py-2 px-4 text-textTC">{instructions.type}</td>
                            <td className="py-2 px-4 text-textTC">{instructions.name}</td>
                            <td className="py-2 px-4 text-textTC">{instructions.pointsTo}</td>
                            <td className="py-2 px-4 text-textTC">{instructions.TTL}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <p className="text-[13px] mt-[20px] flex items-center gap-2 text-yellow-500 mb-4"><PiSealWarningFill className="text-[16px]" /> remember DNS propagation may take upto 5 min to 48 hours</p>
        </div>
    );
}
