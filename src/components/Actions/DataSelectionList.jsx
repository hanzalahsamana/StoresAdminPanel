import DragAndDropWrapper, { useDragAndDrop } from "@/Hooks/useDragAndDrop";
import React, { useEffect, useState } from "react";
import { BsDatabaseGear } from "react-icons/bs";
import { MdDragIndicator } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import DynamicDataSelectorModal from "../Modals/DynamicDataSelectorModal";
import { getProducts } from "@/APIs/Product/getProducts";
import { useSelector } from "react-redux";
import { getCollections } from "@/APIs/Collection/getCollections";
import { getAllPages } from "@/APIs/Pages/Page";
import { getMenuLinks } from "@/APIs/SearchSuggestions/menuLinks";
import ImgToIcon from "./ImgToIcon";
import { CiFileOn } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { isEqual } from "lodash";
import { v4 as uuidv4 } from 'uuid';

const DataSelectionList = ({ customData = null, selectedData = [], setSelectedData, dataName = 'menu links', label = '', limit = null, selectorName = '' }) => {
  const { items, setItems, handleDragEnd } = useDragAndDrop({
    initialItems: selectedData,
    onReorder: (movedItem, newIndex, newItems) => setSelectedData(newItems),
    addOrderKey: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { store } = useSelector((state) => state.store);
  const { currUser } = useSelector((state) => state.currentUser);
  const [loadedData, setLoadedData] = useState([]);

  const loadData = async () => {
    setLoading(true);
    let result = [];
    try {
      if (dataName === 'products') {
        const products = await getProducts(store?._id, 1, null);
        result = products.map((p) => ({
          label: p.name,
          value: p._id,
          icon: <ImgToIcon url={p.displayImage} />,
          subtext: p.price,
        }));
      } else if (dataName === 'collections') {
        const collections = await getCollections(store?._id);
        result = collections.map((c) => ({
          label: c.name,
          value: c._id,
          subtext: `${c.products?.length} products`,
          icon: <ImgToIcon url={c.image} />,
        }));
      } else if (dataName === 'pages') {
        const pages = await getAllPages(currUser?.token, store?._id);
        result = pages.map((p) => ({
          label: p.title,
          value: p._id,
          icon: <CiFileOn />,
        }));
      } else if (dataName === 'menu links') {
        const menuLinks = await getMenuLinks(currUser?.token, store?._id);
        result = menuLinks.map((l) => ({
          label: l.name,
          value: { name: l.name, slug: l.slug },
          icon: l.icon ? <ImgToIcon url={l.icon} /> : <CiFileOn />,
          subtext: l.slug,
        }));
      } else if (dataName === 'custom') {
        result = customData || [];
      }
    } catch (error) {
      console.error('Error loading selector data:', error);
    }
    setLoadedData(result);
    setLoading(false);
  };

  useEffect(() => {
    if (loadedData.length > 0) return;
    loadData();
  }, [dataName]);

  const handleDelete = (itemToDelete) => {
    const newData = selectedData.filter((item) => !isEqual(item, itemToDelete));
    setSelectedData(newData);
  };

  return (
    <div className={`md:w-full md:max-w-full max-w-sm rounded-xl border p-2 bg-white ${items?.length && 'space-y-2'}`}>
      {/* <div className='px-2'> */}
      <div onClick={() => setIsOpen(true)} className="flex justify-center items-center gap-3 p-2 w-full  bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
        <BsDatabaseGear />
        Select {selectorName || dataName}
      </div>
      {/* </div> */}

      {loading ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          {/* <div className="w-8 h-8 border-4 border-black border-t-gray-400 rounded-full animate-spin mb-2" /> */}
          <span className="text-textTC text-sm">Loading...</span>
        </div>
      ) : (
        <DragAndDropWrapper
          items={items}
          handleDragEnd={handleDragEnd}
          getKey={(item) => (typeof item === 'string' ? item : item?.slug || item[Object.keys(item)[0]]?.toString())}
          className="space-y-2 max-h-[150px] overflow-scroll customScroll px-2"
        >
          {(item, index, { provided }) => {
            const enrichedItem = loadedData.find((d) => isEqual(d.value, item));
            if (!enrichedItem) {
              return (
                <div key={index} className="flex items-center justify-between rounded-lg p-2 border border-red-400 bg-red-50 text-red-600">
                  <p className="text-sm">This collection no longer exists</p>
                  <div onClick={() => handleDelete(item)} className="cursor-pointer hover:text-red-800">
                    <AiOutlineDelete />
                  </div>
                </div>
              );
            }

            return (
              <div key={enrichedItem?.value} ref={provided.innerRef} {...provided.draggableProps} className={`flex items-center justify-between rounded-lg p-2 border `}>
                <div className="flex items-center justify-between w-full gap-3">
                  <div className="flex gap-3">
                    <div {...provided.dragHandleProps} className="py-2 px-2 hover:bg-gray-200 rounded-md  cursor-move">
                      <RiDraggable />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{enrichedItem?.label}</p>
                      {enrichedItem?.subtext && <p className="text-xs text-gray-500">{enrichedItem?.subtext}</p>}
                    </div>
                  </div>
                  <div onClick={() => handleDelete(item)} className="cursor-pointer hover:text-red-500">
                    <AiOutlineDelete />
                  </div>
                </div>
              </div>
            );
          }}
        </DragAndDropWrapper>
      )}

      <DynamicDataSelectorModal
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        selectorName={dataName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={loadedData}
        limit={limit}
        label={label}
      />
    </div>
  );
};

export default DataSelectionList;
