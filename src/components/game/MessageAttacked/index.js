import React from 'react'
import { useSelector } from 'react-redux';

import './MessageAttacked.css'

const MessageAttacked = () => {
    const { attacker } = useSelector((state) => ({ ...state }));
    
    return (
        <div className="attacked">
          {`${attacker.attackedBy} esta usando ${attacker.card}`}
        </div>
    )
}

export default MessageAttacked
