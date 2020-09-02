//hamburger for mobile, button that says "Filter" for desktop
//dropdown menu (show expand animation)
//will also need components for individual checkbox filters etc
//work on this after connecting context and api and are actually showing post data

import React, {useState} from 'react';
import styles from './FilterMenu.module.scss';
import clsx from 'clsx'; 

export default function FilterMenu() {

    const [open, setOpen] = useState(false);
    const onButtonClick = () => {
        setOpen(true);
        console.log("ding!");
    }

    return (
        <div>
            <btn className={styles.button} onclick={onButtonClick}>Filter</btn>
        </div>
    )
}