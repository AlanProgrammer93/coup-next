import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import styles from './MessageLostCard.module.css'
import { emitLostCardSelected } from '@/utils/socket';
import { updateVariables } from '@/store/variableReducer';

const MessageLostCard = () => {
    const { user, game } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const deleteCard = (card) => {
        emitLostCardSelected(game.game.idGame, user.user.username, card)
        dispatch(updateVariables());
    }

    return (
        <div className={styles.lostCard}>
            <p>Elimina una carta</p>
            <div className={styles.cards}>
                {
                    game.game && game.game.myUser.cards.map((card, index) => (
                        <button
                            key={index}
                            className={styles.card}
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
