import React from 'react'
import { useSelector } from 'react-redux';

import styles from './MessageAttacked.module.css'

const MessageAttacked = () => {
    const { attacker } = useSelector((state) => ({ ...state }));
    console.log(attacker);
    return (
        <div className={styles.attacked}>
          {`${attacker.attacker.attackedBy} esta usando ${attacker.attacker.card}`}
        </div>
    )
}

export default MessageAttacked
