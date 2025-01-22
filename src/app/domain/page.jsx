// // Example Component to handle domain verification in frontend (Next.js)
// import { useState } from 'react';

// export default function DomainVerification() {
//     const [domain, setDomain] = useState('');
//     const [status, setStatus] = useState('');
//     const [error, setError] = useState('');

//     const handleVerifyDomain = async () => {
//         try {
//             setStatus('Verifying...');
//             setError('');
//             setStatus('Verifying...');

//             // Make the request to your Node.js backend API
//             const res = await fetch(`http://localhost:3000/verify-domain?domain=${domain}`);

//             if (!res.ok) {
//                 const data = await res.json();
//                 throw new Error(data.error || 'Domain verification failed');
//             }

//             const data = await res.json();
//             setStatus(data.message);
//         } catch (err) {
//             setError(err.message);
//             setStatus('');
//         }
//     };

//     return (
//         <div>
//             <h2>Verify Your Custom Domain</h2>
//             <input 
//                 type="text" 
//                 value={domain} 
//                 onChange={(e) => setDomain(e.target.value)} 
//                 placeholder="Enter your custom domain" 
//             />
//             <button onClick={handleVerifyDomain}>Verify Domain</button>

//             {status && <p>{status}</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//     );
// }
