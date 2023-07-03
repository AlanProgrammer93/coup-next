import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import data from '../../../cards.json'

import styles from './Controls.module.css'

import { emitAllow, emitBlockCard, emitLostCard, emitLostGame, emitTakeMoney, emitUseCard, emitUseCardGlobal } from '@/utils/socket';
import MessageFeedback from '../MessageFeedback';
import SelectOponent from '../SelectOponent';
import MessageActions from '../MessageActions';
import { updateAction } from '@/store/actionsReducer';
import { updateTurnGame } from '@/store/gameReducer';

const Controls = () => {
    const { user, game, attacker, action } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    console.log("user: ", user, "game: ", game, "attacker: ", attacker, "action: ", action);

    const [showMenu, setShowMenu] = useState(false)
    const [error, setError] = useState('')
    const [cardSelected, setCardSelected] = useState('')

    const takeMoney = () => {
        if (game.game.turn !== user.user.username || game.game.state === 'initial') {
            setError('No es tu turno')
            return
        }
        emitTakeMoney(game.idGame, user.username)
        setCardSelected('')
    }

    const playCard = (card) => {
        if (game.game.state === 'initial') {
            setError('No es tu turno')
            return
        }
        if (game.game.gamer.length === 1) {
            switch (card) {
                case 'capitan':
                    console.log("game donde hayu error: ", game.game.turn);
                    //game.game.turn = 'next'
                    dispatch(updateTurnGame(game.game.gamer[0].user));

                    emitUseCard('capitan', game.game.idGame, game.game.gamer[0].user, user.user.username)
                    
                    dispatch(updateAction({ msg: `Atacaste a ${game.game.gamer[0].user} con el Capitan` }));
                break;

                case 'asesina':
                    if (game.game.myUser.money.length > 2) {
                        game.game.turn = 'next'
                        emitUseCard('asesina', game.game.idGame, game.game.gamer[0].user, user.user.username)
                        dispatch({
                            type: 'SET_ACTION',
                            payload: {
                                msg: `Atacaste a ${game.game.gamer[0].user} con la Asesina`
                            }
                        });
                        return
                    }
                    setError('No tienes suficiente monedas.')
                break;

                case 'coup':
                    if (game.game.myUser.money.length > 6) {
                        game.game.turn = 'next'
                        if (game.game.gamer[0].cards.length === 1) {
                            emitLostGame(game.game.idGame, game.game.gamer[0].user)
                            return
                        }
                        emitUseCard('coup', game.game.idGame, game.game.gamer[0].user, user.username)
                        dispatch({
                            type: 'SET_ACTION',
                            payload: {
                                msg: `Atacaste a ${game.game.gamer[0].user} con COUP`
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
        } else {
            setCardSelected(card)
        }
    }

    const playCardGlobal = (card) => {
        if (game.game.state === 'initial') {
            setError('No es tu turno')
            return
        }
        switch (card) {
            case 'embajador':
                game.game.turn = 'next'
                emitUseCardGlobal('embajador', game.game.idGame, user.username)
                dispatch({
                    type: 'SET_ACTION',
                    payload: {
                        msg: 'Usaste el Embajador'
                    }
                });
            break;

            case 'duque':
                game.game.turn = 'next'
                emitUseCardGlobal('duque', game.game.idGame, user.username)
                dispatch({
                    type: 'SET_ACTION',
                    payload: {
                        msg: 'Usaste el Duque'
                    }
                });
            break;

            default:
            break;
        }
    }

    const blockCard = (card) => {
        emitBlockCard(card, game.game.idGame, attacker.attackedBy, user.user.username)
        dispatch({
            type: 'SET_ATTACKER',
            payload: null
        });
        dispatch({
            type: 'SET_ACTION',
            payload: {
                msg: `Bloqueaste a ${attacker.attackedBy} con ${card}`
            }
        });
    }

    const allow = () => {
        if (attacker.card === 'asesina') {
            dispatch({
                type: 'SET_ATTACKER',
                payload: null
            });

            if (game.game.myUser.cards.length === 1) {
                emitLostGame(game.game.idGame, user.user.username)
                return
            }

            dispatch({
                type: 'LOST_CARD',
                payload: {
                    variable: 'lostCard'
                }
            });
            return
        }

        emitAllow(game.game.idGame, user.user.username, attacker.attackedBy, attacker.card)
        dispatch({
            type: 'SET_ATTACKER',
            payload: null
        });
    }

    const distrust = () => {
        var userAttacker = game.game.gamer.filter(
            (u) => u.user === attacker.attackedBy
        );
        var cardExist = userAttacker[0].cards.filter(
            (c) => c === attacker.card
        );

        if (!cardExist[0]) {
            if (userAttacker[0].cards.length === 1) {
                emitLostGame(game.game.idGame, attacker.attackedBy)
                dispatch({
                    type: 'SET_ATTACKER',
                    payload: null
                });
                return
            }
            emitLostCard(game.game.idGame, attacker.attackedBy)
            dispatch({
                type: 'SET_ATTACKER',
                payload: null
            });
        } else {
            if (game.game.myUser.cards.length === 1) {
                emitLostGame(game.game.idGame, user.user.username)
                dispatch({
                    type: 'SET_ATTACKER',
                    payload: null
                });
                return
            }

            if (attacker.card === 'asesina') {
                emitLostGame(game.game.idGame, user.user.username)
                dispatch({
                    type: 'SET_ATTACKER',
                    payload: null
                });
                return
            }

            dispatch({
                type: 'SET_ATTACKER',
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
        <>
            {
                cardSelected &&
                <SelectOponent
                    gamers={game.game.gamer}
                    card={cardSelected}
                    setCardSelected={setCardSelected}
                    setError={setError}
                />
            }
            {error && <MessageFeedback msg={error} setError={setError} />}
            {action.action && <MessageActions />}
            <div className={styles.home__controls}>
                <div className={styles.home__controls_money}>
                    {
                        game.game && game.game.myUser.money.map(mon => (
                            <div className={styles.money}></div>
                        ))
                    }
                </div>
                <div className={styles.home__controls_cards}>
                    {
                        game.game && game.game.myUser.cards.map((card, index) => (
                            <div className={styles.home__controls_card} key={index}>
                                <img src={`/cards/${card}.png`} alt="" />
                                <div className={styles.detail_card}>
                                    <p>{card}</p>
                                    <span>{data[card]}</span>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className={styles.home__controls_bottons}>
                    <button onClick={takeMoney}>Tomar Moneda</button>
                    <button onClick={() => setShowMenu(!showMenu)}>Jugar</button>
                </div>
            </div>
            {
                showMenu
                    ? game.game.turn === user.user.username ? (
                        <div className={styles.optionGame}>
                            <button onClick={() => playCard('capitan')}>Tengo el Capitan</button>
                            <button onClick={() => playCardGlobal('embajador')}>Tengo el Embajador</button>
                            <button onClick={() => playCardGlobal('duque')}>Tengo el Duque</button>
                            <button onClick={() => playCard('asesina')}>Tengo la Asesina</button>
                            <button onClick={() => playCard('coup')}>COUP</button>
                        </div>
                    ) : (
                        <div className={styles.optionGame}>
                            {
                                attacker.attacker
                                    ? attacker.attacker.card === 'capitan'
                                        ? (
                                            <>
                                                <button onClick={() => blockCard('capitan')}>Tengo el Capitan</button>
                                                <button onClick={() => blockCard('embajador')}>Tengo el Embajador</button>
                                                <button onClick={distrust}>Desconfio</button>
                                                <button onClick={allow}>Permitir</button>
                                            </>
                                        )
                                        : attacker.attacker.card === 'asesina'
                                            ? (
                                                <>
                                                    <button onClick={() => blockCard('condesa')}>Tengo la Condesa</button>
                                                    <button onClick={distrust}>Desconfio</button>
                                                    <button onClick={allow}>Permitir</button>
                                                </>
                                            )
                                            : attacker.attacker.card === 'duque'
                                                ? (
                                                    <>
                                                        <button onClick={distrust}>Desconfio</button>
                                                        <button onClick={allow}>Permitir</button>
                                                    </>
                                                )
                                                : attacker.attacker.card === 'embajador' && (
                                                    <>
                                                        <button >Tengo el Duque</button>
                                                        <button onClick={distrust}>Desconfio</button>
                                                        <button onClick={allow}>Permitir</button>
                                                    </>
                                                )

                                    : (
                                        <>
                                            <button>Tengo el Capitan</button>
                                            <button>Tengo el Embajador</button>
                                            <button>Tengo la Condesa</button>
                                            <button>Tengo el Duque</button>
                                            <button>Desconfio</button>
                                        </>
                                    )
                            }
                        </div>
                    )
                    : ''
            }
        </>
    )
}

export default Controls
