import { NextResponse } from "next/server";
import BASE_URL from "../config";

export async function middleware(request) {
  // try {
    // if (!navigator.onLine) {
    //   console.error("👍 Everything Okay - Offline");
    //   return NextResponse.rewrite(new URL("/error/network-error", request.url));
    // }
  //   const externalCheck = await fetch("https://www.google.com/generate_204", { cache: "no-store" });

  //   if (!externalCheck.ok) {
  //     console.error("🚨 Network error: No internet");
  //     return NextResponse.rewrite(new URL("/error/network-error", request.url));
  //   }

  //   const testResponse = await fetch(`${BASE_URL}/ping`, { cache: "no-store" });

  //   if (!testResponse.ok) {
  //     console.error("🚨 Server error:", testResponse.status);
  //     return NextResponse.rewrite(new URL("/error/server-crash", request.url));
  //   }
  // } catch (err) { 
  //   console.error("🚨 Network error:", err.message);
  //   return NextResponse.rewrite(new URL("/error/network-error", request.url));
  // }

  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";
  const pathname = url.pathname;
  const BaseDomain =
    process.env.NODE_ENV === "production" ? "designsli" : "localhost:3000";

  if (host.includes(".vercel.app") || pathname.endsWith("/not-found")) {
    return NextResponse.next();
  }

  const subdomain = host.split(".")[0];
  const potentialSlug = subdomain?.replace(`${BaseDomain}`, "");

  if (
    !potentialSlug ||
    potentialSlug === "www" ||
    potentialSlug === "localhost:3000" ||
    potentialSlug === "designsli" ||
    potentialSlug === "dev"
  ) {
    return NextResponse.next();
  }

  // 🌐 Test API call to check for network or server errors

  // 🌍 Main logic to fetch site
  try {
    const ApiQuerry = host.includes(BaseDomain)
      ? `subDomain=${potentialSlug}`
      : `domain=${host}`;
    const response = await fetch(`${BASE_URL}/getStoreByDomain?${ApiQuerry}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data?.store) {
      return NextResponse.rewrite(
        new URL(`/store/${data?.store?._id}${pathname}${url.search}`, request.url)
      );
    }
  } catch (error) {
    console.error("🚨 Site not found:", host, error.message);
  }

  return NextResponse.rewrite(new URL("/error/site-not-found", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.*|robots.txt|service-worker.js).*)",
  ],
};
