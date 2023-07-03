import React, { useEffect } from 'react'
import './MessageFeedback.module.css'

const MessageFeedback = ({msg, setError}) => {
    useEffect(() => {
        setTimeout(() => 
            setError('')
        , 3000)
        // eslint-disable-next-line
    }, []) 

    return (
        <div className="message">
            {msg}
        </div>
    )
}

export default MessageFeedback
