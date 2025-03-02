"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormInput from "@/components/Forms/FormInput";
import Button from "@/components/Actions/Button";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import { addDomainDns, genrateSSl } from "@/APIs/Domain/domainVerify";
import { IoBagCheck, IoBagCheckOutline, IoCheckmarkCircle, IoCheckmarkDone } from "react-icons/io5";
import ActionCard from "@/components/Cards/ActionCard";
import DnsInstructions from "@/components/TemplateComponents/UI/DNSInstruction";
import Link from "next/link";


const DomainVerification = () => {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { currUser } = useSelector((state) => state.currentUser);

  const handleAddDomainDns = async (domain) => {
    try {
      setError(null)
      setStatus("unVerified");
      if (!domain) {
        return setError({ message: '! Domain name is mandatory' })
      }
      setLoading(true);
      const response = await addDomainDns(domain, currUser?.brandName);
      console.log(response);

      setStatus({ StatusCode: "verified", ...response });
      setStep(3)
    } catch (error) {
      setError(error?.response ? error.response.data : error)
      if (error?.response && error?.response?.data?.StatusCode === 'UpdateDNS') {
        setStep(3)
      }

    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (currUser?.customDomain) {
      console.log("👩‍🦰");

      setDomain(currUser?.customDomain)
      handleAddDomainDns(currUser?.customDomain)
    }

  }, [currUser])
  const handleAddDomainSSL = async (domain) => {
    try {
      setLoading(true);
      const response = await genrateSSl(domain);
      console.log(response, "Domain Verification Response");
      // setStatus("verified");
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
    <div className="flex flex-col gap-[20px] py-[20px] min-h-screen px-8">
      <div className="p-8 w-full border border-borderC rounded-md flex flex-col gap-[20px] bg-white">
        <h1 className="text-textC font-semibold text-[24px]">Your Sub-domain</h1>

        {/* <FormInput
          value={domain}
          placeholder="Enter your custom domain"
          handleChange={(e) => setDomain(e.target.value)}
        /> */}

        <p className="text-[16px] text-textC">Your Site subdomain is <Link href={`https://${currUser?.brandName}.hannanfabrics.com`} target={'blank'} className="text-[#386ec5] hover:opacity-80">unique.hannanfabrics.com</Link></p>
        <div className="flex gap-6">
          <div className="flex text-[13px] gap-2">
            <IoBagCheck className="text-blue-500" />
            <p className="text-textTC">SSL Generated</p>
          </div>
          <div className="flex text-[13px] gap-2">
            <IoCheckmarkCircle className="text-blue-500" />
            <p className="text-textTC">Valid Configuration</p>
          </div>
        </div>
        <div className="flex justify-end items-center gap-[20px]">
          <Button label="Edit" className="w-max" />
          {/* <Button label="Add Domain" className="w-max" /> */}
        </div>
      </div>

      {step === 1 && (
        <ActionCard lable={'Custom Domain'} actions={
          <>
            <Button loading={loading} label="Add Domain" action={() => setStep(2)} className="w-max" />
          </>
        }>

          <p className="text-textTC text-[16px] ">You have not any Custom Domain to your store.</p>

        </ActionCard>
      )}
      {step === 2 && (


        <ActionCard lable={'Custom Domain'} error={error} actions={
          <>
            <Button label="Cancel" variant="outline" action={() => setStep(1)} className="w-max" />
            <Button loading={loading} label="Add Domain" action={() => handleAddDomainDns(domain)} className="w-max min-w-[150px]" />
          </>
        }>
          <FormInput
            value={domain}
            placeholder="example.com"
            handleChange={(e) => setDomain(e.target.value)}
          />
        </ActionCard>
      )}
      {currUser?.customDomain && step === 3 && (


        <ActionCard lable={'Custom Domain'} error={error} actions={
          <>
            <Button label="Verify" loading={loading} variant="outline" action={() => handleAddDomainDns(currUser?.customDomain) } className="w-max" />
            <Button label="SSL" loading={loading} variant="outline" action={() => handleAddDomainSSL("xperiode.com") } className="w-max" />
            <Button label="Delete Domain" action={() => {
              setStep(1)
            }} className="w-max min-w-[150px]" />
          </>
        }>
          {error && error?.StatusCode === 'UpdateDNS' && (
            <div className="flex flex-col gap-3">
              <p className="text-[16px] text-textC">Your domain <Link href={`https://${domain}`} target={'blank'} className="text-[#386ec5] hover:opacity-80">{domain}</Link> has not have valid DNS.</p>
              <DnsInstructions instructions={error?.instructions} currentIps={error?.current_ip} />
            </div>
          )}
          {status?.StatusCode === 'verified' && (
            <div className="flex flex-col gap-4">
              <p className="text-[16px] text-textC">Your domain is live <Link href={`https://${currUser?.customDomain}`} target={'blank'} className="text-[#386ec5] hover:opacity-80">{currUser?.customDomain}</Link></p>

              <div className="flex text-[13px] gap-2">
                <IoCheckmarkCircle className="text-blue-500" />
                <p className="text-textTC">Valid Configuration</p>
              </div>
              <div className="flex text-[13px] gap-2">
                <IoBagCheck className="text-blue-500" />
                <p className="text-textTC">SSL Generated</p>
              </div>
            </div>
          )}
        </ActionCard>
      )}

    </div>
  );
};

export default ProtectedRoute(DomainVerification);
