import React from "react";
import IconButton from "../Actions/IconButton";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit, MdOutlineSentimentDissatisfied } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import TableSkeletonLoader from "../Loader/TableSkeletonLoader";
import { VscArrowRight } from "react-icons/vsc";
import { IoCopyOutline } from "react-icons/io5";
import { copyToClipboard } from "@/Utils/CopyText";

const DynamicTable = ({ columns = [], data = [], actions = {}, loading = false, notFoundText = 'Not Found' }) => {
    return (
        <div className="overflow-x-auto p-4 rounded-tl-lg rounded-tr-lg bg-backgroundC w-full border-primaryC">
            <table className="w-full border-collapse rounded-tl-lg rounded-tr-lg  overflow-hidden text-nowrap">
                <thead>
                    <tr className="bg-secondaryC border-secondaryC border-b-[2px] text-primaryC uppercase text-sm">
                        {columns.map((col) => (
                            <th key={col.key} className="p-3 text-left">{col.label}</th>
                        ))}
                        {Object.keys(actions).length > 0 && <th className="p-3 text-left">Actions</th>}
                    </tr>
                </thead>
                <tbody className="w-full">
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length + (Object.keys(actions).length > 0 ? 1 : 0)} className="text-center p-5 w-full">
                                <div className="flex justify-center items-center min-h-[250px] w-full">
                                    <TableSkeletonLoader />
                                </div>
                            </td>
                        </tr>
                    ) : !data || data?.length === 0 ? (
                        <tr>
                            <td colSpan={columns?.length + (Object.keys(actions)?.length > 0 ? 1 : 0)} className="text-center p-5 w-full">
                                <div className="flex flex-col gap-[20px] justify-center items-center min-h-[250px] w-full">
                                    <MdOutlineSentimentDissatisfied className="text-borderC text-[40px]" />
                                    <p className="text-borderC text-[12px] font-extralight">{notFoundText}</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-b-[2px] min-h-[50px] border-secondaryC hover:bg-lbgC transition duration-200"
                            >
                                {columns.map((col) => {
                                    const value = row[col.key];

                                    return (
                                        <td key={col.key} className="p-2 text-[14px] text-textTC">
                                            {col.type === "image" ? (
                                                <img
                                                    src={Array.isArray(value) ? value[0] : value || "https://via.placeholder.com/50"}
                                                    alt=""
                                                    className="w-[40px] h-[40px]"
                                                />
                                            ) : col.type === "id" ? (
                                                <div className="flex items-center gap-2">
                                                    #{value?.length > 16 ? value?.toString()?.slice(0, 10) + ".." : (value || "-")}
                                                    <IconButton
                                                        icon={<IoCopyOutline />}
                                                        className="text-primaryC !text-[16px]"
                                                        action={() => copyToClipboard(value)}
                                                    />
                                                </div>
                                            ) : col.type === "stock" ? (
                                                <p className={`flex gap-1 py-[2px] justify-start text-nowrap  items-center text-sm w-[125px] px-[10px] rounded-2xl ${value ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                    <GoDotFill />
                                                    {value ? `${value} In Stock` : "Stock End"}
                                                </p>
                                            ) : col.type === "status" ? (
                                                <p style={{ backgroundColor: value.bgColor, color: value.color }}
                                                    className={`flex gap-1 py-[2px] justify-start text-nowrap  items-center text-sm w-max px-[13px] rounded-2xl`}>
                                                    <GoDotFill />
                                                    {value?.text}
                                                </p>
                                            ) : col.type === "dropDown" ? (
                                                <select className="border p-2 rounded-md">
                                                    {col.options?.map((opt) => (
                                                        <option key={opt} value={opt}>
                                                            {opt}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                value?.length > 16 ? value?.toString()?.slice(0, 16) + ".." : (value || "-")
                                            )}
                                        </td>
                                    );
                                })}

                                {!!Object.keys(actions)?.length && (
                                    <td className="p-3 space-x-2 flex">
                                        {actions.edit && (
                                            <IconButton
                                                icon={<MdOutlineEdit />}
                                                className="text-blue-500"
                                                action={() => actions.edit(row)}
                                            />
                                        )}
                                        {actions.delete && (
                                            <IconButton
                                                icon={<AiOutlineDelete />}
                                                className="text-red-500"
                                                action={() => actions.delete(row)}
                                            />
                                        )}
                                        {actions.redirect && (
                                            <div onClick={() => actions.redirect(row)} className="flex cursor-pointer text-primaryC gap-1 hover:opacity-65">
                                                view
                                                <IconButton
                                                    icon={<VscArrowRight />}
                                                    className="text-primaryC"
                                                />
                                            </div>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>


            </table>
        </div>
    );
};

export default DynamicTable;