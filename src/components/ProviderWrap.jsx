'use client';
import { setCurrentUser } from '@/Redux/Authentication/AuthSlice';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const ProviderWrap = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.stringify(localStorage.getItem('currentUser'))
        dispatch(setCurrentUser(user));
    }, [dispatch]);
    return children;
}

export default ProviderWrap