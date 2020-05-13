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

import { authenticate } from '../remote/auth-service';
import { createNewUser } from '../remote/create-new-user';
import { User } from '../models/user';
import { Redirect } from 'react-router-dom';
import { register } from '../serviceWorker';

interface IRegisterProps {
    authUser: User;
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

function RegisterComponent(props: IRegisterProps) {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('Test message');

    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let updateConfirmedPassword = (e: any) => {
        setConfirmedPassword(e.currentTarget.value);
    }

    let updateFirstName = (e: any) => {
        setFirstName(e.currentTarget.value);
    }

    let updateLastName = (e: any) => {
        setLastName(e.currentTarget.value);
    }

    let updateEmail = (e: any) => {
        setEmail(e.currentTarget.value);
    }


    let register = async () => {
        let response = await createNewUser(username, password, firstName, lastName, email);
        console.log(response)
        console.log(response.status);
        if (response == 201) {
            let authUser = await authenticate(username, password);
            props.setAuthUser(authUser);
        } else if (response == 409) {
            setErrorMessage("Username or password already taken.");
            //username or password already taken. (should maybe specify?)
        } else if (response == 400){
            setErrorMessage("Invalid input. Ensure all fields are answered.");
        } else {
            setErrorMessage("Oops, something went wrong.");
            //General failure
        }
        //props.setAuthUser();
        //console.log("status:" + response.status + " id:" + response.data.id);
    }

    return (
        props.authUser ?
        <Redirect to="/home" /> :
        <>
            <div className={classes.loginContainer}>
                <form className={classes.loginForm}>
                    <Typography align="center" variant="h4">Register For Project 1!</Typography>

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

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="confirm password">Confirm Password</InputLabel>
                        <Input 
                            onChange={updateConfirmedPassword}
                            value={confirmedPassword}
                            id="confirmedPassword" type="password"
                            placeholder="Re-Enter your password"/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <Input 
                            onChange={updateFirstName}
                            value={firstName}
                            id="firstName" type="text"
                            placeholder="Enter your first name"/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <Input 
                            onChange={updateLastName}
                            value={lastName}
                            id="lastName" type="text"
                            placeholder="Enter your last name"/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="email">email</InputLabel>
                        <Input 
                            onChange={updateEmail}
                            value={email}
                            id="email" type="text"
                            placeholder="Enter your email"/>
                    </FormControl>
                    <br/><br/>
                    <Button onClick={register} variant="contained" color="primary" size="medium">Register</Button>
                    <br/><br/>
                    {
                        errorMessage 
                            ? 
                        <Alert severity="error">{errorMessage}</Alert>
                            :
                        <></>
                    }
                </form>
            </div>
        </> 
    );
    
}

export default RegisterComponent;
