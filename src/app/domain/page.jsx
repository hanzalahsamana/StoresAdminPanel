"use client";
import { verifyDomain } from '@/APIs/Domain/domainVerify';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DomainVerification = () => {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const { currUser } = useSelector((state) => state.currentUser);


  const handleVerifyDomain = async () => {
    try {
      setStatus('Verifying...');
      const data = await verifyDomain(currUser?.brandName, domain);
      setStatus(data.message);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message)
      setStatus('');
    }
  };

  useEffect(() => {
    document.title = 'Domain';
  }, []);


  return (
    <div>
      <h2>Verify Your Custom Domain</h2>
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter your custom domain"
      />
      <button onClick={handleVerifyDomain}>Verify Domain</button>

      {status && <p>{status}</p>}
    </div>
  );
}


export default DomainVerification;