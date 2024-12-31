import { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { MdDelete, MdErrorOutline, MdOutlinePlaylistRemove } from "react-icons/md";

const FaqUploader = () => {
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({ question: false, answer: false });

  const handleInputChange = (index, event) => {
    const newFaqs = [...faqs];
    newFaqs[index][event.target.name] = event.target.value;
    setFaqs(newFaqs);
    if (event.target.value.trim() !== '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: false,
      }));
    }
  };

  const addFaq = () => {
    const lastFaq = faqs[faqs.length - 1];
    if (!lastFaq.question.trim() || !lastFaq.answer.trim()) {
      setErrors({
        question: !lastFaq.question.trim(),
        answer: !lastFaq.answer.trim(),
      });
      return;
    }
    setFaqs([...faqs, { question: '', answer: '' }]);
    setEditingIndex(faqs.length);
    setErrors({ question: false, answer: false });
  };

  const removeFaq = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
    setErrors({ question: false, answer: false });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">FAQ Uploader</h2>

      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`bg-white flex flex-col relative border overflow-hidden gap-4 border-[#ababab81] p-4 transition-all duration-300 ${editingIndex === index ? 'h-[180px]' : 'h-[67px]'
            }`}
        >
          {(errors.question || errors.answer) && index === faqs.length - 1 && (
            <p className="absolute top-[3px]  flex gap-[5px] text-red-500 text-[10px]"><MdErrorOutline /> Please Fill all fields</p>
          )}
          <div className="flex items-center">
            <p className="font-semibold">Q{index + 1}.</p>
            <div className="flex-grow">
              <input
                type="text"
                name="question"
                readOnly={editingIndex === index ? false : true}
                value={faq.question}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Question"
                className={`w-full p-2 rounded-sm focus:outline-none border ${editingIndex === index
                  ? 'border-[#e5e7eb] focus:ring-2 focus:ring-blue-500'
                  : 'border-[#fff]'
                  }`}
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
                  name="answer"
                  value={faq.answer}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Answer"
                  rows="4"
                  className="w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>

        </div>
      ))}

      <div className="flex justify-end gap-2">
        <button
          onClick={addFaq}
          className="bg-[#28a745] rounded-sm text-[14px] text-white p-2 hover:opacity-85 focus:outline-none"
        >
          Add More
        </button>
        <button
        
          className="bg-[#007bff] rounded-sm text-[14px] text-white p-2 hover:opacity-85 focus:outline-none"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default FaqUploader;
