// // middleware.js (Next.js middleware)
// import { NextResponse } from 'next/server';
// // import { getDomainMapping } from './utils/domainService'; // Replace with your actual DB fetch function

// export async function middleware(req) {
//     console.log("Middleware executed");
//     const hostname = req.headers.get('host'); // Get the incoming request's host (e.g., mystore.com or user.admin-panel.vercel.app)
//     console.log( "🔖🔖",req.nextUrl.clone());

//     // Base domain for subdomains (e.g., admin-panel.vercel.app in dev/production)
//     const baseDomain =
//         process.env.NODE_ENV === 'production' ? 'admin-panel.com' : 'admin-panel.vercel.app';

//     let siteIdentifier; // This will hold the subdomain or custom domain logic

//     // Handle Subdomain Logic
//     if (hostname.endsWith(baseDomain)) {
//         siteIdentifier = hostname.replace(.${baseDomain}, ''); // Extract subdomain (e.g., 'user' from 'user.admin-panel.vercel.app')
//     } else {
//         // Handle Custom Domain Logic
//         siteIdentifier = hostname; // Custom domain hostname (e.g., 'mystore.com')
//     }

//     // Fetch site information from the database
//     // const site = await getDomainMapping(siteIdentifier);

//     if (false) {
//         // Rewrite the request to serve the corresponding site
//         const url = req.nextUrl.clone();
//         url.pathname = /stores/${site.id}${req.nextUrl.pathname}; // Rewrite to the store page (e.g., /stores/123)
//         return NextResponse.rewrite(url);
//     }

//     // If no site found, continue as usual (or show a 404 page if needed)
//     return NextResponse.next();
// }

// // Define the middleware matcher
// export const config = {
//     matcher: '/', // Exclude static assets & API routes
// };
// const basePath = getBasePath();

// const response = await fetch(${basePath}/api/validate-slug, {
//   method: "POST",
//   body: JSON.stringify({ slug: potentialSlug }),
//   headers: { "Content-Type": "application/json" },
// });

// const restaurant = await response.json();

// if (!restaurant?.invalid) {
//   console.log("Invalid slug", host, subdomain, pathname, potentialSlug);
//   return NextResponse.redirect(
//     new URL(${basePath}/not-found, request.url),
//     302
//   );
// }

// if (!restaurant?.isActive && !pathname.Includes("subscription-expired")) {
//   return NextResponse.redirect(
//     ${getBasePath(potentialSlug)}/subscription-expired
//   );
// }
import { NextResponse } from "next/server";
import axios from "axios";
import BASE_URL from "../config"; // Ensure correct path to your config file

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";
  const pathname = url.pathname;
  const BaseDomain =
    process.env.NODE_ENV === "production" ? "hannanfabrics" : "localhost:3000";

  // console.log("🔖🔖", url, "👍", host, "🥀", pathname, "😂", BaseDomain);

  if (host.includes(".vercel.app") || pathname.endsWith("/not-found")) {
    return NextResponse.next();
  }

  const subdomain = host.split(".")[0];
  const potentialSlug = subdomain?.replace(`${BaseDomain}`, "");

  if (!potentialSlug || potentialSlug === "www") {
    // console.log("No potential slug", {
    //   host,
    //   subdomain,
    //   pathname,
    //   potentialSlug,
    // });

    return NextResponse.next();
  }

  try {
    // 🔥 Call API to check if the site exists using fetch
    const response = await fetch(
      `${BASE_URL}/fetchSiteByDomain?domain=${potentialSlug}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data?.siteName) {
      // console.log("✅ Site found:", data.siteName);
      return NextResponse.rewrite(
        new URL(`/${data.siteName}${pathname}${url.search}`, request.url)
      );
    }
  } catch (error) {
    console.error("🚨 Site not found:", error.message);
  }

  // 🚨 If site not found, redirect to /not-found
  return NextResponse.rewrite(new URL("/not-found", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.*|robots.txt|service-worker.js).*)",
  ],
};
