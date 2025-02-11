"use client";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormInput from '@/components/Forms/FormInput';
import Button from '@/components/Actions/Button';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import { addDomainToVercel, checkDNSRecords } from '@/APIs/Domain/domainVerify';

const DomainVerification = () => {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { currUser } = useSelector((state) => state.currentUser);

  const handleAddDomain = async () => {
    try {
      setLoading(true);
      setStatus('');
      const abc = await addDomainToVercel(domain);
      console.log(abc, "cocomo");


      setStatus(abc?.message);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDomai = async (domain2) => {
    try {
      setLoading(true)
      const abc2 = await checkDNSRecords(domain2);
      console.log(abc2, "jelly");

      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error, "error22");


    }
  }

  useEffect(() => {
    document.title = 'Domain';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="bg-white shadow-lg rounded-sm p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Verify Your Custom Domain</h2>
        <p className="text-sm text-gray-500 mb-4">Enter your custom domain to verify it with our system.</p>
        <div className="space-y-4">

          <FormInput
            value={domain}
            placeholder="Enter your custom domain"
            handleChange={(e) => setDomain(e.target.value)}
          />

          <Button
            loading={loading}
            label='add Domain'
            action={handleAddDomain}
          />
          <Button
            loading={loading}
            label='Verify Domain'
            action={() => handleVerifyDomai('xperiode.com')}
          />


          {status && <p className="text-center text-gray-700 font-medium">{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute(DomainVerification);
