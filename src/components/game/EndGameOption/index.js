import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import styles from '../../../styles/Home.module.css'

import { emitLostGame } from '@/utils/socket';
import MessageFeedback from '../MessageFeedback';

const EndGameOption = () => {
    const [error, setError] = useState('')
    const { user, game } = useSelector((state) => ({ ...state }));

    const endGame = () => {
        if(game.turn !== user.username) {
            setError('No es tu turno. Puedes salir de la partida en tu turno.')
            return
        }
        emitLostGame(game.idGame, user.username)
    }

    return (
        <>
        {error && <MessageFeedback msg={error} setError={setError} />}
        <div
            onClick={endGame}
            className={styles.endGameOption}
        >
            X
        </div>
        </>
    )
}

export default EndGameOption
