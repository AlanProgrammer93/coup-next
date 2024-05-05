import React from 'react'
import styles from './styles.module.css'

const Loading = ({ text = "Espere..." }) => {
    return (
        <div className='blur'>
            <div className={styles.loadingContainer}>
                <div className={styles.loadingBackground}>
                    <span className={styles.loader}></span>
                </div>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Loading