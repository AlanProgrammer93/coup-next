import React from 'react'
import { useDispatch } from 'react-redux'

import styles from './MessageWin.module.css'
import { useRouter } from 'next/router'
import { updateResult } from '@/store/resultReducer'

const MessageWin = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const goHome = () => {
        localStorage.removeItem('currentGame')
        dispatch(updateResult());
        
        router.push('/');
    }

    return (
        <div className={styles.win}>
            <div className={styles.container}>
                <h1>GANASTE EL JUEGO!</h1>
                <button onClick={goHome}>Ir al Inicio</button>
            </div>
        </div>
    )
}

export default MessageWin
