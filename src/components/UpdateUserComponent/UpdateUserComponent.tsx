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
import { updateUser } from '../../remote/update-user';

export interface IUserProps {
    authUser: User;
    setAuthUser: (user: User) => void;
}

const useStyles = makeStyles({
    updateContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    updateForm: {
        width: "50%"
    }
});

function UpdateUserComponent(props: IUserProps) {

    const classes = useStyles();

    const [id, setId] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('3');
    const [errorMessage, setErrorMessage] = useState(`Welcome, please input the user you wish to update. 
                                                      If you do not wish to change a required field, 
                                                      please input the existing value.`);
    const [errorSeverity, setErrorSeverity] = useState('info' as "info" | "error" | "success" | "warning" | undefined);

    let updateId = (e: any) => {
        setId(e.target.value);
    }

    let updateUsername = (e: any) => {
        setUsername(e.target.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.target.value);
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

    let updateRole = (e: any) => {
        setRole(e.target.value);
    }

    let update = async () => {
        console.log(id + username + password + firstName + lastName + email + role);
        console.log(role);
        let response = await updateUser(id, username, password, firstName, lastName, email, role);
        console.log(response);
        if (response.status == 204) {
            setErrorMessage(`Successfully updated user. `)
            setErrorSeverity("success");
        } else {
            setErrorMessage(`Failed to update user.`)
            setErrorSeverity("error");
        }
        //updateUser(id, username, password, firstName, lastName, email, role);
    }

    return (
        props.authUser ?
        <>
            <div className={classes.updateContainer}>
                <form className={classes.updateForm}>
                    <Typography align="center" variant="h4">Update User Information:</Typography>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="id">ID</InputLabel>
                        <Input 
                            onChange={updateId} 
                            value={id} 
                            id="id" type="text" 
                            placeholder="Enter id" />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input 
                            onChange={updateUsername} 
                            value={username} 
                            id="username" type="text" 
                            placeholder="Enter username" />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input 
                            onChange={updatePassword}
                            value={password}
                            id="password" type="password"
                            placeholder="Enter password"/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <Input 
                            onChange={updateFirstName} 
                            value={firstName} 
                            id="firstName" type="text" 
                            placeholder="Enter firstName" />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <Input 
                            onChange={updateLastName} 
                            value={lastName} 
                            id="lastName" type="text" 
                            placeholder="Enter Last Name" />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input 
                            onChange={updateEmail} 
                            value={email} 
                            id="email" type="text" 
                            placeholder="Enter email" />
                    </FormControl>
                    
                    <select id="selectRole" value = {role} onChange={updateRole}>
                        <option value="3">User</option>
                        <option value="1">Admin</option>
                        <option value="2">Manager</option>
                        <option value="4">Locked</option>
                    </select>

                    <br/><br/>
                    <Button id="updateButton" style={{backgroundColor: '#282c34'}} onClick={update} variant="contained" color="primary" size="medium">Submit</Button>
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

export default UpdateUserComponent;
