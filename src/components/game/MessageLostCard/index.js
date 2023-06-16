import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import './MessageLostCard.css'
import { emitLostCardSelected } from '@/utils/socket';

const MessageLostCard = () => {
    const { user, game } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const deleteCard = (card) => {
        emitLostCardSelected(game.idGame, user.username, card)
        dispatch({
            type: 'LOST_CARD',
            payload: null
        });
    }

    return (
        <div className="lostCard">
            <p>Elimina una carta</p>
            <div className="cards">
                {
                    game && game.myUser.cards.map((card, index) => (
                        <button
                            key={index}
                            className="card"
                            onClick={() => deleteCard(card)}
                        >
                            {card}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default MessageLostCard
