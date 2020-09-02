import React from 'react';
import styles from './PageTitle.module.scss';
import clsx from 'clsx';

export default function PageTitle() {
    return (
        <h1 className={clsx(styles.title)}>Elena's React App</h1>
    )
}