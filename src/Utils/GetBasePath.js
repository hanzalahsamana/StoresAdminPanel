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
    const storeId = pathname.length > 1 ? pathname[1] : ""; 

    return storeId && host.includes(Base_Domain) ? `/store/${storeId}` : ""; 
  }
  return "";
};


export const generateSlug = (name) => {
  return name
    .trim() // Remove leading/trailing spaces
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ""); // Remove non-alphanumeric characters except hyphens
};