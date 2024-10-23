import Loader from '@/components/loader';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UnProtectedRoute = (WrappedComponent) => {
    return () => {
        const user = useSelector((state) => state.currentuser);
        const router = useRouter();
        console.log(user , "🧞‍♂️🧞‍♂️");
        

        useEffect(() => {
            if (user) {
                router.push('/');
            }
        }, [user]);
        if (!user) {
            return <WrappedComponent/>;
        }
        return <Loader />;
    };
};

export default UnProtectedRoute;
