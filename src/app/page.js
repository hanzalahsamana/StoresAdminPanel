"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Dashboard from "./Dashboard/Dashboard";

const Home = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};
export default ProtectedRoute(Home);
