import React from 'react'
import { useSelector } from 'react-redux';

import './Main.css'

const Main = () => {
    const { game } = useSelector((state) => ({ ...state }));

    return (
        <>
            <div className="home__main">

                <div className="home__main-oponent1">
                    {
                        game && game.gamer[0] && game.gamer[0].cards.map((card, index) => (
                            <div key={index} className="home__main-oponent-card"></div>
                        ))
                    }

                </div>

                <div className="home__main-table">
                    <div className="table-money">
                        <div className="money" style={{ margin: '-10px', position: 'absolute', border: '1px solid yellow' }}></div>
                        <div className="money" style={{ border: '1px solid yellow' }}></div>
                        <div className="money" style={{ margin: '-15px', border: '1px solid yellow' }}></div>
                        <div className="money" style={{ marginTop: '-10px', position: 'absolute', border: '1px solid yellow' }}></div>
                    </div>
                    <div className="table-mazo"></div>
                </div>

                <div className="home__main-oponent2">
                    {
                        game && game.gamer[1] && game.gamer[1].cards.map((card, index) => (
                            <div key={index} className="home__main-oponent-card"></div>
                        ))
                    }
                </div>

            </div>
            {
                game && game.gamer[0] && (
                    <>
                        <div className="Details-oponent1">
                            <h2>{game.gamer[0].user}</h2>
                            <div className="money-aponent1">
                                {
                                    game.gamer[0].money.map(mon => (
                                        <div className="money"></div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }


            {
                game && game.gamer[1] && (
                    <>
                        <div className="Details-oponent2">
                            <h2>{game.gamer[1].user}</h2>
                            <div className="money-aponent2">
                                {
                                    game.gamer[1].money.map(mon => (
                                        <div className="money"></div>
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
