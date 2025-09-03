'use client';
import { getInvoices } from '@/APIs/Invoices/getInvoices';
import ImgToIcon from '@/components/Actions/ImgToIcon';
import Pagination from '@/components/Blocks/Pagination';
import ActionCard from '@/components/Cards/ActionCard';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import DynamicTable from '@/components/Tables/Table';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Invoices = () => {
  const { store_id } = useParams();
  const dispatch = useDispatch();
  const { currUser } = useSelector((state) => state?.currentUser);
  const { invoices, invoicesLoading, invoicePagination } = useSelector((state) => state?.invoices);
  const { token } = currUser;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchInvoices = async () => {
      await getInvoices(token, dispatch, store_id, { limit: 10, page: currentPage || 1 });
    };
    fetchInvoices();
  }, [dispatch, store_id, token, currentPage]);

  const columns = [
    { key: 'serial', label: 'Invoice no' },
    { key: '_id', label: 'Invoice ID', type: 'id' },
    { key: 'email', label: 'Email' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'imageUrl', label: 'Screen Shot', type: 'image' },
    { key: 'createdAt', label: 'Created At' },
  ];

  const tableData = invoices?.map((inv) => ({
    ...inv,
    createdAt: new Date(inv.createdAt).toLocaleDateString(),
    status: {
      text: inv.status,
      color: inv.status === 'paid' ? 'green' : inv.status === 'pending' ? '#A16213' : 'red',
      bgColor: inv.status === 'paid' ? '#DCFCE7' : inv.status === 'pending' ? '#eece3e7e' : '#FEE2E2',
    },
  }));

  return (
    <BackgroundFrame className="">
      <ActionCard className={'min-h-[calc(100vh-100px)]'} label={'Invoices'} icon={<ImgToIcon url={'https://img.icons8.com/fluency/48/terms-and-conditions.png'} />}>
        <div className="grow">
          <DynamicTable columns={columns} data={tableData} loading={invoicesLoading} notFoundText="No invoices found" />
        </div>
        <Pagination currentPage={currentPage} totalPages={invoicePagination?.totalPages || 1} onPageChange={(page) => setCurrentPage(page)} />
      </ActionCard>
    </BackgroundFrame>
  );
};
export default Invoices;
