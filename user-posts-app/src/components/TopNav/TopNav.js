import React from 'react';
import styles from './TopNav.module.scss';
import PageTitle from './PageTitle';
import FilterMenu from './FilterMenu';

export default function TopNav() {
    return (
        <div className={styles.container}>
            <FilterMenu/>
            <PageTitle classes={styles.title}/>
        </div>
    )
}