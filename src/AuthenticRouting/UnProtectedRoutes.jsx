'use client';
import Loader from '@/components/Loader/loader';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function UnProtectedRoute({ children }) {
  const router = useRouter();
  const { currUser, loading } = useSelector((state) => state.currentUser);
  if (loading) {
    return <Loader />;
  }
  if (!currUser || currUser?.verified === false) {
    return children;
  }

  return currUser?.lastOpenedStore ? router.push(`/admin/${currUser.lastOpenedStore}`) : router.push('/admin/stores');
}
