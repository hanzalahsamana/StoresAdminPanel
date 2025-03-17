import { Base_Domain } from "../../config";

export const getBasePath = () => {
  if (typeof window !== "undefined") {
    const host = window.location.host;
    const isSubdomain = host.includes("localhost") 
  ? host.split(".").length > 1 && !host.startsWith("localhost") 
  : host.split(".").length > 2;


    if (isSubdomain) {
      const subdomain = host.split(".")[0];
      return "";
    }

    const pathname = window.location.pathname.split("/").filter(Boolean);
    const storeName = pathname.length > 0 ? pathname[0] : ""; 

    return storeName && host.includes(Base_Domain) ? `/${storeName}` : ""; 
  }
  return "";
};
