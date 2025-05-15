import React, { useState, useEffect } from 'react';

// Generate all combinations including 'Any' option
function getCombinations(variations) {
  if (!variations.length) return [];

  // Clone variations and add "Any {name}" to options
  const variationsWithAny = variations.map(v => ({
    name: v.name,
    options: [`Any ${v.name}`, ...v.options],
  }));

  return variationsWithAny.reduce(
    (acc, variation) => {
      const updated = [];
      for (const combo of acc) {
        for (const option of variation.options) {
          updated.push({ ...combo, [variation.name]: option });
        }
      }
      return updated;
    },
    [{}]
  );
}

const VariantCombinationTable = ({ variationData }) => {
  const [combinations, setCombinations] = useState([]);
  const [comboData, setComboData] = useState({});

  useEffect(() => {
    const combos = getCombinations(variationData);
    setCombinations(combos);
    const initialized = {};
    combos.forEach((combo) => {
      const key = JSON.stringify(combo);
      initialized[key] = { price: '', imageUrl: '' };
    });
    setComboData(initialized);
  }, [variationData]);

  const handleChange = (key, field, value) => {
    setComboData((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  return (
    <div className="border rounded-md overflow-hidden shadow-sm">
      <div className="overflow-x-auto customScroll">
        <table className="min-w-full table-auto text-sm bg-lbgC">
          <thead className="bg-secondaryC font-normal text-primaryC top-0 z-10">
            <tr>
              {variationData.map((v) => (
                <th key={v.name} className=" min-w-[110px] px-4 py-2 text-left whitespace-nowrap">
                  {v.name}
                </th>
              ))}
              <th className="px-4 py-2 text-left sticky right-[140px] border-l">Price</th>
              <th className="px-4 py-2 text-left sticky right-0 border-l">Image URL</th>
            </tr>
          </thead>
          <tbody>
            {combinations.map((combo, idx) => {
              const key = JSON.stringify(combo);
              return (
                <tr key={idx} className="even:bg-whte">
                  {variationData.map((v) => (
                    <td key={v.name} className="px-4 py-2 border-t whitespace-nowrap">
                      {combo[v.name].startsWith('Any') ? (
                        <i className="text-gray-500">{combo[v.name]}</i>
                      ) : (
                        combo[v.name]
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 border-t bg-white  sticky right-[140px]">
                    <div className='flex gap-1'>
                      <img className='w-[20px] h-[20px]' src="https://img.icons8.com/fluency/48/price-tag--v1.png" alt="price-tag--v2" />
                      <input
                        type="number"
                        placeholder="Price"
                        value={comboData[key]?.price || ''}
                        onChange={(e) => handleChange(key, 'price', e.target.value)}
                        className="w-24 border-b outline-none text-textTC rounded-none bg-transparent  px-2 py-1"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 border-t  bg-lbgC even:bg-white  sticky right-0">
                    <div className='flex gap-1'>
                      <img className='w-[20px] h-[20px]' src="https://img.icons8.com/fluency/48/image--v1.png" alt="price-tag--v2" />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={comboData[key]?.imageUrl || ''}
                        onChange={(e) => handleChange(key, 'imageUrl', e.target.value)}
                        className="w-24 border-b outline-none text-textTC rounded-none bg-transparent  px-2 py-1"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariantCombinationTable;
