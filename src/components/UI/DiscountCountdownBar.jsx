import { useEffect, useState } from 'react';

const AnnouncementCountdownBar = ({ announcement }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!announcement?.timer) return;

    const updateTimer = () => {
      const now = Date.now();
      const expiry = new Date(announcement?.timer).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [announcement]);

  // agar description aur date dono nahi hain, to kuch show mat karo
  if (
    !announcement ||
    (!announcement?.description && !announcement?.timer) ||
    (announcement?.timer && new Date(announcement?.timer).getTime() < Date.now()) ||
    (announcement?.timer && !timeLeft)
  ) {
    return null;
  }

  return (
    <div className="w-full p-2 bg-[var(--tmp-acc)] opacity-90 shadow-inner border-b border-borderC text-text-textC text-sm flex items-center justify-between gap-6 px-4 z-50 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap font-medium">{announcement.description}</div>

      {announcement?.timer && timeLeft && (
        <div className="flex gap-2 items-center">
          <span className="countdown-box">{timeLeft.days}</span>
          <span>:</span>
          <span className="countdown-box">{timeLeft.hours}</span>
          <span>:</span>
          <span className="countdown-box">{timeLeft.minutes}</span>
          <span>:</span>
          <span className="countdown-box">{timeLeft.seconds}</span>
        </div>
      )}
    </div>
  );
};

export default AnnouncementCountdownBar;
