import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Settings.module.css';

import logo from '../../assets/games/lol-logo@medium.png';
import GetUser from '../User';

const LeagueOfLegends = () => {

    const [userData] = GetUser();

    return (
        <div className={styles.account}>
            <div className={styles.accountHeader}>
                <img src={logo} alt="LeaugeOfLegends"/>
            </div>
            { 
                !userData?.connections?.leagueoflegends
                    ? <Link className={"button"} to={"/connect/lol"} >Verbinden</Link>
                    : <Link className={"button"} to={"/disconnect/lol"} >Trennen</Link>
            }
            { 
                !userData?.connections?.leagueoflegends
                    ? null
                    : <Link className={"button"} to={"/update/lol"} >Updaten</Link>
            }
        </div>
    )
}

export default LeagueOfLegends;