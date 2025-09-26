import { useEffect, useState } from 'react';
import FormInput from './FormInput';
import ImageUploader from '../Uploaders/ImageUploader';
import DropDown from '../Actions/DropDown';
import ImageSelector from '../Uploaders/ImageSlector';

function generateCombinations(variations) {
  if (!variations.length) return [];
  return variations.reduce((acc, variation) => {
    if (!variation.options.length) return acc;
    if (!acc.length) return variation.options.map((opt) => [opt]);
    return acc.flatMap((combo) => variation.options.map((opt) => [...combo, opt]));
  }, []);
}

const VariantsAddManager = ({ variations = [], variantData = [], setVariantData }) => {
  const [groupByIndex, setGroupByIndex] = useState(0); // 0 = Bulk Edit
  const [groupedData, setGroupedData] = useState({});
  const [bulkEdit, setBulkEdit] = useState({ price: '', stock: '', image: null });
  const [parentGroupData, setParentGroupData] = useState({});

  useEffect(() => {
    const combos = generateCombinations(variations);
    const updated = combos.map((combo) => {
      const options = {};
      variations.forEach((v, i) => {
        options[v.name] = combo[i];
      });

      const sku = Object.values(options).join('___');
      const existing = variantData.find((v) => v.sku === sku);

      return (
        existing || {
          sku,
          options,
          price: null,
          stock: null,
          image: null,
        }
      );
    });
    setGroupByIndex(variations?.length + 1);
    setVariantData(updated);
  }, [variations]);

  useEffect(() => {
    const grouped = {};
    if (groupByIndex === 0) {
      // Bulk Edit group
      grouped['Bulk Edit'] = [...variantData];
    } else {
      variantData.forEach((variant) => {
        const keys = Object.keys(variant.options);
        const key = variant.options[keys[groupByIndex - 1]] || 'Unknown';
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(variant);
      });
    }
    setGroupedData(grouped);
  }, [variantData, groupByIndex]);

  const handleGroupChange = (groupKey, field, value) => {
    const newVariantData = variantData.map((v) => {
      if (groupByIndex === 0 || (groupByIndex > 0 && v.options[Object.keys(v.options)[groupByIndex - 1]] === groupKey)) {
        return { ...v, [field]: (field === 'price' || field === 'stock') && value ? Number(value) : value };
      }
      return v;
    });
    setVariantData(newVariantData);

    if (groupByIndex === 0) {
      const newBulkEdit = { ...bulkEdit, [field]: value };
      setBulkEdit(newBulkEdit);
    } else {
      setParentGroupData((prev) => ({
        ...prev,
        [groupKey]: {
          ...(prev[groupKey] || {}),
          [field]: value,
        },
      }));
    }
  };

  const handleChange = (sku, field, value) => {
    setVariantData((prev) => prev.map((v) => (v.sku === sku ? { ...v, [field]: (field === 'price' || field === 'stock') && value ? Number(value) : value } : v)));
  };

  if (variations.length === 0) {
    return;
  }

  return (
    <div className="mt-6">
      <div className="mb-4 w-full flex justify-between items-end">
        <h1 className="font-semibold text-[28px]">Variants</h1>
        <DropDown
          label="Group Variants By"
          layout="label"
          selectedOption={groupByIndex}
          defaultOptions={[{ label: 'Bulk Edit', value: 0 }, ...[...variations, { name: 'None' }].map((v, i) => ({ label: v.name, value: i + 1 }))]}
          setSelectedOption={(val) => setGroupByIndex(Number(val))}
          className="w-max"
        />
      </div>
      <div className="border rounded-md overflow-hidden">
        <div className="grid grid-cols-5 border-b gap-2 bg-gray-50 text-gray-600 font-medium p-2 items-center">
          <p className="text-riht">Image</p>
          <p>Variant</p>
          <p></p>
          <p>Price</p>
          <p>Stock</p>
        </div>
        {Object.entries(groupedData).map(([groupKey, variants]) => (
          <div key={groupKey} className="bg-white">
            {variations?.length + 1 !== groupByIndex && (
              <div className="grid grid-cols-5 border-b items-center gap-2 px-3 py-2 bg-gray-100">
                <ImageSelector
                  image={groupByIndex === 0 ? bulkEdit.image : parentGroupData?.[groupKey]?.image || ''}
                  setImage={(url) => handleGroupChange(groupKey, 'image', url)}
                  size="medium"
                  multiple={false}
                  label=""
                />
                <div className="text-lg font-medium text-nowrap text-gray-700">{groupKey}</div>
                <div></div>
                <FormInput
                  layout=""
                  type="number"
                  value={groupByIndex === 0 ? bulkEdit.price : parentGroupData?.[groupKey]?.price || null}
                  onChange={(e) => handleGroupChange(groupKey, 'price', e.target.value)}
                  className="rounded-lg h-[30px]"
                  placeholder="Price"
                />
                <FormInput
                  layout=""
                  type="number"
                  value={groupByIndex === 0 ? bulkEdit.stock : parentGroupData?.[groupKey]?.stock || null}
                  onChange={(e) => handleGroupChange(groupKey, 'stock', e.target.value)}
                  className="rounded-lg h-[30px]"
                  placeholder="Stock"
                />
              </div>
            )}
            <div className="grid grid-cols-1 justify-end items-end">
              {variants.map((variant) => {
                return (
                  <div key={variant.sku} className="px-4 py-2 border-b grid grid-cols-5 items-center gap-2 w-auto">
                    <ImageSelector label="" multiple={false} image={variant?.image} setImage={(url) => handleChange(variant.sku, 'image', url)} />
                    <div className="text-sm font-medium text-nowrap text-gray-700">
                      {Object.entries(variant.options)
                        .map(([k, v]) => ` ${v}`)
                        .join(' / ')}
                    </div>
                    <div></div>
                    <FormInput
                      label=""
                      type="number"
                      className="rounded-lg h-[30px]"
                      layout=""
                      placeholder="Price"
                      value={variant.price}
                      onChange={(e) => handleChange(variant.sku, 'price', e.target.value)}
                    />
                    <FormInput
                      label=""
                      type="number"
                      className="rounded-lg h-[30px]"
                      layout=""
                      placeholder="Stock"
                      value={variant.stock}
                      onChange={(e) => handleChange(variant.sku, 'stock', e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantsAddManager;
