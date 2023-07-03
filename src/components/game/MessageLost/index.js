import React from 'react'
import { useDispatch } from 'react-redux'

import './MessageLost.module.css'
import { useRouter } from 'next/router'

const MessageLost = () => {
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
        <div className="lost">
            <div className="container">
                <h1>PERDISTE EL JUEGO</h1>
                <button onClick={goHome}>Ir al Inicio</button>
            </div>
        </div>
    )
}

export default MessageLost
