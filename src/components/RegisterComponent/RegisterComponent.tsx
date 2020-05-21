import React, { useState } from 'react';
import { 
    Typography, 
    FormControl, 
    InputLabel, 
    Input, 
    Button, 
    makeStyles 
} from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import { register } from '../../serviceWorker';
import { authenticate } from '../../remote/auth-service';
import { createNewUser } from '../../remote/create-new-user';
import { User } from '../../models/user';

export interface IRegisterProps {
    authUser: User | undefined;
    setAuthUser: (user: User) => void;
}

const useStyles = makeStyles({
    registerContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    registerForm: {
        width: "50%"
    }
});

const RegisterComponent = (props: IRegisterProps) => {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('Please Input A User');
    const [errorSeverity, setErrorSeverity] = useState('info' as "info" | "error" | "success" | "warning" | undefined);

    let updateUsername = (e: any) => {
        setUsername(e.target.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.target.value);
    }

    let updateConfirmedPassword = (e: any) => {
        setConfirmedPassword(e.target.value);
    }

    let updateFirstName = (e: any) => {
        setFirstName(e.target.value);
    }

    let updateLastName = (e: any) => {
        setLastName(e.target.value);
    }

    let updateEmail = (e: any) => {
        setEmail(e.target.value);
    }

    let isAdmin = () => {
        if (props.authUser?.role == "Admin") {
            return true;
        }
        return false;
    }

    let register = async () => {
        let response = await createNewUser(username, password, firstName, lastName, email);
        console.log(response)
        console.log(response.status);
        if (response.status == 201) {
            setErrorMessage(`Successfully Added ${response.data.username}`)
            setErrorSeverity("success");
        } else if (response.status == 409) {
            setErrorMessage("Username or password already taken.");
            setErrorSeverity("error");
            //username or password already taken. (should maybe specify?)
        } else if (response.status == 400){
            setErrorMessage("Invalid input. Ensure all fields are answered.");
            setErrorSeverity("error");
        } else {
            setErrorMessage("Oops, something went wrong.");
            setErrorSeverity("error");
            //General failure
        }
        //props.setAuthUser();
        //console.log("status:" + response.status + " id:" + response.data.id);
    }

    return (
        isAdmin() ?
        <>
            <div className={classes.registerContainer}>
                <form className={classes.registerForm}>
                    <Typography align="center" variant="h4">Register A User</Typography>

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
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input 
                            onChange={updateEmail}
                            value={email}
                            id="email" type="text"
                            placeholder="Enter your email"/>
                    </FormControl>
                    <br/><br/>
                    <Button id="submitButton" style={{backgroundColor: '#282c34'}} onClick={register} variant="contained" color="primary" size="medium">Register</Button>
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
        :
        <Redirect to="/home" /> 
    );
    
}

export default RegisterComponent;
