"use client";
import { loginUser } from "@/APIs/Auth/loginUser";
import UnProtectedRoute from "@/AuthenticRouting/UnProtectedRoutes";
import CustomLink from "@/components/Actions/CustomLink";
import IconButton from "@/components/Actions/IconButton";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { setCurrentUser } from "@/Redux/Authentication/AuthSlice";
import { userLoginValidate } from "@/Utils/FormsValidator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [typePassword, setTypePassword] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      if (!userLoginValidate(formData, setErrors)) return;
      setLoading(true);
      const {token , user} = await loginUser(formData);
      localStorage.setItem("userToken", JSON.stringify(token));
      dispatch(setCurrentUser({ token, ...user }));
      // return router.push("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response ? error.response.data.message : error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lbgC px-3">
      <Form
        handleSubmit={handleSubmit}
        loading={loading}
        lable={"Login"}
        extra={<CustomLink text="Don't Have an Account" link="/authentication/register" linkText="Create here" />}
        className="max-w-md "
        buttonLabel={"Log In"}>

        <FormInput
          type="email"
          error={errors.email}
          value={formData.email}
          name={"email"}
          handleChange={handleChange}
          placeholder="Email"
        />

        <FormInput
          type={typePassword ? 'password' : 'text'}
          error={errors.password}
          name={"password"}
          value={formData.password}
          handleChange={handleChange}
          placeholder="Password"
          actionIcon={
            <div onClick={() => setTypePassword(!typePassword)} className="absolute right-[12px] text-[#7f7b7b]  top-[14px]">
              <IconButton icon={typePassword ? <FaEye /> : <FaEyeSlash />} />
            </div>}
        />

      </Form>
    </div>
  );
};
export default UnProtectedRoute(Login);
