import { useEffect, useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { MdDelete, MdErrorOutline, MdOutlinePlaylistRemove } from "react-icons/md";

const FaqUploader = ({ initialFaqs, setFaqs }) => {
  const [faqs, setLocalFaqs] = useState(initialFaqs);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    setFaqs(faqs);
  }, [faqs, setFaqs]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newFaqs = faqs.map((faq, i) =>
      i === index ? { ...faq, [name]: value } : faq
    );
    setLocalFaqs(newFaqs);

    if (value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };

  const addFaq = () => {
    const lastFaq = faqs[faqs.length - 1];
    if (!lastFaq.Q.trim() || !lastFaq.A.trim()) {
      setErrors({
        Q: !lastFaq.Q.trim(),
        A: !lastFaq.A.trim(),
      });
      return;
    }
    setLocalFaqs([...faqs, { Q: '', A: '' }]);
    setEditingIndex(faqs.length);
  };

  const removeFaq = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setLocalFaqs(newFaqs);
    setErrors({});
  };

  return (
    <div className="space-y-4 w-full">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={` flex flex-col relative border overflow-hidden gap-4 border-[#ababab81] p-4 transition-all duration-300 ${editingIndex === index ? 'h-[180px]' : 'h-[67px]'}`}
        >
          {(errors.Q || errors.A) && index === faqs.length - 1 && (
            <p className="absolute top-[3px] flex gap-[5px] text-red-500 text-[10px]">
              <MdErrorOutline /> Please fill all fields
            </p>
          )}
          <div className="flex items-center">
            <p className="font-semibold">Q{index + 1}.</p>
            <div className="flex-grow">
              <input
                type="text"
                name="Q"
                readOnly={editingIndex !== index}
                value={faq.Q}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Question"
                className={`w-full p-2 rounded-sm focus:outline-none border ${editingIndex === index ? 'border-[#e5e7eb] focus:ring-2 focus:ring-primaryC' : 'border-[#fff]'}`}
              />
            </div>
            <div
              className="text-[25px] cursor-pointer hover:opacity-85 transition-all"
              onClick={() => setEditingIndex((prev) => (prev === index ? null : index))}
            >
              {editingIndex === index ? <MdOutlinePlaylistRemove /> : <IoMenu />}
            </div>
            <div
              className="text-[20px] text-[#000000] cursor-pointer hover:opacity-70 transition-all"
              onClick={() => removeFaq(index)}
            >
              <MdDelete />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="flex-grow">
              {editingIndex === index && (
                <textarea
                  name="A"
                  value={faq.A}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Answer"
                  rows="4"
                  className="w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryC"
                />
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end gap-2">
        <button
          onClick={addFaq}
          className="bg-[#28a745] rounded-sm shadow-lg text-[14px] text-backgroundC p-2 hover:opacity-90 focus:outline-none"
        >
          Add More
        </button>
      </div>
    </div>
  );
};

export default FaqUploader;
