// middleware.js (Next.js middleware)
import { NextResponse } from 'next/server';
import { getDomainMapping } from './utils/domainService'; // Replace with your actual DB fetch function

export async function middleware(req) {
    const hostname = req.headers.get('host'); // Get the incoming request's host (e.g., mystore.com or user.admin-panel.vercel.app)

    // Base domain for subdomains (e.g., admin-panel.vercel.app in dev/production)
    const baseDomain =
        process.env.NODE_ENV === 'production' ? 'admin-panel.com' : 'admin-panel.vercel.app';

    let siteIdentifier; // This will hold the subdomain or custom domain logic

    // Handle Subdomain Logic
    if (hostname.endsWith(baseDomain)) {
        siteIdentifier = hostname.replace(`.${baseDomain}`, ''); // Extract subdomain (e.g., 'user' from 'user.admin-panel.vercel.app')
    } else {
        // Handle Custom Domain Logic
        siteIdentifier = hostname; // Custom domain hostname (e.g., 'mystore.com')
    }

    // Fetch site information from the database
    const site = await getDomainMapping(siteIdentifier);

    if (site) {
        // Rewrite the request to serve the corresponding site
        const url = req.nextUrl.clone();
        url.pathname = `/stores/${site.id}${req.nextUrl.pathname}`; // Rewrite to the store page (e.g., /stores/123)
        return NextResponse.rewrite(url);
    }

    // If no site found, continue as usual (or show a 404 page if needed)
    return NextResponse.next();
}

// Define the middleware matcher
export const config = {
    matcher: ['/', '/((?!_next).*)'], // Apply middleware to all paths except _next (static assets)
};
