'use client';
import Loader from '@/components/Loader/loader';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function UnProtectedRoute({ children }) {
  const router = useRouter();
  const { currUser, loading } = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (!loading && currUser && currUser?.verified !== false) {
      const redirectUrl = currUser?.lastOpenedStore ? `/admin/${currUser.lastOpenedStore}` : '/admin/stores';
      router.push(redirectUrl);
    }
  }, [currUser, loading, router]);

  if (loading) return <Loader />;

  if (!currUser || currUser?.verified === false) {
    return children; // ✅ yahan page ka content render hoga
  }

  return <Loader />;
}
