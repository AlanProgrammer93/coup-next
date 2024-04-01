import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './MessageCoup.module.css'
import { emitLostCardSelected } from '@/utils/socket';
import { updateCoup } from '@/store/coupReducer';

const MessageCoup = () => {
    const { user, game, coup } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const deleteCard = (card) => {
        emitLostCardSelected(game.game.idGame, user.user.username, card)
        dispatch(updateCoup());
    }

    return (
        <div className={styles.coup}>
            <h3>{`${coup.coup.attackedBy} esta usando COUP`}</h3>
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

export default MessageCoup
