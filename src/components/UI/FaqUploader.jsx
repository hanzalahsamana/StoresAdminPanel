import { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { MdOutlinePlaylistRemove } from "react-icons/md";



const FaqUploader = () => {
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
  const [editingIndex, setEditingIndex] = useState(null)

  const handleInputChange = (index, event) => {
    const newFaqs = [...faqs];
    newFaqs[index][event.target.name] = event.target.value;
    setFaqs(newFaqs);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const removeFaq = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">FAQ Uploader</h2>

      {faqs.map((faq, index) => (
        <div key={index}
          className={`bg-white border overflow-hidden border-[#ababab81] p-4 space-y-4 transition-all ${editingIndex === index ? 'h-300px' : 'h-[67px]'}`}>
          <div className="flex space-x-2 items-center">
            <p>Q{index + 1}.</p>
            <input
              type="text"
              name="question"
              readOnly={editingIndex === index ? false : true}
              value={faq.question}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Question"
              className={`w-full p-2  rounded-sm focus:outline-none border border-[#fff] ${editingIndex === index && 'border-[#e5e7eb] focus:ring-2 focus:ring-blue-500'}`}
            />
            <div className='text-[25px] cursor-pointer hover:opacity-85 transition-all' onClick={() => setEditingIndex(prev => prev === index ? null : index)}>
              {editingIndex === index ? <MdOutlinePlaylistRemove /> : <IoMenu />}
            </div>
          </div>

          <div className="flex space-x-2">
            <textarea
              name="answer"
              value={faq.answer}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Answer"
              rows="4"
              className="w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => removeFaq(index)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            Remove FAQ
          </button>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          onClick={addFaq}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add More
        </button>
        <button
          onClick={() => console.log(faqs)}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Submit FAQs
        </button>
      </div>
    </div>
  );
};

export default FaqUploader;
