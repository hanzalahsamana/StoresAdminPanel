import { useEffect, useState } from "react";

const DiscountCountdownBar = ({ discount }) => {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const updateTimer = () => {
            const now = Date.now();
            const expiry = new Date(discount?.expiryDate).getTime();
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
                days: String(days).padStart(2, "0"),
                hours: String(hours).padStart(2, "0"),
                minutes: String(minutes).padStart(2, "0"),
                seconds: String(seconds).padStart(2, "0"),
            });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [discount]);

    if (
        !discount ||
        !discount.isActive ||
        new Date(discount.expiryDate).getTime() < Date.now() ||
        !timeLeft
    ) {
        return null;
    }

    const isPercent = discount.amountType === "percent";
    const discountText = isPercent ? `${discount.amount}% OFF` : `Rs ${discount.amount} OFF`;
    const isGlobal = discount.discountType === "global";
    const isSubscription = discount.access === "subscription";

    return (
        <div className="w-full p-2 bg-[var(--tmp-acc)] opacity-90 shadow-inner border-b-[1px] border-borderC text-text-textC text-sm flex items-center justify-between gap-6 px-4 z-50 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
                {!isGlobal ? (
                    <>
                        <span className="font-semibold">{discountText}</span>
                        <span>— Use code:</span>
                        <span className="text-red-600 font-bold">{discount.name}</span>
                        {isSubscription && (
                            <span className="ml-2 italic text-sm">
                                (Subscribe your email to get this discount)
                            </span>
                        )}
                    </>
                ) : (
                    <>
                        <span className="font-semibold">{discountText}</span>
                        <span className="italic text-sm">(Limited Time Offer)</span>
                    </>
                )}
            </div>

            <div className="flex gap-2 items-center">
                <span className="countdown-box">{timeLeft.days}</span><span>:</span>
                <span className="countdown-box">{timeLeft.hours}</span><span>:</span>
                <span className="countdown-box">{timeLeft.minutes}</span><span>:</span>
                <span className="countdown-box">{timeLeft.seconds}</span>
            </div>
        </div>
    );
};

export default DiscountCountdownBar;
