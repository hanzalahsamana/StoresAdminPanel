import { NextResponse } from "next/server";
import BASE_URL from "../config";

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";
  const pathname = url.pathname;
  const BaseDomain =
    process.env.NODE_ENV === "production" ? "hannanfabrics" : "localhost:3000";

  console.log("👍", host, "🥀", pathname, "😂", BaseDomain);

  if (host.includes(".vercel.app") || pathname.endsWith("/not-found")) {
    return NextResponse.next();
  }

  const subdomain = host.split(".")[0];
  const potentialSlug = subdomain?.replace(`${BaseDomain}`, "");

  if (!potentialSlug || potentialSlug === "www") {
    return NextResponse.next();
  }

  try {

    const ApiQuerry = host.includes(BaseDomain) ? `subDomain=${potentialSlug}` : `domain=${host}`
    const response = await fetch(
      `${BASE_URL}/fetchSiteByDomain?${ApiQuerry}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data?.siteName) {
      return NextResponse.rewrite(
        new URL(`/${data.siteName}${pathname}${url.search}`, request.url)
      );
    }
  } catch (error) {
    console.error("🚨 Site not found:",host, error.message);
  }

  return NextResponse.rewrite(new URL("/not-found", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.*|robots.txt|service-worker.js).*)",
  ],
};
