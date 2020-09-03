//hamburger for mobile, button that says "Filter" for desktop
//dropdown menu (show expand animation)
//will also need components for individual checkbox filters etc
//work on this after connecting context and api and are actually showing post data

import React, {useState, useEffect} from 'react';
import styles from './FilterMenu.module.scss';
import clsx from 'clsx'; 
import PropTypes from 'prop-types';

let filters = [];

export default function FilterMenu({users, filterPosts, setOneSelected, setAllSelected}) {

    const [open, setOpen] = useState(false);

    const onButtonClick = () => {
        setOpen(!open);
    }

    function handleChange(e, id) {
        e.stopPropagation();
        console.log(id);
        console.log(filters);
        setOneSelected(id);
        if (filters.includes(id)) {
            let newFilters =[];
            for (let i = 0; i < filters.length; i++) {
                if (filters[i] !== id) {
                    newFilters.push(filters[i]);
                }
            }
            filters = newFilters;
        } else {
            filters.push(id);
        }
        console.log(filters);
        filterPosts(filters);
        
    }

    const handleSelectAll = () => {
        filters = users.map((user) => {
            return user.id;
        });
        filterPosts(filters);
        setAllSelected(true)
    }

    const handleDeselectAll = () => {
        filters = [];
        filterPosts(null);
        setAllSelected(false);
    }

        const checkboxes = users.map(user => {
            return (
                <li key={user.id} className={styles.li}>
                    <input id = {user.id} type="checkbox" name={user.id} checked={user.selected}
                    className={styles.checkbox} onClick={(e) => handleChange(e, user.id)}/>
                    <span>{user.display}</span>
                </li>
            )
        });

    if (users !== null && users.length) {
        return (
            <div>
                <button className={clsx(styles.button, open && styles.close)} onClick={onButtonClick}>{!open ? "Filter" : "Close"}</button>
                <div className={clsx(styles.modal, open && styles.open)}>
                    <h6>Filter by user</h6>
                    <ul>
                        <li className={styles.li}>
                            <button onClick={handleSelectAll}>Select All</button>
                        </li>
                        <li>
                            <button onClick={handleDeselectAll}>Deselect All</button>
                        </li>
                        {checkboxes}
                    </ul>
                </div>
    
            </div>
        )
    } else {
        return;
    }
}

FilterMenu.propTypes = {
    users: PropTypes.arrayOf(shape({
        id: PropTypes.number,
        display: PropTypes.string,
        selected: PropTypes.bool
    })),
    filterPosts: PropTypes.func,
    setOneSelected: PropTypes.func,
    setAllSelected: PropTypes.func
}