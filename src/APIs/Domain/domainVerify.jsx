"use client";

import axios from "axios";
import BASE_URL from "../../../config";

export const addDomainSSl = async (domain) => {
    try {
        console.log(BASE_URL , domain , "♀️♀️");
        const response = await axios.post(`${BASE_URL}/${'abc'}/addDomainSSl` , {domain});
        console.log(response , "♀️♀️♀️");
        
        return response.data;
    } catch (error) {
        console.log(error , "♀️♀️♀️♀️");
        
        throw error
    }
};
export const addDomainDns = async (domain) => {
    try {
        console.log(BASE_URL , domain , "♀️♀️");
        
        const response = await axios.post(`${BASE_URL}/${'abc'}/addDomainDns` , {domain});
        console.log(response , "♀️♀️♀️");
        
        return response.data;
    } catch (error) {
        console.log(error , "♀️♀️♀️♀️");
        
        throw error
    }
};

// export const addDomainToVercel = async (domain) => {
//     const projectId = "prj_VT2SlcCEyjEGxZnscf9OciJfIK64"; // Replace with your Vercel project ID
//     const vercelToken = "VNhqswlhWjCF2wJrvxtVnmVu"; // Store securely

//     const response = await fetch(`https://api.vercel.com/v9/projects/${projectId}/domains`, {
//         method: "POST",
//         headers: {
//             "Authorization": `Bearer ${vercelToken}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ name: domain })
//     });





// export const addDomainToVercel = async (domain) => {
//     return await fetch(
//         `https://api.vercel.com/v10/projects/${'prj_VT2SlcCEyjEGxZnscf9OciJfIK64'
//         }/domains${process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
//         }`,
//         {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${'1e4xkDbzsCmx4cZgFc6XlEMl'}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 name: domain,
//                 // Optional: Redirect www. to root domain
//                 // ...(domain.startsWith("www.") && {
//                 //   redirect: domain.replace("www.", ""),
//                 // }),
//             }),
//         },
//     ).then((res) => res.json());
// };

// export const verifyDomain = async (
//     domain,
// ) => {
//     return await fetch(
//         `https://api.vercel.com/v9/projects/${'prj_VT2SlcCEyjEGxZnscf9OciJfIK64'
//         }/domains/${domain}/verify${process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
//         }`,
//         {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${'1e4xkDbzsCmx4cZgFc6XlEMl'}`,
//                 "Content-Type": "application/json",
//             },
//         },
//     ).then((res) => res.json());
// };


// export const fetchDomainInfo = async (domain) => {
//     const response = await fetch(`https://api.vercel.com/v6/domains/${domain}`, {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${'1e4xkDbzsCmx4cZgFc6XlEMl'}`, // Use your Vercel API token
//             "Content-Type": "application/json",
//         },
//     });

//     const data = await response.json();
//     console.log(data , 'info'); // Log the response to see the full domain configurati,"domain!"on
//     return data;
// };
// const data = await response.json();
// console.log(data , "cocomo2","domain!");


// Example usage









//  export const addDomainToVercel = async (domain) => {
//     try {
//         const response = await fetch(`https://api.vercel.com/v10/projects/${'prj_VT2SlcCEyjEGxZnscf9OciJfIK64'}/domains`, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${'1e4xkDbzsCmx4cZgFc6XlEMl'}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ name: domain }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//             console.log("Domain added:", data,"domain!");
//             return data;
//         } else {
//             console.error("Error adding domain:", data.error?.message,"domain!");
//             return null;
//         }
//     } catch (error) {
//         console.error("Network error:", error,"domain!");
//         return null;
//     }
// };


// export const checkDomainVerification = async (domain) => {
//     try {
//         const response = await fetch(`https://api.vercel.com/v5/domains/${domain}?teamId=team_egUuXDlYwo7Q7Oyuw0DrriTS`, {
//             headers: {
//                 Authorization: `Bearer ${'1e4xkDbzsCmx4cZgFc6XlEMl'}`,
//             },
//         });

//         const data = await response.json();

//         console.log(data , JSON.stringify(data) , "🎃🎃🎃🎃");
        
//         if (response.ok && data.verified) {
//             console.log("✅ Domain is verified and live!","domain!");
//             return { status: "live", data };
//         } else {
//             console.log("❌ Domain not verified. Ask user to update DNS.","domain!");
//             return { status: "pending", instructions: "Please update your DNS settings." };
//         }
//     } catch (error) {
//         console.error("Error checking verification:", error,"domain!");
//         return { status: "error", message: "Failed to check domain verification." };
//     }
// };


// export const checkDNSRecords = async (domain) => {
//     try {
//         const response = await fetch(`https://api.vercel.com/v4/domains/${domain}/config?teamId=team_egUuXDlYwo7Q7Oyuw0DrriTS`, {
//             headers: {
//                 Authorization: `Bearer ${'1e4xkDbzsCmx4cZgFc6XlEMl'}`,
//             },
//         });

//         const data = await response.json(); 

//         if (!response.ok) {
//             console.error("Failed to fetch DNS records:", data,"domain!");
//             return { status: "error", message: data.error?.message };
//         }
//         console.log(data , "domain! hello worl");


//         const expectedCNAME = "cname.vercel-dns.com";
//         const expectedA = "76.76.21.21";

//         const cnameRecord = data.records.find(record => record.type === "CNAME");
//         const aRecord = data.records.find(record => record.type === "A");

//         if (cnameRecord?.value === expectedCNAME || aRecord?.value === expectedA) {
//             console.log("✅ DNS settings are correct.","domain!");
//             return { status: "verified", records: data.records };
//         } else {
//             console.log("❌ Incorrect DNS settings. Ask user to update.","domain!");
//             return { status: "pending", instructions: `Please update your DNS settings:
//                 - CNAME: ${expectedCNAME}
//                 - A: ${expectedA}` };
//         }
//     } catch (error) {
//         console.error("Error fetching DNS records:", error,"domain!");
//         return { status: "error", message: "Failed to fetch DNS records." };
//     }
// };










