import React from 'react'
import { useSelector } from 'react-redux';

import './MessageActions.css'

const MessageActions = () => {
    const { action } = useSelector((state) => ({ ...state }));

    return (
        <div className="messageAction">
            {action.msg}
        </div>
    )
}

export default MessageActions
