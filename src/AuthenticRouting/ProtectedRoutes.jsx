import Loader from '@/components/loader';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoute = (WrappedComponent) => {
    return () => {
        const user = useSelector((state) => state.currentuser);
        const router = useRouter();

        useEffect(() => {
            if (!user) {
                router.push('/authentication/login');
            }
        }, [user]);

        if (!user) {
            return <Loader />;
        }

        return <WrappedComponent />;
    };
};

export default ProtectedRoute;
