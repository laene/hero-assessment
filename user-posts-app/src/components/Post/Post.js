import React from 'react';
import styles from './Post.module.scss';
import clsx from 'clsx';

export default function Post({userDisplay, title, text, count}) {
    const even = count % 2 == 0;
    return (
        <li className={styles.post}>
            <div className={clsx(styles.bubble, even && styles.even)}>
                <h4 className={styles.user}>{userDisplay}</h4>
            </div>
            <div className={styles.textWrapper}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.text}>{text}</p>
            </div>            
        </li>
    )
        
};
