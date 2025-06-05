"use client";

import { getUserFromToken } from "@/APIs/Auth/getUserFromToken";
import { useEffect } from "react";


// This is for Only Redux Access
const ReduxProviderWrap = ({ children }) => {

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    getUserFromToken(userToken);
  }, []);

  return children;
};

export default ReduxProviderWrap;