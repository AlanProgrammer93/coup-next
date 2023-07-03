import React from 'react'
import { useDispatch } from 'react-redux'

import './MessageWin.module.css'
import { useRouter } from 'next/router'

const MessageWin = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const goHome = () => {
        localStorage.removeItem('currentGame')
        dispatch({
            type: 'RESULT',
            payload: null
        });
        router.push('/');
    }

    return (
        <div className="win">
            <div className="container">
                <h1>GANASTE EL JUEGO!</h1>
                <button onClick={goHome}>Ir al Inicio</button>
            </div>
        </div>
    )
}

export default MessageWin
