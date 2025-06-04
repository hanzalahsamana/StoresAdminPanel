import Loader from "@/components/Loader/loader";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const UnProtectedRoute = (WrappedComponent) => {
  return () => {
    const router = useRouter();
    const { currUser, loading } = useSelector((state) => state.currentUser);
    if (loading) {
      return <Loader />;
    }
    if (!currUser || currUser?.verified === false) {
      return <WrappedComponent />;
    }

    return currUser?.lastOpenedStore ? router.push(`/admin/${currUser.lastOpenedStore}`) : router.push("/admin/stores");
  };
};

export default UnProtectedRoute;
