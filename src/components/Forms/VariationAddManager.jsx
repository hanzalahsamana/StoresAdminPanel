import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuCirclePlus } from 'react-icons/lu';
import { v4 as uuidv4 } from 'uuid';
import DropDown from '../Actions/DropDown';
import MultiSelectDropdown from '../Actions/MultiSelectDropdown';
import Button from '../Actions/Button';

const VariationAddManager = ({ variationData = [], setVariationData, variationSuggestions = {} }) => {
  const [errors, setErrors] = useState({});
  const [doneStates, setDoneStates] = useState({}); // Track which variation is in read-only state

  useEffect(() => {
    console.log(variationData, '🦽🦽🦽');
  }, [variationData]);

  const validateVariation = (variation, allVariations, validate) => {
    const currentErrors = {};
    const trimmedName = variation.name.trim();

    if (!trimmedName) {
      currentErrors.name = 'Name is required.';
    }

    const nameCount = allVariations.filter((v) => v.name.trim() === trimmedName).length;
    if (trimmedName && nameCount > 1 && validate === 'option name') {
      currentErrors.name = 'Name must be unique.';
    }

    if (trimmedName && variation.options.length === 0 && validate === 'option value') {
      currentErrors.options = 'At least one option is required.';
    }

    const uniqueOptions = new Set(variation.options.map((opt) => opt.trim().toLowerCase()));
    if (uniqueOptions.size !== variation.options.length && validate === 'option value') {
      currentErrors.options = 'Duplicate options are not allowed.';
    }
    return currentErrors;
  };

  const handleAddNewVariation = () => {
    if (variationData.length >= 3) return;
    const newId = uuidv4();
    setVariationData((prev) => [
      ...prev,
      {
        id: newId,
        name: '',
        options: [],
      },
    ]);
    setDoneStates((prev) => ({ ...prev, [newId]: false }));
  };

  const handleUpdateVariationName = (id, name) => {
    const updated = variationData.map((variation) => (variation.id === id ? { ...variation, name } : variation));
    const validation = validateVariation(
      updated.find((v) => v.id === id),
      updated,
      'option name'
    );
    if (Object.keys(validation).length > 0) {
      setErrors((prev) => ({ ...prev, [id]: validation }));
      return;
    }
    setErrors({});
    setVariationData(updated);
  };

  const handleUpdateVariationOptions = (id, options) => {
    const updated = variationData.map((variation) => (variation.id === id ? { ...variation, options } : variation));
    setVariationData(updated);
    const validation = validateVariation(
      updated.find((v) => v.id === id),
      updated,
      'option value'
    );
    setErrors((prev) => ({ ...prev, [id]: validation }));
  };

  const handleDelete = (idToDelete) => {
    setVariationData((prev) => prev.filter(({ id }) => id !== idToDelete));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[idToDelete];
      return newErrors;
    });
    setDoneStates((prev) => {
      const newDoneStates = { ...prev };
      delete newDoneStates[idToDelete];
      return newDoneStates;
    });
  };

  const handleDone = (id) => {
    const variation = variationData.find((v) => v.id === id);
    const validation = validateVariation(variation, variationData);
    setErrors((prev) => ({ ...prev, [id]: validation }));
    if (Object.keys(validation).length === 0) {
      setDoneStates((prev) => ({ ...prev, [id]: true }));
    }
  };

  const toggleEdit = (id) => {
    setDoneStates((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="border border-[#d7d5d5] rounded-md overflow-hidden">
      <div className="customScroll">
        <AnimatePresence initial={false}>
          {variationData.map((variation, i) => {
            const isDone = doneStates[variation.id];

            return (
              <motion.div
                key={variation.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`${i === variationData.length - 1 ? 'border-b border-[#d7d5d5]' : 'border-b-2 border-[#b5b3b3]'} bg-white overflow-hidden`}
              >
                {isDone ? (
                  <div onClick={() => toggleEdit(variation.id)} className="cursor-pointer  p-4 hover:bg-[#f5f5f5] transition-all">
                    <p className="font-bold text-[17px] text-textC">{variation.name}</p>
                    <ul className="mt-1 flex gap-2 flex-wrap">
                      {variation.options.map((opt, idx) => (
                        <li className="bg-[#e3e3e3] text-[14px] text-[#303030] font-medium px-2 py-1 rounded-sm" key={idx}>
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="w-full  p-4">
                    <div>
                      <label className="text-[14px] font-medium text-textC mb-1.5 block">Option Name</label>
                      <DropDown
                        defaultOptions={Object.keys(variationSuggestions)}
                        setSelectedOption={(opt) => handleUpdateVariationName(variation.id, opt)}
                        selectedOption={variation.name}
                        wantsCustomOption={true}
                        placeholder="Add variation"
                        error={errors[variation.id]?.name}
                        className="!text-textC"
                      />
                    </div>
                    <div className="mt-[20px]">
                      <label className="text-[14px] font-medium text-textC mb-1.5 block">Option Values</label>
                      <MultiSelectDropdown
                        wantsCustomOption={true}
                        selectedOptions={variation.options}
                        defaultOptions={variationSuggestions[variation.name] || []}
                        setSelectedOptions={(options) => handleUpdateVariationOptions(variation.id, options)}
                        error={errors[variation.id]?.options}
                      />
                    </div>
                    <div className="flex justify-between mt-[15px]">
                      <Button label="Delete" variant="white" className="!text-red-700 font-medium" size="small" action={() => handleDelete(variation.id)} />
                      <Button label="Done" variant="black" size="small" action={() => handleDone(variation.id)} />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <Button
        label={variationData?.length < 1 ? 'Add options like Size, Color' : 'Add another option'}
        action={handleAddNewVariation}
        variant="text"
        icon={<LuCirclePlus />}
        size="small"
        disabled={variationData.length >= 3}
        className={`!w-full !bg-lbgC hover:!bg-secondaryC ${variationData.length >= 3 ? '!opacity-50 cursor-not-allowed' : ''}`}
      />
    </div>
  );
};

export default VariationAddManager;
