import React from 'react'
import styles from "../../../styles/Home.module.css";
import { MdLogout } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { updateUser } from '@/store/userReducer';

export const Logout = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(updateUser(null));
        router.push('/login');
    }
    return (
        <div className={styles.logout} onClick={logout}>
            <MdLogout />
        </div>
    )
}
