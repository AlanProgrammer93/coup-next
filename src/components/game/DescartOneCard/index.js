import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../../styles/Home.module.css'
import { emitReturnCardAmbassador } from '@/utils/socket';

const DescartOneCard = () => {
    const {descart, game } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const returnSelected = (card) => {
        var i = descart.cards.indexOf( card );
        descart.cards.splice( i, 1 );

        const data = {
            idGame: game.idGame,
            cards: descart.cards,
            returnCard: card,
            user: descart.user 
        }
        emitReturnCardAmbassador(data)
        dispatch({
            type: 'DESCART_CARD',
            payload: null
        });
    }

    return (
        <div className={styles.descartOneCard}>
            <h2>Descartar Una</h2>
            <div className={styles.descartCard}>
            {
                descart.cards.map((card, index) => (
                    <button key={index} onClick={() => returnSelected(card)}>{card}</button>
                ))
            }
            </div>
        </div>
    )
}

export default DescartOneCard
