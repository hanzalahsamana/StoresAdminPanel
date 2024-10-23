"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import ProductAddForm from "@/components/ProductAddForm";

const Home=()=> {
  return (
    <>
      <ProductAddForm />
    </>
  );
}
export default ProtectedRoute(Home)