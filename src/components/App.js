import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import Navigation from "./Navigation/Navigation";
import Login from "./Login/Login";
import Settings from "./Settings/Settings";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import { LoLConnect, LoLDisconnect, LoLUpdate } from './Connect/lol';
import { CircularProgress } from "react-cssfx-loading";
import GetUser from './User';

export default function App() {

    const [userData] = GetUser();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [userData])

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

                                { userData?.uid ? (
                                    <main>
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
                                                <Route path={'/update/lol'}>
                                                    <LoLUpdate />
                                                </Route>
                                        </Switch>
                                    </main>
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
