"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { RegisterUser } from "@/APIs/Auth/registerUser";
import UnProtectedRoute from "@/AuthenticRouting/UnProtectedRoutes";
import CustomLink from "@/components/Actions/CustomLink";
import IconButton from "@/components/Actions/IconButton";
import FormInput from "@/components/Forms/FormInput";
import GoogleSignInUp from "@/components/Forms/GoogleSignInUp";
import Form from "@/components/Forms/Form";
import FormStepper from "@/components/Forms/FormStepper";
import LineDevider from "@/components/UI/LineDevider";

import { userResgisterValidate } from "@/Utils/FormsValidator";
import { generateSlug } from "@/Utils/GenerateSlug";
import { Base_Domain } from "../../../../config";
import { ValidateEmailAndPassword } from "@/APIs/Auth/validateEmailAndPassword";
import { setCurrentUser } from "@/Redux/Authentication/AuthSlice";
import { useDispatch } from "react-redux";
import { signUpWithGoogle } from "@/APIs/Auth/authWithGoogle";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    brandName: "",
    googleToken: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!formData.googleToken) {
      const isValid = userResgisterValidate(
        { email: formData.email, password: formData.password },
        setErrors
      );

      if (!isValid) return;

      try {
        setLoading(true);
        await ValidateEmailAndPassword({
          email: formData.email,
          password: formData.password,
        });

        setStep(2);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Validation failed");
      } finally {
        setLoading(false);
      }
    } else {
      setStep(2);
    }
  };

  const handleFinish = async (e) => {
    e.preventDefault();

    if (!formData.brandName) {
      setErrors({ brandName: "Brand name is required" });
      return;
    }

    console.log("formData", formData);
    try {
      setLoading(true);
      if (formData.googleToken) {
        const { token, user } = await signUpWithGoogle({
          brandName: formData.brandName,
          subDomain: generateSlug(formData.brandName),
          googleToken: formData.googleToken,
        });
        localStorage.removeItem("emailForVerify");
        localStorage.setItem("userToken", JSON.stringify(token));
        dispatch(setCurrentUser({ token, ...user }));
      } else {
        await RegisterUser({
          email: formData.email,
          password: formData.password,
          brandName: formData.brandName,
          subDomain: generateSlug(formData.brandName),
        });
        localStorage.setItem("emailForVerify", formData.email);
        router.push("/authentication/verifyotp");
      }

    } catch (err) {
      console.log("Signup failed", err);
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (token) => {
    setFormData({
      googleToken: token,
    });
    setStep(2);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-lbgC px-3">
      <Form
        handleSubmit={step === 1 ? handleStep1Submit : handleFinish}
        loading={loading}
        lable={step === 1 ? "Create Your Store" : "Finish Signup"}
        extra={
          <>
            {step === 1 && (
              <>
                <LineDevider label={"OR"} />
                <GoogleSignInUp onGoogleSuccess={handleGoogleSuccess} label="Sign up with Google" />
              </>
            )}
            <CustomLink
              text="Already Have an Account"
              link="/authentication/login"
              linkText="Login"
            />
          </>
        }
        className="max-w-md"
        buttonLabel={step === 1 ? "Continue" : "Finish"}
      >
        <FormStepper currentStep={step} limit={2} />

        {step === 1 ? (
          <>
            <FormInput
              type="email"
              name="email"
              value={formData.email}
              handleChange={handleChange}
              placeholder="Email"
              error={errors.email}
              size="large"
            />

            <FormInput
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              handleChange={handleChange}
              placeholder="Password"
              error={errors.password}
              size="large"
              actionIcon={
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[12px] text-[#7f7b7b] top-[4px]"
                >
                  <IconButton
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  />
                </div>
              }
            />
          </>
        ) : (
          <>
            <div className="flex justify-end w-full mb-2">
              <p
                className="text-primaryC text-[12px] cursor-pointer flex items-center gap-1"
                onClick={() => { setFormData({ ...formData, googleToken: null }); setErrors({}); setStep(1) }}
              >
                <HiArrowLeft /> Change email or password
              </p>
            </div>

            <FormInput
              name="brandName"
              value={formData.brandName}
              handleChange={handleChange}
              placeholder="Brand Name"
              error={errors.brandName}
              size="large"
            />

            {formData.brandName && (
              <p className="text-[10px] mt-1 text-textTC">
                Your store subdomain will be{" "}
                <span className="text-primaryC">
                  {generateSlug(formData.brandName)}.{Base_Domain}
                </span>
              </p>
            )}
          </>
        )}
      </Form>
    </div >
  );
};

export default UnProtectedRoute(Register);
