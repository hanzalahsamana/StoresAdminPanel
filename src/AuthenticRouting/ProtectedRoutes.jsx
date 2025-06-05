// components/ProtectedRoute.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader/loader";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { currUser, loading } = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (!loading && !currUser) {
      router.push("/authentication/login");
    }
  }, [currUser, loading, router]);

  if (loading || !currUser) {
    return <Loader />;
  }

  return children;
}
