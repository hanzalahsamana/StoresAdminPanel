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
    brandName: "",
    email: "",
    name: "",
    password: "",
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
        extra={<CustomLink text="Already Have an Account" link="/authentication/login" linkText="Login" />}
        className="max-w-md"
        buttonLabel={'Sign Up'}>

        <FormInput
          type="email"
          value={formData.email}
          name={"email"}
          error={null}
          handleChange={handleChange}
          placeholder="Email"
        />

        <FormInput
          error={null}
          value={formData.brandName}
          name={"brandName"}
          handleChange={handleChange}
          placeholder="Brand Name"
        />
        <FormInput
          error={null}
          name={"name"}
          value={formData.name}
          handleChange={handleChange}
          placeholder="User Name"

        />

        <FormInput
          type="password"
          error={null}
          name={"password"}
          value={formData.password}
          handleChange={handleChange}
          placeholder="Password"
        />

      </Form>
    </div>
  );

};
export default UnProtectedRoute(Register);
