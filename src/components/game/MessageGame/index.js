import React from 'react'
import styles from './MessageGame.module.css';

const MessageGame = ({ msg }) => {
    return (
        <div className={styles.messageGame}>
            { msg }
        </div>
    )
}

export default MessageGame
