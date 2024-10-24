"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import ProductAddForm from "@/components/ProductAddForm";
import Dashboard from "./Dashboard/Dashboard";

const Home=()=> {
  return (
    <>
      <Dashboard />
    </>
  );
}
export default ProtectedRoute(Home)