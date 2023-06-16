import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

import './MessageWin.css'

const MessageWin = () => {
    const history = useNavigate()
    const dispatch = useDispatch()

    const goHome = () => {
        localStorage.removeItem('currentGame')
        dispatch({
            type: 'RESULT',
            payload: null
        });
        history(`/`)
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
