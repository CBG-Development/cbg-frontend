import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import Navigation from "./Navigation/Navigation";
import Login from "./Login/Login";
import Settings from "./Settings/Settings";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import { LoLConnect, LoLDisconnect } from './Connect/lol';
import jwt from 'jsonwebtoken';
import { CircularProgress } from "react-cssfx-loading";

export default function App() {

    const [userData, setUserData] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('player') !== undefined) setUserData(jwt.decode(localStorage.getItem('player')))
        setLoaded(true);
    }, [])

    return (
        <>
        {
            loaded 
            ? (
                <BrowserRouter>
                    <Switch>
                        <Route path={'/login'}>
                            <Login />
                        </Route>
                        <Route path={'/'}>
                            <>
                                <Navigation />

                                { userData ? (
                                    <content>
                                        <Switch>
                                                <Route exact path={'/settings'}>
                                                    <Settings />
                                                </Route>
                                                <Route exact path={'/connect/lol'}>
                                                    <LoLConnect />
                                                </Route>
                                                <Route exact path={'/disconnect/lol'}>
                                                    <LoLDisconnect />
                                                </Route>
                                        </Switch>
                                    </content>
                                ) : null }
                            </>
                        </Route>
                        <Route exact path={'/*'}>
                            <Redirect to={'/'}/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            )
            : (
                <div className={styles.loading} >
                    <CircularProgress />
                </div>
            )
        }
        </>
    )
}
