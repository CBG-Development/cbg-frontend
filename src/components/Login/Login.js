import React, {useState, useEffect} from 'react';
import styles from './Login.module.css';
import logo from '../../assets/logo.png';
import sha256 from 'sha256';
import { Redirect } from 'react-router';

const Login = () => {

    const [gamerTagState, setGamerTag] = useState(null);
    const [passwordState, setPassword] = useState(null);
    const [gamerTagInputActive, setGamerTagInputActive] = useState(false);
    const [passwordInputActive, setPasswordInputActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [userData, setUserData] = useState(null);

    const checkGamerTag = (event) => {
        event.preventDefault();
        event.target.value.length > 0 ? setGamerTag(event.target.value) : setGamerTag(null);
    }

    const checkPassword = (event) => {
        event.preventDefault();
        event.target.value.length > 0 ? setPassword(sha256(event.target.value)) : setPassword(null);
    }

    const submitLogin = async (event) => {
        let errorMessage = null;
        const gamerTag = gamerTagState !== null ? gamerTagState : errorMessage = "No GamerTag found";
        const password = passwordState !== null ? passwordState : errorMessage += ", No Password found";

        if (errorMessage === null) {
            try {
                await fetch(`/api/v1/player/login`, { 
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({gamerTag, password})
                }).then(response => response.json())
                  .then(response => !response.success ? setErrorMessage(response.message) : setUserData(response.token));
            } catch(error) {
                console.log(error);
            }
        }
    }

    const onFocusGamerTag = (event) => {
        event.preventDefault();
        setGamerTagInputActive(true);
    }
    const onBlurGamerTag = (event) => {
        event.preventDefault();
        if (gamerTagState === null) setGamerTagInputActive(false);
    }

    const onFocusPassword = (event) => {
        event.preventDefault();
        setPasswordInputActive(true);
    }
    const onBlurPassword = (event) => {
        event.preventDefault();
        if (passwordState === null) setPasswordInputActive(false);
    }

    

    useEffect(() => {
        if (userData !== null) {
            localStorage.setItem('player', userData);
            setErrorMessage(null);
        }
    }, [userData]);

    return (
        <app-login>

            {userData === null ?
                (
                <>
                    <app-login-menu>
                        <img alt={"CBS-Gaming"} className={styles.logo} src={logo}/>
                        <p>Bitte melde dich mit deinem GamerTag an.</p>
                        <span className={styles.errorMessage}>{errorMessage !== null ? errorMessage : null}</span>
                        <input-container>
                            <label className={gamerTagInputActive ? "inputActive" : null}>GamerTag *</label>
                            <input type="text" onFocus={(event) => onFocusGamerTag(event)} onBlur={(event) => onBlurGamerTag(event)} onChange={(event) => checkGamerTag(event)}></input>
                        </input-container>
                        <input-container>
                            <label className={passwordInputActive ? "inputActive" : null}>Password *</label>
                            <input type="password" onFocus={(event) => onFocusPassword(event)} onBlur={(event) => onBlurPassword(event)} onChange={(event) => checkPassword(event)}></input>
                        </input-container>
                        <input-button onClick={(event) => submitLogin(event)}>Einloggen</input-button>
                    </app-login-menu>

                    <app-divider><span>oder</span></app-divider>
                    
                    <app-register-menu>
                        <input-button>Registrieren</input-button>
                    </app-register-menu>
                </>
                ) : (
                    <Redirect to='/' />
                )
            }
        </app-login>
    )
}

export default Login;