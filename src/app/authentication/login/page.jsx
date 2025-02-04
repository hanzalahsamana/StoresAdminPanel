"use client";
import { loginUser } from "@/APIs/Auth/loginUser";
import UnProtectedRoute from "@/AuthenticRouting/UnProtectedRoutes";
import CustomLink from "@/components/Actions/CustomLink";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Loader from "@/components/loader";
import { setCurrentUser } from "@/Redux/Authentication/AuthSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const user = await loginUser(formData);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ jwtToken: user.jwtToken, ...user.userToken })
      );
      dispatch(setCurrentUser({ jwtToken: user.jwtToken, ...user.userToken }));
      return router.push("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response ? error.response.data.message : error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primaryC">
      <Form
        handleSubmit={handleSubmit}
        loading={loading}
        lable={"Login"}
        extra={<CustomLink text="Don't Have an Account" link="/authentication/register" linkText="Create here" />}
        className="max-w-md "
        buttonLabel={"Log In"}>

        <FormInput
          errors={{}}
          field={"email"}
          formData={formData}
          handleChange={handleChange}
          placeholder="Email"
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
export default UnProtectedRoute(Login);
