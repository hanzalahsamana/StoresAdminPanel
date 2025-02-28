"use client";
import { SendOTP } from "@/APIs/Auth/addUser";
import UnProtectedRoute from "@/AuthenticRouting/UnProtectedRoutes";
import CustomLink from "@/components/Actions/CustomLink";
import FormInput from "@/components/Forms/FormInput";
import Form from "@/components/Forms/Form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import IconButton from "@/components/Actions/IconButton";
import { generateSlug } from "@/Utils/GenerateSlug";
import { Base_Domain } from "../../../../config";

const validateForm = (formData, setErrors) => {
  const newErrors = {};
  const { brandName, email, name, password } = formData;

  if (!email) newErrors.email = "Email is required";
  if (!brandName) newErrors.brandName = "Brand Name is required";
  if (!name) newErrors.name = "User Name is required";
  if (!password) newErrors.password = "Password is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const Register = () => {
  const [formData, setFormData] = useState({
    brandName: "",
    email: "",
    name: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [typePassword, setTypePassword] = useState(true);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      if (!validateForm(formData, setErrors)) return;
      setLoading(true);
      const user = await SendOTP({ ...formData, subDomain: generateSlug(formData?.brandName), isResend: false, });
      localStorage.setItem("emailForVerify", formData.email)
      return router.push("/authentication/verifyotp");
    } catch (error) {
      setLoading(false);
      toast.error(error.response ? error.response.data.message : error.message)
    }
  };

  return (

    <div className="min-h-screen p-4 flex items-center justify-center bg-secondaryC">
      <Form
        handleSubmit={handleSubmit}
        loading={loading}
        lable={"Create Your Store"}
        extra={<CustomLink text="Already Have an Account" link="/authentication/login" linkText="Login" />}
        className="max-w-md"
        buttonLabel={'Sign Up'}>
        <div>

          <FormInput
            error={errors.brandName}
            value={formData.brandName}
            name={"brandName"}
            handleChange={handleChange}
            placeholder="Brand Name"
          />
          {formData?.brandName && (
            <p className="text-[10px] mt-[4px] text-textTC ">Your store subdomain will be <span className="text-primaryC">{generateSlug(formData.brandName)}.{Base_Domain}</span></p>
          )}
        </div>

        <FormInput
          type="email"
          value={formData.email}
          name={"email"}
          error={errors.email}
          handleChange={handleChange}
          placeholder="Email"
        />
        <FormInput
          error={errors.name}
          name={"name"}
          value={formData.name}
          handleChange={handleChange}
          placeholder="User Name"

        />

        <FormInput
          type={typePassword ? 'password' : 'text'}
          error={errors.password}
          name={"password"}
          value={formData.password}
          handleChange={handleChange}
          placeholder="Password"
          actionIcon={
            <div onClick={() => setTypePassword(!typePassword)} className="absolute right-[12px] text-[#7f7b7b] top-[14px]">
              <IconButton icon={typePassword ? <FaEye /> : <FaEyeSlash />} />
            </div>}
        />

      </Form>
    </div>
  );

};
export default UnProtectedRoute(Register);
