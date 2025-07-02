import { useEffect, useRef, useState } from 'react';

export const useScrollShadow = (dependencies = []) => {
  const scrollRef = useRef(null);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const atTop = el.scrollTop === 0;
    const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;

    setShowTopShadow(!atTop);
    setShowBottomShadow(!atBottom);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    handleScroll(); // Run on mount
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, dependencies);

  return { scrollRef, showTopShadow, showBottomShadow };
};

export const ScrollShadows = ({ showTopShadow, showBottomShadow }) => {
  return (
    <>
      {showTopShadow && <div className="absolute top-0 left-0 right-0 h-4 pointer-events-none shadow-[inset_0_6px_6px_-6px_rgba(0,0,0,0.1)] z-10" />}
      {showBottomShadow && <div className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none shadow-[inset_0_-6px_6px_-6px_rgba(0,0,0,0.1)] z-10" />}
    </>
  );
};
