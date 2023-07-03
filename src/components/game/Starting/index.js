import React from 'react'
import { useSelector } from 'react-redux';

import styles from './Starting.module.css'
import { emitStartGame } from '@/utils/socket';

const Starting = () => {
    const { user, game } = useSelector((state) => ({ ...state }));

    const startGame = () => {
        if(game.game.gamer.length >= 1) {
            emitStartGame(game.game.idGame)
        }
    }

    return (
        <div className={styles.starting} >
            {
                game.game.createdBy === user.user.username ? (
                    <>
                    <h3>Son {game.game.gamer.length + 1} Jugadores en espera</h3>
                    <button onClick={startGame}>Comenzar Ahora</button>
                    </>
                ) : (
                    <h3>Son {game.game.gamer.length + 1} Jugadores en espera</h3>
                )
            }
        </div>
    )
}

export default Starting
