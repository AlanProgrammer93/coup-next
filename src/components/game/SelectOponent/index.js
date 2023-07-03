import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import './SelectOponent.module.css'
import { emitLostGame, emitUseCard } from '@/utils/socket';

const SelectOponent = ({ gamers, card, setCardSelected, setError }) => {
    const { user, game } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const playCard = (userSelected) => {
        setCardSelected('')
        switch (card) {
            case 'capitan':
                emitUseCard('capitan', game.idGame, userSelected, user.username)
                dispatch({
                    type: 'SET_ACTION',
                    payload: {
                        msg: `Atacaste a ${userSelected} con el Capitan`
                    }
                });
                break;

            case 'asesina':
                if (game.myUser.money.length > 2) {
                    emitUseCard('asesina', game.idGame, userSelected, user.username)
                    dispatch({
                        type: 'SET_ACTION',
                        payload: {
                            msg: `Atacaste a ${userSelected} con la Asesina`
                        }
                    });
                    return
                }
                setError('No tienes suficiente monedas.')
                break;

            case 'coup':
                if (game.myUser.money.length > 6) {
                    var attackedUser = game.gamer.filter(
                        (g) => g.user === userSelected
                    );
                    if (attackedUser[0].cards.length === 1) {
                        emitLostGame(game.idGame, userSelected)
                        return
                    }
                    emitUseCard('coup', game.idGame, userSelected, user.username)
                    dispatch({
                        type: 'SET_ACTION',
                        payload: {
                            msg: `Atacaste a ${userSelected} con COUP`
                        }
                    });
                    return
                } else {
                    setError('No tienes suficiente monedas.')
                }
                break;

            default:
                break;
        }
    }

    return (
        <div className="selectOponent">
            <h1>Selecciona tu oponente</h1>
            <div style={{ display: 'flex' }}>
                {
                    gamers.map(g => (
                        <button onClick={() => playCard(g.user)}>
                            {g.user}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default SelectOponent
