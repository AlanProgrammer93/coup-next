import React from 'react'
import './MessageGame.css';

const MessageGame = ({ msg }) => {
    return (
        <div className="messageGame">
            { msg }
        </div>
    )
}

export default MessageGame
