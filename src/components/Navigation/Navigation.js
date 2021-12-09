import React from 'react'
import styles from './Navigation.module.css'
import logo from '../../assets/logo.png'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import GetUser from '../User';

const Navigation = () => {

    const [userData] = GetUser();

    const logout = (event) => {
        localStorage.removeItem('player');
    }

    return (
        <app-navigation>
            <Link to={'/'}>
                <img alt={"CBS-Gaming"} className={styles.logo} src={logo}/>
            </Link>
            <nav>
                <ul className={styles.login}>
                    <li>
                        { userData?.uid ? (
                            <div className={styles.userProfile}>
                                { 
                                    userData?.connections?.leagueoflegends 
                                        ? <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${userData.connections.leagueoflegends.profileIconId}.png`} alt="Profilbild" />
                                        : <img src="/api/v1/images/playerUnknown" alt="Profilbild" /> 
                                }
                                
                                <p>
                                    Eingeloggt als&nbsp;
                                    <br/>
                                    <span>{userData?.gamerTag}</span>
                                    { 
                                        userData?.connections?.leagueoflegends 
                                        ? (
                                            <>
                                                <br/>
                                                <span>{ userData.connections.leagueoflegends.name }</span>
                                            </>
                                        ) 
                                        : null 
                                    }
                                </p>
                            </div>
                        ) : <Link to={'/login'}>Einloggen</Link> }
                    </li>
                    <li>
                        <ul className={styles.navList}>
                            { userData?.uid ? (
                                <>
                                    <li><Link to={'/settings'}><FontAwesomeIcon icon={faCog} /></Link></li>
                                    <li><Link to={'/'} onClick={(event) => logout(event)}><FontAwesomeIcon icon={faSignOutAlt} /></Link></li>
                                </>
                            ) : null }
                        </ul>
                    </li>
                </ul>
                <ul className={styles.navList}>
                    <li><Link to={'/'}>Startseite</Link></li>
                </ul>
            </nav>
        </app-navigation>
    )
}

export default Navigation;
