"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormInput from "@/components/Forms/FormInput";
import Button from "@/components/Actions/Button";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import { addDomainDns, addDomainSSl } from "@/APIs/Domain/domainVerify";


const DomainVerification = () => {
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { currUser } = useSelector((state) => state.currentUser);

  const handleAddDomainDns = async () => {
    try {
      setLoading(true);
      setStatus("");
      const response = await addDomainDns(domain);
      setStatus(response?.message || "Domain added successfully");
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddDomainSSL = async () => {
    try {
      setLoading(true);
      const response = await addDomainSSl(domain);
      console.log(response, "Domain Verification Response");
      setStatus(response?.message || "Domain verified successfully");
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Domain";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-sm p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Verify Your Custom Domain
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter your custom domain to verify it with our system.
        </p>
        <div className="space-y-4">
          <FormInput
            value={domain}
            placeholder="Enter your custom domain"
            handleChange={(e) => setDomain(e.target.value)}
          />

          <Button loading={loading} label="Add Domain" action={handleAddDomainDns} />
          <Button
            loading={loading}
            label="Verify Domain"
            action={handleAddDomainSSL}
          />

          {status && (
            <p className="text-center text-gray-700 font-medium">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute(DomainVerification);
  