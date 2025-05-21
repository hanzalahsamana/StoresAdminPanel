import { formatAmount, getValidDiscountAmount } from '@/Utils/CheckoutHelpers';
import { IoPricetags } from 'react-icons/io5';

function DiscountRow({ discount, label, adjustedTotal }) {
    if (!discount) return null;

    const validAmount = getValidDiscountAmount(
        discount,
        adjustedTotal !== undefined ? adjustedTotal : undefined
    );

    return (
        <div className="flex justify-between">
            <div className="flex w-max text-[11px] items-center gap-2 bg-[var(--tmp-acc)] px-[6px] py-[2px] rounded-md">
                <IoPricetags />
                <p>{discount.name || label}</p>
            </div>
            <div>
                <span className="text-[14px]">
                    {discount.amountType === 'percent' ? (
                        <>-{discount.amount}% = Rs -{formatAmount(validAmount)}</>
                    ) : (
                        <>Rs -{formatAmount(discount.amount)}</>
                    )}
                </span>
            </div>
        </div>
    );
}

function PaymentSummary({ totalProductCost, globalDiscount, couponDiscount, subTotal, shippingCost, tax, total, children }) {
    const formatDiscount = () => (
        <div className="flex justify-between gap-3 py-2">
            <p>Discount</p>
            <div className="flex flex-col flex-1 gap-3">
                <DiscountRow discount={globalDiscount} label="Global Discount" />
                <DiscountRow
                    discount={couponDiscount}
                    label="Coupon Discount"
                    adjustedTotal={totalProductCost - getValidDiscountAmount(globalDiscount)}
                />
            </div>
        </div>
    );

    return (
        <div className="flex w-full gap-2 py-[25px] text-[var(--tmp-ltxt)] bg-[white] rounded-md border p-5">
            <div className="flex-col w-full">
                <p className="w-full flex justify-between text-[14px] font-semibold border-b pb-2">
                    <span>Total Product Cost</span>
                    <span>Rs {formatAmount(totalProductCost)}</span>
                </p>

                {globalDiscount || couponDiscount ? formatDiscount() : (
                    <p className="w-full flex justify-between text-[14px] py-[10px]">
                        <span>Discount</span>
                        <span className="text-[14px] text-gray-500 italic">No discounts applied</span>
                    </p>
                )}

                <p className="w-full flex justify-between text-[14px] border-t pt-2">
                    <span>Sub Total</span>
                    <span>Rs {formatAmount(subTotal)}</span>
                </p>

                <p className="w-full flex justify-between text-[14px] pt-2">
                    <span>Shipping Cost</span>
                    <span>
                        {shippingCost > 0 ? `Rs ${formatAmount(shippingCost)}` : <em className="italic">Free Shipping</em>}
                    </span>
                </p>

                <p className="w-full flex justify-between text-[14px] mt-[6px]">
                    <span>Tax</span>
                    <span>
                        {tax > 0 ? `Rs ${formatAmount(tax)}` : <em className="italic">No Tax</em>}
                    </span>
                </p>

                <p className="w-full flex justify-between text-[20px] text-[var(--tmp-txt)] font-semibold mt-[10px] border-t pt-2">
                    <span>Total</span>
                    <span>Rs {formatAmount(total)}</span>
                </p>

                {children}
            </div>
        </div>
    );
}

export default PaymentSummary;
