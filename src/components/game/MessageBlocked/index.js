import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


import './MessageBlocked.module.css'
import { emitAllowBlock, emitLostCard, emitLostGame } from '@/utils/socket';

const MessageBlocked = () => {
    const { user, game, blocker } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const allow = () => {
        emitAllowBlock(game.idGame, user.username, blocker.blockedBy, blocker.card)
        dispatch({
            type: 'SET_BLOCKER',
            payload: null
        });
    }

    const distrust = () => {
        var userBlocker = game.gamer.filter(
            (u) => u.user === blocker.blockedBy
        );
        var cardExist = userBlocker[0].cards.filter(
            (c) => c === blocker.card
        );

        if (!cardExist[0]) {
            if (blocker.card === 'condesa') {
                emitLostGame(game.idGame, blocker.blockedBy)
                dispatch({
                    type: 'SET_BLOCKER',
                    payload: null
                });
                return
            }
            if (userBlocker[0].cards.length === 1) {
                emitLostGame(game.idGame, blocker.blockedBy)
                dispatch({
                    type: 'SET_BLOCKER',
                    payload: null
                });
                return
            }
            // user DEBE OBTENER OTRA CARTA
            emitLostCard(game.idGame, blocker.blockedBy)
            dispatch({
                type: 'SET_BLOCKER',
                payload: null
            });
        } else {
            if (game.myUser.cards.length === 1) {
                emitLostGame(game.idGame, user.username)
                dispatch({
                    type: 'SET_BLOCKER',
                    payload: null
                });
                return
            }
            dispatch({
                type: 'SET_BLOCKER',
                payload: null
            });
            dispatch({
                type: 'LOST_CARD',
                payload: {
                    variable: 'lostCard'
                }
            });
        }
    }

    return (
        <div className="blocked">
            <p>{`${blocker.blockedBy} esta bloqueando con ${blocker.card}`}</p>
            <div className="blocked_options">
                <button onClick={allow}>Permitir</button>
                <button onClick={distrust}>Desconfiar</button>
            </div>
        </div>
    )
}

export default MessageBlocked
