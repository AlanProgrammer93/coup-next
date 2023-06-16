import React from 'react'
import { useSelector } from 'react-redux';

import './Starting.css'
import { emitStartGame } from '@/utils/socket';

const Starting = () => {
    const { user, game } = useSelector((state) => ({ ...state }));

    const startGame = () => {
        if(game.gamer.length >= 1) {
            emitStartGame(game.idGame)
        }
    }

    return (
        <div className="starting">
            {
                game.createdBy === user.username ? (
                    <>
                    <h3>Son {game.gamer.length + 1} Jugadores en espera</h3>
                    <button onClick={startGame}>Comenzar Ahora</button>
                    </>
                ) : (
                    <h3>Son {game.gamer.length + 1} Jugadores en espera</h3>
                )
            }
        </div>
    )
}

export default Starting
