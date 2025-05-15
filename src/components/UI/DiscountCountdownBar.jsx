import { useEffect, useState } from "react";

const DiscountCountdownBar = ({ discount }) => {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (!discount || !discount.isActive || discount.discountType !== "global") return;

        const updateTimer = () => {
            const now = Date.now();
            const expiry = new Date(discount.expiryDate).getTime();
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
        Object.keys(discount).length === 0 ||
        new Date(discount.expiryDate).getTime() < Date.now()
    ) {
        return null;
    }

    if (!discount.isActive || discount.discountType !== "global" || !timeLeft) return null;

    const { name, amount, amountType } = discount;
    const discountText = amountType === "percent" ? `${amount}% OFF` : `$${amount} OFF`;

    return (
        <div className="w-full p-2 bg-[var(--tmp-acc)] opacity-80 shadow-inner border-b-[1px] border-borderC text-text-textC text-sm flex items-center justify-center gap-8 px-4 z-50">
            <div>
                <span className="mr-2">NewYear Offer</span>
                <span className="font-semibold mr-2">{discountText}</span>
                <span className="mr-2">— Use code:</span>
                <span className="text-red-600 py-0.5 rounded font-bold">{name}</span>
            </div>
            <div className="flex gap-2 items-center">
                <div className="flex items-center gap-2">
                    <span className="countdown-box">{timeLeft.days}</span>
                    <span>:</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="countdown-box">{timeLeft.hours}</span>
                    <span>:</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="countdown-box">{timeLeft.minutes}</span>
                    <span>:</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="countdown-box">{timeLeft.seconds}</span>
                    <span> </span>
                </div>
            </div>
            {/* <div className="flex gap-2 items-center">

                <strong>Hurry!</strong> Offer ends in:
                <span className="countdown-box">{timeLeft.days}</span>
                <span>d</span>
                <span className="countdown-box">{timeLeft.hours}</span>
                <span>h</span>
                <span className="countdown-box">{timeLeft.minutes}</span>
                <span>m</span>
                <span className="countdown-box">{timeLeft.seconds}</span>
                <span>s</span>
            </div> */}
        </div>
    );
};

export default DiscountCountdownBar;
