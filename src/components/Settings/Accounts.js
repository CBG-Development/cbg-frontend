import React from 'react';
import styles from './Settings.module.css';
import LeagueOfLegends from './LeagueOfLegends'

const Settings = () => {
     return (
        <>
            <h2>Accounts</h2>
            <div className={"container " + styles.container}>
                <LeagueOfLegends />
            </div>
        </>
     )
};

export default Settings;