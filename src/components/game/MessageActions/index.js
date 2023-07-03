import React from 'react'
import { useSelector } from 'react-redux';

import styles from './MessageActions.module.css'

const MessageActions = () => {
    const { action } = useSelector((state) => ({ ...state }));

    return (
        <div className={styles.messageAction}>
            {action.action.msg}
        </div>
    )
}

export default MessageActions
