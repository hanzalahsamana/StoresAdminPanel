"use client";
import { authWithGoogle } from "@/APIs/Auth/authWithGoogle";
import { loginUser } from "@/APIs/Auth/loginUser";
import UnProtectedRoute from "@/AuthenticRouting/UnProtectedRoutes";
import CustomLink from "@/components/Actions/CustomLink";
import IconButton from "@/components/Actions/IconButton";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import GoogleSignInUp from "@/components/Forms/GoogleSignInUp";
import LineDevider from "@/components/UI/LineDevider";
import { setCurrentUser } from "@/Redux/Authentication/AuthSlice";
import { userLoginValidate } from "@/Utils/FormsValidator";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
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
    try {
      if (!userLoginValidate(formData, setErrors)) return;
      setLoading(true);
      const { token, user } = await loginUser(formData);
      localStorage.setItem("userToken", JSON.stringify(token));
      dispatch(setCurrentUser({ token, ...user }));
    } catch (error) {
      setLoading(false);
      toast.error(error.response ? error.response.data.message : error.message)
    }
  };

  const signinWithGoogle = async (googleToken) => {
    try {
      const { token, user } = await authWithGoogle({ googleToken });
      localStorage.setItem("userToken", JSON.stringify(token));
      dispatch(setCurrentUser({ token, ...user }));
    } catch (error) {
      console.error("Google signin failed:", error);
      toast.error(error?.response?.data?.message || "Google signin failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lbgC px-3">
      <Form
        handleSubmit={handleSubmit}
        loading={loading}
        lable={"Login"}
        buttonLabel={"Log In"}
        className="max-w-md "
        extra={
          <>
            <LineDevider label={"OR"} />
            <GoogleSignInUp onGoogleSuccess={signinWithGoogle} label="Sign in with Google" />
            <CustomLink text="Don't Have an Account" link="/authentication/register" linkText="Create here" />
          </>
        }>

        <FormInput
          type="email"
          error={errors.email}
          value={formData.email}
          name={"email"}
          handleChange={handleChange}
          placeholder="Email"
          size="large"
        />

        <FormInput
          type={typePassword ? 'password' : 'text'}
          error={errors.password}
          name={"password"}
          value={formData.password}
          handleChange={handleChange}
          placeholder="Password"
          size="large"
          actionIcon={
            <div onClick={() => setTypePassword(!typePassword)} className="absolute right-[12px] text-[#7f7b7b]  top-[3px]">
              <IconButton icon={!typePassword ? <FaEye /> : <FaEyeSlash />} />
            </div>}
        />

      </Form>
    </div>
  );
};
export default UnProtectedRoute(Login);
