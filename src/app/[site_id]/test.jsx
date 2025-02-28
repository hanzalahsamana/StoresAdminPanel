// import { readSiteById } from "@/utils/actions/sites/read-site-id";
// import { notFound } from "next/navigation";
// import { NavBar } from "./_components/NavBar";

// export default async function SiteLayout({
//   params,
//   children,
// }) {

//   const result = await readSiteById(params?.site_id);

//   if (!result) {
//     notFound();
//   }

//   const siteName = result?.[0]?.site_name;
//   const siteDomain = result?.[0]?.site_custom_domain;
//   const siteDescription = result?.[0]?.site_description;
//   const siteLogo = result?.[0]?.site_logo;
//   const siteCover = result?.[0]?.site_cover_image;

//   return (
//     <>
//       <head>
//         <title>{siteName}</title>
//         <meta name="site_name" content={siteName} />
//         <meta name="description" content={siteDescription} />
//         {siteCover && <meta name="image" content={siteCover} />}
//         <meta name="url" content={siteDomain + "." + process.env.BASE_DOMAIN}></meta>
//         {siteLogo && <link rel="icon" href={siteLogo} />}
//       </head>
//       <body>

//         <NavBar
//           title={siteName}
//           description={siteDescription}
//           logo={siteLogo}
//         />
//         <main className="flex min-w-screen flex-col items-center justify-between mt-[1rem]">
//           {children}
//         </main>
//       </body>
//     </>
//   );
// }
