'use client';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loader from '@/components/Loader/TemplateLoader';
import CartProductCard from '@/components/Cards/cartProductCard';
import CartTotalCard from '@/components/Cards/cartTotalCard';
import EmptyCart from '@/components/UI/emptyCart';
import { getBasePath } from '@/Utils/GetBasePath';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { createCheckoutSession } from '@/APIs/Checkout/Checkout';

const Cart = () => {
  const { cartData, initialLoading } = useSelector((state) => state?.cartData || []);
  const { store } = useSelector((state) => state?.store);
  const [loading, setLoading] = useState(true);
  const [checkoutTokenLoading, setCheckoutTokenLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  });

  if (initialLoading || loading) {
    return <Loader />;
  }

  const totalPrice = cartData?.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.price * cartItem.quantity;
  }, 0);


  const handleCreateCheckoutToken = async () => {
    try {
      const cartId = localStorage.getItem(`${store?._id}_cartId`);
      if (!cartId) {
        toast.error("Cart Id not found")
        return
      }
      setCheckoutTokenLoading(true)

      const responce = await createCheckoutSession(store?._id, { cartId: cartId });

      router.push(`${getBasePath()}/checkout/${responce.token}`);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
      setCheckoutTokenLoading(false)
    }
  };

  return (
    <div className="flex items-center flex-col w-full bg-[var(--tmp-pri)] min-h-screen">
      {/* <EasypaisaCheckout /> */}
      {/* <form method="POST" action="https://easypaystg.easypaisa.com.pk/easypay/Index.jsf">
        <input type="hidden" name="amount" value="10.0" />
        <input type="hidden" name="storeId" value="123456" />
        <input type="hidden" name="postBackURL" value="https://yourdomain.com/callback" />
        <input type="hidden" name="orderRefNum" value="ORDER123456" />
        <input type="hidden" name="merchantHashedReq" value="your_generated_hash" />
        <input type="hidden" name="paymentMethod" value="CC_PAYMENT_METHOD" />
        <button type="submit">Pay Now</button>
      </form>

      <form id="demoFormId" action="https://easypaystg.easypaisa.com.pk/easypay/Index.jsf" method="post">
        <input name="storeId" value="1234" type="hidden" />
        <input name="postBackURL" value="https://dev.xperiode.com/store/683e8be81cd7939b6e016b92/payment/responce" type="hidden" />
        <input name="orderRefNum" value="PS-180" type="hidden" />
        <input name="amount" value="10.0" type="hidden" />
        <input name="merchantHashedReq" value="nLJa5GQ4PRNEFlcNgw3aRY0/vsR8zULEBCidXx9ngyYRE/mXZcgsP0bqrsek6GOlbKoe3+zpFi6+6rtFB8rLQ4uBq9DkI0nHuvkZbYRze+wBEbGM3+BojPZvn6WeFSrdUf55tmTubpTQaUiaadmGjpHx1OACa+a2NfbRLKb1Chw" type="hidden" />
        <input name="paymentMethod" value="CC_PAYMENT_METHOD" type="hidden" />

        <input name="autoRedirect" value="1" type="hidden" />
        <input name="emailAddr" value="test@example.com" type="hidden" />
        <input name="mobileNum" value="03331234567" type="hidden" />
        <input name="expiryDate" value="20250701 235959" type="hidden" />

        <input type="submit" value="Proceed to Checkout" class="button" name="pay" />
      </form> */}
      <div className="max-w-[1000px] w-full pt-[50px]">
        {cartData?.length > 0 ? (
          <div>
            <div className="flex w-full justify-between items-center mb-3 px-[10px] text-[var(--tmp-txt)]">
              <h1 className="text-[30px] font-semibold">Your Cart</h1>
              <Link className="text-[15px] underline" href={`${getBasePath()}/products`}>
                Continue Shopping
              </Link>
            </div>
            <div className="flex justify-between text-[var(--tmp-txt)]">
              <h1 className="my-[20px] pl-[15px] text-[20px] w-1/2 text-[var(--tmp-ltxt)]">Product</h1>
              <h1 className="my-[20px] pl-[15px] text-[20px] w-1/4 text-[var(--tmp-ltxt)]">Quantity / Size</h1>
              <h1 className="my-[20px] pl-[15px] text-[20px] flex justify-center w-1/4 text-[var(--tmp-ltxt)]">Amount</h1>
            </div>
            <div>
              {cartData?.map((product, i) => (
                <CartProductCard key={i} product={product} />
              ))}
            </div>
            <div>
              <CartTotalCard totalPrice={totalPrice} checkoutTokenLoading={checkoutTokenLoading} handleCreateCheckoutToken={handleCreateCheckoutToken} />
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Cart;
