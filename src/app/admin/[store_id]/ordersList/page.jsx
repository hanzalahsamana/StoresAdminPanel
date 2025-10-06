'use client';

import { fetchOrderData } from '@/APIs/Order/getOrderData';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import Button from '@/components/Actions/Button';
import ImgToIcon from '@/components/Actions/ImgToIcon';
import ActionCard from '@/components/Cards/ActionCard';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import OrderListTable from '@/components/Tables/OrderListTable';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Order = ({ params }) => {
  const { currUser } = useSelector((state) => state.currentUser);
  const { store_id } = params;

  // const handleGetOrders = async () => {
  //   try {
  //     dispatch(setProductLoading(true));
  //     const products = await getProducts(store?._id)
  //     dispatch(setProductData(products));
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     dispatch(setProductLoading(false));
  //   }
  // }

  const getOrders = async (orderId = '') => {
    await fetchOrderData(currUser?.token, store_id, orderId);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <BackgroundFrame>
      <ActionCard
        label={'Orders'}
        actionPosition="top"
        icon={<ImgToIcon url={'https://img.icons8.com/color/48/cardboard-box.png'} />}
        subText={'Manage your orders here. You can update order status as needed.'}
        // actions={<>
        //   <Button
        //     label="Add Product"
        //     size="small"
        //     action={() => { router.push('./products/add'); }}
        //     className="w-max !py-2"
        //   />
        // </>}
      >
        <div className="w-full">
          <OrderListTable />
        </div>
      </ActionCard>
    </BackgroundFrame>
  );
};

export default Order;
