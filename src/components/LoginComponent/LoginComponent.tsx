import React, { useState } from 'react';

import { Alert } from '@material-ui/lab';
import { 
    Typography, 
    FormControl, 
    InputLabel, 
    Input, 
    Button, 
    makeStyles 
} from '@material-ui/core';

import { authenticate } from '../../remote/auth-service';
import { User } from '../../models/user';
import { Redirect } from 'react-router-dom';

export interface ILoginProps {
    authUser: User | undefined;
    setAuthUser: (user: User) => void;
}

const useStyles = makeStyles({
    loginContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    loginForm: {
        width: "50%"
    }
});

function LoginComponent(props: ILoginProps) {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('Welcome, please login.');
    const [errorSeverity, setErrorSeverity] = useState('info' as "info" | "error" | "success" | "warning" | undefined);

    let updateUsername = (e: any) => {
        setUsername(e.target.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.target.value);
    }

    let login = async () => {
        if (username == '') {
            setErrorMessage('Please input a username');
            setErrorSeverity("error");
        } else if (password == '') {
            setErrorMessage('Please input a password');
            setErrorSeverity("error");
        } else {
            try {
                let authUser = await authenticate(username, password);
                props.setAuthUser(authUser.data);
            } catch (e) {
                setErrorMessage('Could not find a user with that username/password');
                setErrorSeverity("error");
            }
        }
    }

    return (
        props.authUser ?
        <Redirect to="/home" /> :
        <>
            <div className={classes.loginContainer}>
                <form className={classes.loginForm}>
                    <Typography align="center" variant="h4">Login into Project 1!</Typography>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input 
                            onChange={updateUsername} 
                            value={username} 
                            id="username" type="text" 
                            placeholder="Enter your username" />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input 
                            onChange={updatePassword}
                            value={password}
                            id="password" type="password"
                            placeholder="Enter your password"/>
                    </FormControl>
                    <br/><br/>
                    <Button id="submitButton" style={{backgroundColor: '#282c34'}} onClick={login} variant="contained" color="primary" size="medium">Login</Button>
                    <br/><br/>
                    {
                        errorMessage 
                            ? 
                        <Alert severity={errorSeverity}>{errorMessage}</Alert>
                            :
                        <></>
                    }
                </form>
            </div>
        </> 
    );
    
}

export default LoginComponent;
