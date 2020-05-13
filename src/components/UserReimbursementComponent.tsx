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
import { createNewReimbursement } from '../remote/create-new-reimbursement';
import { User } from '../models/user';
import { Redirect } from 'react-router-dom';
import { register } from '../serviceWorker';

interface IReimbursementProps {
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

function UserReimbursementComponent(props: IReimbursementProps) {
    const classes = useStyles();

    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [type, setType] = useState(1);
    const [errorMessage, setErrorMessage] = useState('Test message');
    const [errorSeverity, setErrorSeverity] = useState('error')

    let updateAmount = (e: any) => {
        setAmount(e.currentTarget.value);
    }

    let updateDescription = (e: any) => {
        setDescription(e.currentTarget.value);
    }

    let updateType = (e: any) => {
        setType(e.currentTarget.value);
    }

    let registerReimbursement = async () => {

        let response = await createNewReimbursement(amount, description, props.authUser.id, +type);
        if (response == 201) {
            setErrorMessage("Success");
            setErrorSeverity('success');
        } else {
            setErrorMessage("General Failure")
            setErrorSeverity('error');
        }
            // console.log(response)
        // console.log(response.status);
        // if (response == 201) {
        //     let authUser = await authenticate(username, password);
        //     props.setAuthUser(authUser);
        // } else if (response == 409) {
        //     setErrorMessage("Username or password already taken.");
        //     //username or password already taken. (should maybe specify?)
        // } else if (response == 400){
        //     setErrorMessage("Invalid input. Ensure all fields are answered.");
        // } else {
        //     setErrorMessage("Oops, something went wrong.");
        //     //General failure
        // }
        //props.setAuthUser();
        //console.log("status:" + response.status + " id:" + response.data.id);
    }

    //Function to get all user's reimbursements
    return (
        props.authUser ?
        <>
            <div className={classes.loginContainer}>
                <form className={classes.loginForm}>
                    <Typography align="center" variant="h4">Register a New Reimbursement</Typography>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="amount">Amount</InputLabel>
                        <Input 
                            onChange={updateAmount} 
                            value={amount} 
                            id="amount" type="number" 
                            placeholder="Enter Reimbursement Amount" />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <Input 
                            onChange={updateDescription}
                            value={description}
                            id="description" type="text"
                            placeholder="Enter Reimbursement Description"/>
                    </FormControl>

                    <select value = {type} onChange={updateType}>
                        <option value="1">Lodging</option>
                        <option value="2">Travel</option>
                        <option value="3">Food</option>
                        <option value="4">Other</option>
                    </select>

                    {/* <select class="form-control" id="operation">
                    <option>Add</option>
                    <option>Subtract</option>
                    <option>Divide</option>
                    <option>Multiply</option>
                    </select> */}

                    <br/><br/>
                    <Button onClick={registerReimbursement} variant="contained" color="primary" size="medium">Register</Button>
                    <br/><br/>
                    {
                        errorMessage 
                            ? 
                        //@ts-ignore
                        <Alert severity={errorSeverity}>{errorMessage}</Alert>
                            :
                        <></>
                    }
                </form>
            </div>
        </> 
        : <Redirect to="/login" />
        
    );
    
}

export default UserReimbursementComponent;
