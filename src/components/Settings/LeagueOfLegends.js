import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Settings.module.css';
import jwt from 'jsonwebtoken';

import logo from '../../assets/games/lol-logo@medium.png';

const LeagueOfLegends = () => {

    const [userData, setUserData] = useState({connections: {leagueoflegends: undefined}});
    useEffect(() => {
        const decode = jwt.decode(localStorage.getItem('player'));
        if (decode !== null) setUserData(decode);
    }, [])

    return (
        <div class={styles.account}>
            <div class={styles.accountHeader}>
                <img src={logo} alt="LeaugeOfLegends"/>
            </div>
            { 
                !userData.connections?.leagueoflegends
                    ? <Link className={"button"} to={"/connect/lol"} >Verbinden</Link>
                    : <Link className={"button"} to={"/disconnect/lol"} >Trennen</Link>
            }
            
        </div>
    )
}

export default LeagueOfLegends;