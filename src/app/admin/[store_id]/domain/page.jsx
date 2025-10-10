'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormInput from '@/components/Forms/FormInput';
import Button from '@/components/Actions/Button';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import { addDomainDns, genrateSSl } from '@/APIs/Domain/domainVerify';
import { IoBagCheck, IoCheckmarkCircle, IoReloadOutline } from 'react-icons/io5';
import ActionCard from '@/components/Cards/ActionCard';
import DnsInstructions from '@/components/UI/DNSInstruction';
import Link from 'next/link';
import { deleteDomain } from '@/APIs/Domain/deleteDomain';
import { setCurrentUser } from '@/Redux/Authentication/AuthSlice';
import { Base_Domain, HTTP } from '../../../../../config';
import { CiUnlock } from 'react-icons/ci';
import { addCustomDomain } from '@/APIs/CustomDomain/addCustomDomain';
import { setStore } from '@/Redux/Store/StoreDetail.slice';
import { verifyDomain } from '@/APIs/CustomDomain/verifyDomain';
import { deleteCustomDomain } from '@/APIs/CustomDomain/deleteCustomDomain';
import { useRouter } from 'next/navigation';

const DomainVerification = () => {
  const [domain, setDomain] = useState('');
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const router = useRouter();

  // const handleAddDomainDns = async (domain) => {
  //   try {
  //     setError(null)
  //     setStatus("unVerified");
  //     if (!domain) {
  //       return setError({ message: '! Domain name is mandatory' })
  //     }
  //     setLoading(true);
  //     const response = await addDomainDns(domain, currUser?.brandName);

  //     console.log(response);

  //     setStatus({ StatusCode: "verified", ...response });
  //     setStep(2)
  //   } catch (error) {
  //     setError(error?.response ? error.response.data : error)
  //     if (error?.response && error?.response?.data?.StatusCode === 'UpdateDNS') {
  //       dispatch(setCurrentUser({ ...currUser, customDomain: domain }))
  //       setStep(2)
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (currUser?.customDomain) {
  //     console.log("👩‍🦰", currUser?.customDomain);

  //     setDomain(currUser?.customDomain)
  //     handleAddDomainDns(currUser?.customDomain)
  //   }

  // }, [])
  // const handleDeleteDomain = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await deleteDomain(currUser?.brandName);
  //     console.log(response, "Domain Verification Response");
  //     dispatch(setCurrentUser({ ...currUser, customDomain: null }))
  //     setStep(1)
  //     // setStatus("verified");
  //   } catch (error) {
  //     toast.error(
  //       error.response ? error.response.data.message : error.message
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const handleAddDomainSSL = async (domain) => {
  //   try {
  //     setLoading(true);
  //     const response = await genrateSSl(domain);
  //     console.log(response, "Domain Verification Response");
  //     // setStatus("verified");
  //   } catch (error) {
  //     toast.error(
  //       error.response ? error.response.data.message : error.message
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAddDomain = async (domain) => {
    try {
      setLoading(true);
      const response = await addCustomDomain(currUser?.token, store?._id, { domain });
      setStep(2);
      dispatch(setStore({ ...store, customDomain: domain, isDomainVerified: false }));
    } catch (error) {
      setStatus(error?.response ? error.response.data : { message: error?.message });
      // toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDomain = async () => {
    try {
      setLoading(true);
      const response = await verifyDomain(currUser?.token, store?._id, store?.customDomain);
      setStatus(response);
      dispatch(setStore({ ...store, customDomain: store?.customDomain, isDomainVerified: true }));
    } catch (error) {
      const validError = error?.response?.data;
      if (validError?.code === 'DomainNotFound') {
        dispatch(setStore({ ...store, customDomain: null, isDomainVerified: false }));
        setStep(1);
        toast.error(validError?.message);
      } else if (validError?.code === 'UpdateDNS') {
        dispatch(setStore({ ...store, customDomain: store?.customDomain, isDomainVerified: false }));
        setStatus(validError);
      } else {
        setStatus({ message: error?.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDomain = async () => {
    try {
      setDeleteLoading(true);
      const response = await deleteCustomDomain(currUser?.token, store?._id);
      setStep(1);
      dispatch(setStore({ ...store, customDomain: null, isDomainVerified: false }));
      toast.success(response?.message);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (step === 2) {
      handleVerifyDomain();
    }
  }, [step]);
  console.log('store==>', store);
  return (
    <div className="flex flex-col gap-[20px] py-[20px] min-h-screen px-8">
      <ActionCard label={'Sub Domain'} subText={'View your sub domain.'} className={'relative'}>
        <p className="text-[18px] text-textC">
          Your Site subdomain is{' '}
          <Link href={`${HTTP}${store?.subDomain}.${Base_Domain}`} target={'blank'} className="text-[#386ec5] hover:opacity-80">
            {store?.subDomain}.{Base_Domain}
          </Link>
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex text-[13px] gap-2">
            <IoBagCheck className="text-blue-500" />
            <p className="text-textTC">SSL Generated</p>
          </div>
          <div className="flex text-[13px] gap-2">
            <IoCheckmarkCircle className="text-blue-500" />
            <p className="text-textTC">Valid Configuration</p>
          </div>
        </div>
      </ActionCard>

      {!store?.customDomain ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddDomain(domain);
          }}
        >
          <ActionCard
            label={'Custom Domain'}
            subText={'Add and manage your domain.'}
            error={error}
            className={'relative'}
            actions={
              <>
                <Button
                  loading={loading}
                  label="Add Domain"
                  size="small"
                  type="submit"
                  // action={() => handleAddDomain(domain)}
                  className="w-max min-w-[150px]"
                />
              </>
            }
          >
            {store?.subscriptionId?.status !== 'active' && (
              <div className="w-full h-full absolute top-0 left-0 bg-[#ffffffa0] backdrop-blur-md z-[20] rounded-md flex flex-col gap-4 justify-center items-center">
                <p className="text-textC font-medium flex items-center gap-3 text-[22px]">
                  <CiUnlock strokeWidth={1.3} size={20} /> Unlock Custom Domain Setup.
                </p>
                <Button size="small" label="Upgrade Now" action={() => router.push('./configurations/subscription')} />
              </div>
            )}
            {/* <p className="text-textTC text-[16px]">You have not any Custom Domain to your store.</p> */}

            <FormInput value={domain} placeholder="example.com" onChange={(e) => setDomain(e.target.value)} prefix={'https://'} label="Your Domain:" required={false} />
          </ActionCard>
        </form>
      ) : (
        <ActionCard
          label={'Custom Domain'}
          error={error}
          loading={loading}
          actions={
            <>
              <Button
                size="small"
                icon={<IoReloadOutline />}
                iconPosition="right"
                label="Verify"
                loading={loading}
                variant="white"
                action={() => handleVerifyDomain()}
                className="w-max"
              />
              <Button
                size="small"
                label="Delete Domain"
                loading={deleteLoading}
                variant="danger"
                action={() => {
                  handleDeleteDomain();
                }}
                className="w-max"
              />
            </>
          }
        >
          {!status?.verified && (
            <div className="flex flex-col gap-3">
              {status?.code && (
                <p className="text-[13px] text-textTC">
                  Error Code : <span className="text-red-500">{status?.code}</span>
                </p>
              )}
              {status?.message && <p className="text-[16px] text-textC">{status?.message}</p>}
              {status?.configs && <DnsInstructions instructions={status?.configs} />}
            </div>
          )}
          {status?.verified && (
            <div className="flex flex-col gap-4">
              <p className="text-[18px] text-textC">
                Your domain is live{' '}
                <Link href={`${HTTP}${store?.customDomain}`} target={'blank'} className="text-[#386ec5] hover:opacity-80">
                  {store?.customDomain}
                </Link>
              </p>

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

export default DomainVerification;
