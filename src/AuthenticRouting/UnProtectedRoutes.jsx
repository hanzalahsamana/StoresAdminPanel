import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const UnProtectedRoute = (WrappedComponent) => {
  return () => {
    const { currUser, loading } = useSelector((state) => state.currentUser);
    if (loading) {
      return <Loader />;
    }
    const router = useRouter();
    if (!currUser) {
      return <WrappedComponent />;
    }

    return router.push("/");
  };
};

export default UnProtectedRoute;
