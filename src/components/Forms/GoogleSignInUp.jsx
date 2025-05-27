"use client";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import Button from "../Actions/Button";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInUp = ({ onGoogleSuccess , label="Sign up with Google" }) => {
  const loginWithGoogle = useGoogleLogin({
    flow: "implicit",
    onSuccess: (tokenResponse) => {
      if (!tokenResponse?.access_token) {
        toast.error("Failed to retrieve Google token. Please try again.");
        return;
      }
      console.log("Google Access Token:", tokenResponse);
      onGoogleSuccess(tokenResponse.access_token);
    },
    onError: () => {
      toast.error("Google login failed. Please try again.");
    },
  });

  return (
    <div>
      <Button
        action={loginWithGoogle}
        variant="white"
        icon={<FcGoogle size={22} />}
        label={label}
        className="bg-lbgC hover:bg-backgroundC"
      />
    </div>
  );
};

export default GoogleSignInUp;
