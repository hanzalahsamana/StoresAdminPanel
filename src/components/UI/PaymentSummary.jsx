import { formatAmount } from '@/Utils/CheckoutHelpers';
import { IoPricetags } from 'react-icons/io5';

function DiscountRow({ discount }) {
    if (!discount) return null;

    return (
        <div className="flex justify-between">
            <div className="flex w-max text-[11px] items-center gap-2 bg-[var(--tmp-acc)] px-[6px] py-[2px] rounded-md">
                <IoPricetags />
                <p>{discount.name || "Discount"}</p>
            </div>
            <div>
                <span className="text-[12px]">
                    {discount.amountType === 'percent' ? (
                        <>-{discount.amount}% = Rs -{formatAmount(discount?.discountAmount)}</>
                    ) : (
                        <>Rs -{formatAmount(discount.amount)}</>
                    )}
                </span>
            </div>
        </div>
    );
}

function PaymentSummary({ children, className, totalProductCost, globalDiscount, couponDiscount, subTotal, shipping, tax, total }) {


    return (
        <div className={`flex w-full gap-2 text-[var(--tmp-ltxt)] bg-[var(--tmp-pri)] rounded-md border py-4 px-4 ${className}`}>
            <div className="flex-col w-full">
                <p className="w-full flex justify-between text-[12px] font-semibold border-b pb-2">
                    <span>Total Product Cost</span>
                    <span>Rs {formatAmount(totalProductCost)}</span>
                </p>

                <div className="flex justify-between items-center gap-3 py-2">
                    <p className="text-[12px]">Discount</p>
                    {globalDiscount || couponDiscount ? (
                        <div className="flex flex-col flex-1 gap-3">
                            <DiscountRow discount={globalDiscount} />
                            <DiscountRow discount={couponDiscount} />
                        </div>
                    ) : (
                        <span className="text-[12px] text-gray-500 italic">No discounts applied</span>
                    )}
                </div>

                <p className="w-full flex justify-between text-[12px] border-t pt-2">
                    <span>Sub Total</span>
                    <span>Rs {formatAmount(subTotal)}</span>
                </p>

                <p className="w-full flex justify-between text-[12px] pt-2">
                    <span>Shipping Cost</span>
                    <span>
                        {shipping > 0 ? `Rs ${formatAmount(shipping)}` : <em className="italic">Free Shipping</em>}
                    </span>
                </p>

                <p className="w-full flex justify-between text-[12px] mt-[6px]">
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
