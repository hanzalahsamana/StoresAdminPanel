"use client";

import { useState } from "react";
import style from "./style.module.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { postContact } from "@/APIs/Contact/postContact";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setloading] = useState(false)
  const SiteLogo = useSelector((state) =>
    selectPageByType(state, "Site Logo")
  );
  const { siteName } = useSelector((state) => state.siteName);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.name && formData.phone && formData.message) {
      setloading(true)
      postContact(siteName, { ...formData, siteLogo: SiteLogo?.image }).then((response) => {
        setloading(false)
        toast.success('Successfully sended')
        setFormData({
          name: '',
          message: '',
          email: '',
          phone: '',
        });
      })
        .catch((err) => {
          setloading(false)
          toast.error("Error sending email:", err)
        });

    } else {
      toast.error("All Inputs should be filled")
    }
  }
  if (loading) {
    return <Loader />
  }
  return (
    <div className="w-full flex justify-center py-[40px] px-[15px]">
      <div className="max-w-[700px] w-full">
        <div>
          <h1 className={`mb-[10px] text-[40px] ${style.contactheading}`}>Reach Us</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <div className="flex w-[100%] gap-5 max-sm:flex-col">
              <div className={`relative w-[50%] max-sm:w-full ${style.InputCont}`}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-3 text-[16px] w-[100%] h-[50px] outline-none border-[1px] border-[#aaaaaa] hover:border-[2px] focus:border-[#252525] focus:border-[2px] ${style.Inputs}`}
                />
                <label
                  className={`transition-all absolute left-3 text-[#4e4e4e] ${formData.name ? "top-[5px] text-[10px]" : "top-4"
                    }`}
                >
                  Name
                </label>
              </div>
              <div className={`relative w-[50%] max-sm:w-full ${style.InputCont}`}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-3 text-[16px] w-[100%] h-[50px] outline-none border-[1px] border-[#aaaaaa] hover:border-[2px] focus:border-[#252525] focus:border-[2px] ${style.Inputs}`}
                />
                <label
                  className={`transition-all absolute left-3 text-[#4e4e4e] ${formData.email ? "top-[5px] text-[10px]" : "top-4"
                    }`}
                >
                  Email
                </label>
              </div>
            </div>
            <div className={`relative w-full ${style.InputCont}`}>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`pl-3 text-[16px] w-[100%] h-[50px] outline-none border-[1px] border-[#aaaaaa] hover:border-[2px] focus:border-[#252525] focus:border-[2px] ${style.Inputs}`}
              />
              <label
                className={`transition-all absolute left-3 text-[#4e4e4e] ${formData.phone ? "top-[5px] text-[10px]" : "top-4"
                  }`}
              >
                Phone
              </label>
            </div>
            <div className={`relative w-full ${style.InputCont}`}>
              <textarea
                type="text-area"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`pl-3 resize-none pt-[20px] text-[16px] w-[100%] h-[120px] outline-none border-[1px] border-[#aaaaaa] hover:border-[2px] focus:border-[#252525] focus:border-[2px] ${style.Inputs}`}
              ></textarea>
              <label
                className={`transition-all absolute left-3 text-[#4e4e4e] ${formData.message ? "top-[5px] text-[10px]" : "top-4"
                  }`}
              >
                Message
              </label>
            </div>
          </div>
          <button className="py-[15px] w-full mt-3 bg-black text-[#e6e6e6] text-[16px]  transition-all duration-300 hover:scale-105">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
