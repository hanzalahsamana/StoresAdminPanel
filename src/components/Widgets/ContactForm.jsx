"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { postContact } from "@/APIs/Contact/postContact";
import { getContentByName } from "@/Redux/ContentData/ContentDataSlice";
import FormInput from "../Forms/FormInput";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const siteLogo = useSelector((state) => getContentByName(state, "Site Logo")?.image);
  const { siteName } = useSelector((state) => state.siteName);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!Object.values(formData).every((val) => val.trim() !== "")) {
        return toast.error("All fields must be filled.");
      }

      try {
        setLoading(true);
        await postContact(siteName, { ...formData, siteLogo });
        toast.success("Successfully sent!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } catch (err) {
        toast.error("Error sending email. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData, siteName, siteLogo]
  );

  if (loading) return <Loader />;

  return (
    <div className="w-full flex justify-center py-10 px-4 bg-[var(--tmp-pri)]">
      <div className="max-w-[700px] w-full">
        <h1 className={`mb-5 text-4xl font-semibold text-[var(--tmp-txt)]`}>
          Reach Us
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 w-full max-sm:flex-col">
              <FormInput type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="!rounded-none border-[#aaaaaa] focus:border-[2px] focus:border-[var(--tmp-txt)] !outline-none" />
              <FormInput type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="!rounded-none border-[#aaaaaa] focus:border-[2px] focus:border-[var(--tmp-txt)] !outline-none" />
            </div>
            <FormInput type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="!rounded-none border-[#aaaaaa] focus:border-[2px] focus:border-[var(--tmp-txt)] !outline-none" />

            <div className="relative w-full">
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full h-[120px] resize-none px-3 py-4 outline-none border border-gray-400 focus:border-black focus:border-2"
              ></textarea>
              <label
                htmlFor="message"
                className={`absolute left-3 text-gray-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-[3px] peer-focus:text-xs ${formData.message ? "top-[3px] text-xs" : "top-4"
                  }`}
              >
                Message
              </label>
            </div>
          </div>

          <button className="py-3 w-full mt-3 bg-[var(--tmp-sec)] text-[var(--tmp-wtxt)] text-lg transition-transform duration-300 hover:scale-105">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
