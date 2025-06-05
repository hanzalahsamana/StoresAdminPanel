// app/Admin/layout.js
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllStores } from "@/APIs/StoreDetails/getAllStores";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";

export default function AdminLayout({ children }) {
  const { currUser } = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (!currUser?.token) return;
    getAllStores(currUser?.token);
  }, [currUser?.token]);

  return <ProtectedRoute>{children}</ProtectedRoute>;
}