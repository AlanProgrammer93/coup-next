import React from 'react'
import { useSelector } from 'react-redux';

//import styles from '../../../styles/main.module.css'
import styles from '../../../styles/Home.module.css'


const Main = () => {
    const { game } = useSelector((state) => ({ ...state }));

    return (
        <>
            <div className={styles.home__main}>

                <div className={styles.home__main_oponent1}>
                    {
                        game.game && game.game.gamer[0] && game.game.gamer[0].cards.map((card, index) => (
                            <div key={index} className={styles.home__main_oponent_card}></div>
                        ))
                    }

                </div>

                <div className={styles.home__main_table}>
                    <div className={styles.table_money}>
                        <div className={styles.money} style={{ margin: '-10px', position: 'absolute', border: '1px solid yellow' }}></div>
                        <div className={styles.money} style={{ border: '1px solid yellow' }}></div>
                        <div className={styles.money} style={{ margin: '-15px', border: '1px solid yellow' }}></div>
                        <div className={styles.money} style={{ marginTop: '-10px', position: 'absolute', border: '1px solid yellow' }}></div>
                    </div>
                    <div className={styles.table_mazo}></div>
                </div>

                <div className={styles.home__main_oponent2}>
                    {
                        game.game && game.game.gamer[1] && game.game.gamer[1].cards.map((card, index) => (
                            <div key={index} className={styles.home__main_oponent_card}></div>
                        ))
                    }
                </div>

            </div>
            {
                game.game && game.game.gamer[0] && (
                    <>
                        <div className={styles.Details_oponent1}>
                            <h2>{game.game.gamer[0].user}</h2>
                            <div className={styles.money_aponent1}>
                                {
                                    game.game.gamer[0].money.map(mon => (
                                        <div className={styles.money}></div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }


            {
                game.game && game.game.gamer[1] && (
                    <>
                        <div className={styles.Details_oponent2}>
                            <h2>{game.game.gamer[1].user}</h2>
                            <div className={styles.money_aponent2}>
                                {
                                    game.game.gamer[1].money.map(mon => (
                                        <div className={styles.money}></div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Main
