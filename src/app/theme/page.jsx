"use client";
import { setTheme } from '@/APIs/Theme/setTheme';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes'
import Button from '@/components/Actions/Button';
import IconButton from '@/components/Actions/IconButton';
import ActionCard from '@/components/Cards/ActionCard';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import HomeLayout from '@/components/Layout/HomeLayout';
import TemplateFooter from '@/components/Layout/TemplateFooter';
import TemplateHeader from '@/components/Layout/TemplateHeader';
import LivePreview from '@/components/UI/LivePreview';
import ThemeSelector from '@/components/Uploaders/ThemeSeletctor'
import React, { useEffect, useState } from 'react'
import { CiUndo } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import _ from "lodash";


const Theme = () => {
  const { currUser } = useSelector((state) => state.currentUser);
  const { theme } = useSelector((state) => state.theme);

  const [formData, setFormData] = useState(theme || {});
  const [isModified, setIsModified] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const dispatch = useDispatch();


  const handleSave = async () => {
    setIsLoading(true);
    try {
      await setTheme(formData, currUser?.token, dispatch);
      toast.success("Theme updated successfully!");
    } catch (err) {
      console.error("Theme update failed:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFormData(theme || {});
  }, [theme]);


  useEffect(() => {
    setIsModified(!_.isEqual(theme, formData));
  }, [theme, formData]);

  return (
    <div className='flex justify-center items-start flex-col md:flex-row'>
      <BackgroundFrame>
        <ActionCard
          actions={
            <>
              <Button size='small' active={isModified} label="Save" loading={loading} variant='black' className="w-max" action={handleSave} />
              <IconButton
                icon={<CiUndo />}
                tooltipLabel={'discard'}
                className={` !text-[22px] ${isModified ? 'text-black' : 'text-[#4f4c4c89] !cursor-not-allowed'}`}
                action={() => setFormData(theme)}
              />
            </>}
          actionPosition='top'
          lable={'Set Theme Color'}
          className={'!px-5 !py-3 !h-[calc(100vh-92px)]'}
        >
          <div className='h-full overflow-y-auto customScroll px-[10px]'>
            <ThemeSelector
              theme={formData}
              setTheme={setFormData}
            />
          </div>
        </ActionCard>
      </BackgroundFrame>
      <LivePreview>
        <TemplateHeader />
        <HomeLayout />
        <TemplateFooter />
      </LivePreview>
    </div>
  )
}

export default ProtectedRoute(Theme)