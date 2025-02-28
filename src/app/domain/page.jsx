"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormInput from "@/components/Forms/FormInput";
import Button from "@/components/Actions/Button";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import { addDomainDns } from "@/APIs/Domain/domainVerify";
import { IoBagCheck, IoBagCheckOutline, IoCheckmarkCircle, IoCheckmarkDone } from "react-icons/io5";
import ActionCard from "@/components/Cards/ActionCard";
import DnsInstructions from "@/components/TemplateComponents/UI/DNSInstruction";
import Link from "next/link";


const DomainVerification = () => {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { currUser } = useSelector((state) => state.currentUser);

  const handleAddDomainDns = async () => {
    try {
      setError(null)
      setStatus("unVerified");
      if (!domain) {
        return setError({ message: '! Domain name is mandatory' })
      }
      setLoading(true);
      const response = await addDomainDns(domain);
      console.log(response);

      setStatus({ StatusCode: "verified", ...response });
    } catch (error) {
      setError(error?.response ? error.response.data : error)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("hannanFabrics", status);

  }, [status])
  // const handleAddDomainSSL = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await addDomainSSl(domain);
  //     console.log(response, "Domain Verification Response");
  //     setStatus("verified");
  //   } catch (error) {
  //     toast.error(
  //       error.response ? error.response.data.message : error.message
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

      <ActionCard lable={'Custom Domain'} error={error} actions={
        <>
          <Button label="Cancel" variant="outline" className="w-max" />
          <Button loading={loading} label="Add Domain" action={handleAddDomainDns} className="w-max" />
        </>
      }>
        <FormInput
          value={domain}
          placeholder="example.com"
          handleChange={(e) => setDomain(e.target.value)}
        />
        {error && error?.StatusCode === 'UpdateDNS' && (
          <DnsInstructions instructions={error?.instructions} currentIps={error?.current_ip} />
        )}
        {status?.StatusCode === 'verified' && (
          <div className="flex flex-col gap-4">
            <p className="text-[16px] text-textC">Your domain is live <Link href={`https://${status?.domain}`} target={'blank'} className="text-[#386ec5] hover:opacity-80">{status?.domain}</Link></p>

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
    </div>
  );
};

export default ProtectedRoute(DomainVerification);
