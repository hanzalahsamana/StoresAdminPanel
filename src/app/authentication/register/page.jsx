"use client";
import { SendOTP } from "@/APIs/Auth/addUser";
import UnProtectedRoute from "@/AuthenticRouting/UnProtectedRoutes";
import CustomLink from "@/components/Actions/CustomLink";
import FormInput from "@/components/Forms/FormInput";
import Form from "@/components/Forms/Form";
import Loader from "@/components/loader";
import InputField from "@/components/UI/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    brandName: "unique",
    email: "junaidhunani890@gmail.com",
    name: "junaid",
    password: "123456",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await SendOTP({ ...formData, isResend: false, });
      localStorage.setItem("emailForVerify", formData.email)
      return router.push("/authentication/verifyotp");
    } catch (error) {
      setLoading(false);
      toast.error(error.response ? error.response.data.message : error.message)
    }
  };


  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-primaryC">
      <Form
        handleSubmit={handleSubmit}
        loading={loading}
        lable={"Create Brand"}
        extra={<CustomLink text="Already Have an Account" link="/authentication/login" linkText="Login" />}>

        <FormInput
          errors={{}}
          field={"email"}
          formData={formData}
          handleChange={handleChange}
          placeholder="Email"
        />

        <FormInput
          errors={{}}
          field={"brandName"}
          formData={formData}
          handleChange={handleChange}
          placeholder="Brand Name"
        />
        <FormInput
          errors={{}}
          field={"name"}
          formData={formData}
          handleChange={handleChange}
          placeholder="User Name"

        />

        <FormInput
          errors={{}}
          field={"password"}
          formData={formData}
          handleChange={handleChange}
          placeholder="Password"
        />

      </Form>
    </div>
  );

};
export default UnProtectedRoute(Register);
