import React from 'react'
import { useDispatch } from 'react-redux'

import styles from './MessageLost.module.css'
import { useRouter } from 'next/router'
import { updateResult } from '@/store/resultReducer'

const MessageLost = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const goHome = () => {
        localStorage.removeItem('currentGame')
        dispatch(updateResult());
        router.push('/');
    }

    return (
        <div className={styles.lost}>
            <div className={styles.container}>
                <h1>PERDISTE EL JUEGO</h1>
                <button onClick={goHome}>Ir al Inicio</button>
            </div>
        </div>
    )
}

export default MessageLost
