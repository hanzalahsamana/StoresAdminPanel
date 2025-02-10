export const getBasePath = () => {
  if (typeof window !== "undefined") {
    const host = window.location.host;
    const isSubdomain = host.includes("localhost") 
  ? host.split(".").length > 1 && !host.startsWith("localhost") 
  : host.split(".").length > 2;

    console.log(host , isSubdomain , "{}{}{}{}{}{}{{{{{{{{");
    

    if (isSubdomain) {
      const subdomain = host.split(".")[0];
      return ""; // No need to modify path for subdomains
    }

    // Extract store name dynamically from the URL path when no subdomain is found
    const pathname = window.location.pathname.split("/").filter(Boolean);
    const storeName = pathname.length > 0 ? pathname[0] : ""; // Get first segment

    return storeName ? `/${storeName}` : ""; // Return empty if no store name exists
  }
  return "";
};
