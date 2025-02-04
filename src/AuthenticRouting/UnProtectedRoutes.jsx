import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UnProtectedRoute = (WrappedComponent) => {
  return () => {
    const { currUser, loading } = useSelector((state) => state.currentUser);
    if (loading) {
      return <Loader />;
    }
//teporarily
    const router = useRouter();
    if (!currUser) {
      return <WrappedComponent />;
    }

    return router.push("/");
  };
};

export default UnProtectedRoute;
