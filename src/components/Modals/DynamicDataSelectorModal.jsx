import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import FormInput from "../Forms/FormInput";
import ImgToIcon from "../Actions/ImgToIcon";
import { getProducts } from "@/APIs/Product/getProducts";
import { getCollections } from "@/APIs/Collection/getCollections";
import { getAllPages } from "@/APIs/Pages/Page";
import { useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import Checkbox from "../Actions/CheckBox";
import Button from "../Actions/Button";
import { CiFileOn } from "react-icons/ci";
import { getMenuLinks } from "@/APIs/SearchSuggestions/menuLinks";
import { isEqual } from "lodash";

const DynamicDataSelectorModal = ({
    selectorName = "products", //custom , products , collections , 
    isOpen = false,
    setIsOpen = () => { },
    selectedData = [],
    setSelectedData = () => { },
    data = [],
    label,
    limit = null,
}) => {
    const [tempSelectedData, setTempSelectedData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTempSelectedData(selectedData)
    }, [selectedData])






    const handleSelect = (item) => {

        setTempSelectedData((prev) => {
            const exists = prev.find((d) => isEqual(d, item.value));

            if (exists) {
                return prev.filter((d) => !isEqual(d, item.value));
            } else {
                if (limit && prev.length >= limit) {
                    return prev;
                }
                return [...prev, item?.value];
            }
        });
    };

    const filteredData = data?.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} className="max-w-md">
            <div className="flex flex-col p-4 max-h-[450px] h-[450px]">
                <div className="flex items-center gap-2 justify-between mb-2">
                    <p className="font-bold text-[24px] text-textC capitalize">
                        {label || `Select ${selectorName}`}
                    </p>
                    {limit && (
                        <p className="text-sm text-gray-500 text-right">
                            Selected {tempSelectedData.length}/{limit}
                        </p>
                    )}
                </div>

                <FormInput
                    placeholder={`Search ${selectorName}`}
                    label={null}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    suffix={<IoIosSearch />}
                    className="mb-3"
                />

                <div className="flex-1 overflow-y-auto customScroll space-y-2 w-full px-1 mb-2">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <div className="w-8 h-8 border-4 border-black border-t-gray-400 rounded-full animate-spin mb-2" />
                            <span className="text-textTC text-sm">Loading {selectorName}...</span>
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full ">
                            <img
                                className="w-14"
                                src="https://img.icons8.com/external-flat-icons-maxicons/85/external-detective-england-flat-flat-icons-maxicons.png"
                                alt=""
                            />
                            <span className="text-textTC text-lg">No {selectorName} found</span>
                        </div>
                    ) : (
                        filteredData?.map((item) => (
                            <div
                                key={item.value}
                                onClick={() => handleSelect(item)}
                                className={`cursor-pointer p-2 border rounded flex items-center justify-between space-x-2 
                                    ${limit && tempSelectedData.length >= limit && !tempSelectedData.some((d) => isEqual(d, item.value))
                                        ? 'opacity-70 !cursor-not-allowed'
                                        : tempSelectedData.some((d) => isEqual(d, item.value))
                                            ? '!bg-gray-100'
                                            : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon && item.icon}
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.label}</p>
                                        {item.subtext && (
                                            <p className="text-sm text-gray-500">{item.subtext}</p>
                                        )}
                                    </div>
                                </div>
                                <Checkbox checked={tempSelectedData.some((d) => isEqual(d, item.value))} label={null} />
                            </div>
                        ))
                    )}
                </div>

                <div className="w-full flex gap-3 justify-end items-center">
                    <Button
                        label='Cancel'
                        variant='white'
                        size='small'
                        action={() => { setIsOpen(false) }}
                    />
                    <Button
                        label={'Done'}
                        variant='black'
                        size='small'
                        action={() => {
                            setSelectedData(tempSelectedData);
                            setIsOpen(false);
                        }}
                    />
                </div>
            </div>
        </Modal>

    );
};

export default DynamicDataSelectorModal;
