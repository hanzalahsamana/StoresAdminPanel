import React from "react";
import { FaChevronRight, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

import Button from "../Actions/Button";
import IconButton from "../Actions/IconButton";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

const DynamicTable = ({ columns = [], data = [], actions = {}, loading = false }) => {
    return (
        <div className="overflow-x-auto p-4 bg-white border-primaryC shadow-lg">
            <table className="w-full border-collapse rounded-lg">
                <thead>
                    <tr className="bg-secondaryC border-secondaryC border-b-[2px] text-primaryC uppercase text-sm">
                        {columns.map((col) => (
                            <th key={col.key} className="p-3 text-left">{col.label}</th>
                        ))}
                        {Object.keys(actions).length > 0 && <th className="p-3 text-left">Actions</th>}
                    </tr>
                </thead>
                <tbody className="w-full">
                    {!data?.length ? (
                        <tr>
                            <td colSpan={5} className="text-center min-h-[250px] w-full flex flex-col justify-center items-center ">
                                <h1 className="text-textC font-bold text-[15px]">No Products</h1>
                                <p className="text-textTC">There is no products to show </p>
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-b-[2px] border-secondaryC hover:bg-[#06a4a70b] transition duration-200"
                            >
                                {columns.map((col) => {
                                    const value = row[col.key];

                                    return (
                                        <td key={col.key} className="p-2 text-[14px] text-textTC">
                                            {col.type === "image" ? (
                                                <img
                                                    src={value?.[0] || "https://via.placeholder.com/50"}
                                                    alt=""
                                                    className="w-[40px] h-[40px]"
                                                />
                                            ) : col.type === "url" ? (
                                                <a
                                                    href={value || "#"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                >
                                                    {value || "N/A"}
                                                </a>
                                            ) : col.type === "boolean" ? (
                                                <p className="bg-secondaryC flex gap-1 justify-center items-center text-primaryC text-sm w-max px-[13px] rounded-2xl">
                                                    <GoDotFill />
                                                    {value ? "In Stock" : "Out of Stock"}
                                                </p>
                                            ) : col.type === "dropdown" ? (
                                                <select className="border p-2 rounded-md">
                                                    {col.options?.map((opt) => (
                                                        <option key={opt} value={opt}>
                                                            {opt}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                value?.toString()?.slice(0, 20) + ".." || "-"
                                            )}
                                        </td>
                                    );
                                })}

                                {!!Object.keys(actions).length && (
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