import React, { useState } from 'react';

import { Alert } from '@material-ui/lab';
import { 
    Typography, 
    FormControl, 
    InputLabel, 
    Input, 
    Button, 
    makeStyles, 
    Table,
    TableBody,
    TableCell ,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    responsiveFontSizes

} from '@material-ui/core';

import { authenticate } from '../remote/auth-service';
import { createNewReimbursement } from '../remote/create-new-reimbursement';
import { getUserReimbursements } from '../remote/get-user-reimbursements';
import { deleteReimbursement } from '../remote/delete-reimbursement';
import { User } from '../models/user';
import { Reimbursement } from '../models/reimbursements'
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
    },
    table: {
        minWidth: 650,
    }
});

function UserReimbursementComponent(props: IReimbursementProps) {
    const classes = useStyles();

    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [type, setType] = useState(1);
    const [userReimbursements, setUserReimbursements] = useState([{} as Reimbursement]);
    const [errorMessage, setErrorMessage] = useState('');
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

    let typeDecoder = (typeId: number) => {
        let type = '';
        if (typeId == 1) {
            type = 'LODGING';
        } else if (typeId == 2) {
            type = 'TRAVEL';
        } else if (typeId == 3) {
            type = 'FOOD';
        } else if (typeId == 4) {
            type = 'OTHER';
        }
        return type;
    }
    
    let statusDecoder = (statusId: number) => {
        let status = '';
        if (statusId == 1) {
            status = 'PENDING';
        } else if (statusId == 2) {
            status = 'DENIED';
        } else if (statusId == 3) {
            status = 'APPROVED';
        } 
        return status;
    }

    let deleteReimbursementById = async (id: number) => {
        let response = await deleteReimbursement(id);
        if (response.status == 204) {
            console.log("success");
            getAllUserReimbursements();
        }
        
    }

    let getAllUserReimbursements = async () => {
        let response = await getUserReimbursements(props.authUser.id);
        console.log(response.status)
        if (response.status=200) {
            setUserReimbursements(response.data)
        }
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
            <div className={classes.loginContainer}>
                <br/><br/>
                <Button onClick={getAllUserReimbursements} variant="contained" color="primary" size="medium">Load User Reimbursements</Button>
                <br/><br/>
            </div>
            <div className={classes.loginContainer}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Reimbursement ID</TableCell>
                            <TableCell align="right">Amount (USD)</TableCell>
                            <TableCell align="right">Submission date</TableCell>
                            <TableCell align="right">Resolved date</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Status ID</TableCell>
                            <TableCell align="right">Type ID</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {userReimbursements.map((row) => (
                            <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">${row.amount}</TableCell>
                            <TableCell align="right">{row.submitted}</TableCell>
                            <TableCell align="right">{row.resolved}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{statusDecoder(row.reimb_status_id)}</TableCell>
                            <TableCell align="right">{typeDecoder(row.reimb_type_id)}</TableCell>
                            {/* { Experimental
                                row.reimb_status_id == 1 ?
                                //@ts-ignore 
                                <TableCell align="right"><Button onClick={deleteReimbursementById(row.id)} variant="contained" color="primary" size="medium">Delete</Button></TableCell>
                                : <></>
                            }                            */}
                                </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </> 
        : <Redirect to="/login" />
        
    );
    
}

export default UserReimbursementComponent;
