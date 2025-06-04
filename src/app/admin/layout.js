"use client";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserFromToken } from "@/APIs/Auth/getUserFromToken";
import { getAllStores } from "@/APIs/StoreDetails/getAllStores";

export default function adminLayout({ children }) {
  const dispatch = useDispatch();
  const { currUser } = useSelector((state) => state.currentUser);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    getUserFromToken(dispatch, userToken);
  }, [dispatch]);

  useEffect(() => {
    if (!currUser?.token) return;
    getAllStores(currUser?.token);
  }, [currUser?.token, dispatch]);

  return children;
}
