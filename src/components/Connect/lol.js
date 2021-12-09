import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './connect.module.css';
import logo from '../../assets/games/lol-logo@medium.png';
import jwt from 'jsonwebtoken';

export const LoLConnect = () => {

    const [gamerTagState, setGamerTag] = useState(null);
    const [server, setServer] = useState("EUW1");
    const [gamerTagInputActive, setGamerTagInputActive] = useState(false);
    const token = localStorage.getItem('player');

    useEffect(() => {
        localStorage.setItem('player', token);
    }, [token])

    const submitConnect = async (event) => {

        if (gamerTagState !== null) {

            const token = localStorage.getItem('player');

            try {
                await fetch(`/api/v1/player/connect/lol`, { 
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            token: token,
                            summonerName: gamerTagState,
                            server: server
                        }
                    )
                }).then(async response => await response.json())
                  .then(response => {
                    if (!response.success) return;
                    localStorage.setItem('player', response.token);
                })
            } catch(error) {
                console.log(error);
            }
        }
    }

    const checkGamerTag = (event) => {
        event.preventDefault();
        event.target.value.length > 0 ? setGamerTag(event.target.value) : setGamerTag(null);
    }
    const onFocusGamerTag = (event) => {
        event.preventDefault();
        setGamerTagInputActive(true);
    }
    const onBlurGamerTag = (event) => {
        event.preventDefault();
        if (gamerTagState === null) setGamerTagInputActive(false);
    }
    const changeServer = (event) => {
        event.preventDefault();
        setServer(event.target.value);
    }

    return (
        <>
            { jwt.decode(token).connections?.leagueoflegends ? <Redirect to={"/settings"} /> : (
                <div className={styles.connectContainer}>
                    <div className={styles.connect}>
                        <img src={logo} alt="LeaugeOfLegends"/>
                        <h1>Verbinde deinen League of Legends Account</h1>
                        <h2>Gebe deinen Beschwörernamen ein und wähle deinen Server aus.</h2>
                        <input-container class={styles.inputContainer}>
                            <label className={gamerTagInputActive ? styles.inputActive : null}>Beschwörername</label>
                            <input onFocus={(event) => onFocusGamerTag(event)} onBlur={(event) => onBlurGamerTag(event)} onChange={(event) => checkGamerTag(event)} type="text"/>
                        </input-container>
                        <input-container>
                            <select defaultValue={"EUW1"} onChange={(event) => changeServer(event)}>
                                <option value={"BR1"} >BR</option>
                                <option value={"EUN1"} >EUN</option>
                                <option value={"EUW1"} >EUW</option>
                                <option value={"JP1"} >JP</option>
                                <option value={"KR1"} >KR</option>
                                <option value={"LA1"} >LA1</option>
                                <option value={"LA2"} >LA2</option>
                                <option value={"NA1"} >NA</option>
                                <option value={"OC1"} >OC</option>
                                <option value={"RU"} >RU</option>
                                <option value={"TR1"} >TR</option>
                            </select>
                        </input-container>
                        <button className={'button'} onClick={(event) => submitConnect(event)} >Verbinden</button>
                    </div>
                </div>
            )}
        </>
    )
}

export const LoLDisconnect = () => {

    const token = localStorage.getItem('player');
    const [result, setResult] = useState(false);

    const disconnect = async () => {
        const userData = jwt.decode(token);

        if (userData?.connections?.leagueoflegends) {
            try {
                await fetch(`/api/v1/player/disconnect/lol`, { 
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            token: token
                        }
                    )
                }).then(async response => await response.json())
                  .then(response => {
                        if (!response.success) return;
                        localStorage.setItem('player', response.token);
                        setResult(true);
                  })
    
            } catch (error) {
                console.log('API not reachable')
            }
        } else {
            setResult(true);
        }
    }

    useState(() => {
        disconnect();
    }, [])

    return (
        <>
            { 
                result ? <Redirect to={'/settings'}></Redirect> : null
            }
        </>
    );
}

export const LoLUpdate = () => {

    const token = localStorage.getItem('player');
    const [result, setResult] = useState(false);

    useState(() => {
        let isApiSubscribed = true;

        const update = async () => {
            const userData = jwt.decode(token);
    
            if (userData?.connections?.leagueoflegends) {
                try {
                    await fetch(`/api/v1/player/update/lol`, { 
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                token: token
                            }
                        )
                    }).then(async response => await response.json())
                      .then(response => {
                            if (!response.success) return;
                            localStorage.setItem('player', response.token);
                            setResult(true);
                      })
        
                } catch (error) {
                    console.log('API not reachable')
                }
            } else {
                setResult(true);
            }
        }

        if (isApiSubscribed) {
            update();
        }

        return () => {
            isApiSubscribed = false;
        }
    }, [])

    return (
        <>
            { 
                result ? <Redirect to={'/settings'}></Redirect> : null
            }
        </>
    );
}