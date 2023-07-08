import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../../styles/Home.module.css'
import { emitReturnCardAmbassador } from '@/utils/socket';
import { updateDescart } from '@/store/descartCardReducer';
import { updateCardsGame } from '@/store/gameReducer';

const DescartOneCard = () => {
    const {descart, game } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const returnSelected = (card) => {
        var i = descart.descart.cards.indexOf( card );
        let newCards = Array.from(descart.descart.cards);
       
        newCards.splice( i, 1 )
        
        dispatch(updateCardsGame());
        
        const data = {
            idGame: game.game.idGame,
            cards: newCards,
            returnCard: card,
            user: descart.descart.user 
        }
        emitReturnCardAmbassador(data)
        dispatch(updateDescart());
        /* dispatch({
            type: 'DESCART_CARD',
            payload: null
        }); */
    }

    return (
        <div className={styles.descartOneCard}>
            <h2>Descartar Una</h2>
            <div className={styles.descartCard}>
            {
                descart.descart.cards.map((card, index) => (
                    <button key={index} onClick={() => returnSelected(card)}>{card}</button>
                ))
            }
            </div>
        </div>
    )
}

export default DescartOneCard
