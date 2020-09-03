import React from 'react';
import styles from './TopNav.module.scss';
import PageTitle from './PageTitle';
import FilterMenu from './FilterMenu';
import PropTypes, { shape } from 'prop-types';

export default function TopNav({users, filterPosts, setOneSelected, setAllSelected}) {
    return (
        <div className={styles.container}>
            <FilterMenu users={users} filterPosts={filterPosts} setOneSelected={setOneSelected} setAllSelected={setAllSelected}/>
            <PageTitle classes={styles.title}/>
        </div>
    )
}

TopNav.propTypes = {
    users: PropTypes.arrayOf(shape({
        id: PropTypes.number,
        display: PropTypes.string,
        selected: PropTypes.bool
    })),
    filterPosts: PropTypes.func,
    setOneSelected: PropTypes.func,
    setAllSelected: PropTypes.func
}