import React, { useState, Component, useEffect } from 'react';

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
    responsiveFontSizes,
    Select,
    MenuItem

} from '@material-ui/core';

import { authenticate } from '../../remote/auth-service';
import { createNewReimbursement } from '../../remote/create-new-reimbursement';
import { getUserReimbursements } from '../../remote/get-user-reimbursements';
import { deleteReimbursement } from '../../remote/delete-reimbursement';
import { getReimbursements } from '../../remote/get-all-reimbursements'
import { updateReimbursementStatus } from '../../remote/update-reimbursement-status';
import { User } from '../../models/user';
import { Reimbursement } from '../../models/reimbursements'
import { Redirect } from 'react-router-dom';
import { register } from '../../serviceWorker';
import { render } from '@testing-library/react';

export interface IReimbursementProps {
    authUser: User;
    setAuthUser: (user: User) => void;
}

const useStyles = makeStyles({
    reimbursementContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    reimbursementForm: {
        width: "50%"
    },
    table: {
        minWidth: 650,
    }
});



function ManagerReimbursementComponent(props: IReimbursementProps) {
    const classes = useStyles();

    // const [amount, setAmount] = useState(0);
    // const [description, setDescription] = useState('');
    const [type, setType] = useState(0);
    const [status, setStatus] = useState(0)
    const [reimbursements, setReimbursements] = useState([{} as Reimbursement]);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorSeverity, setErrorSeverity] = useState('error')
    const [forceStateChange, setForceStateChange] = useState(true);

    // let updateAmount = (e: any) => {
    //     setAmount(e.currentTarget.value);
    // }

    // let updateDescription = (e: any) => {
    //     setDescription(e.currentTarget.value);
    // }

    useEffect(() => {
        getAllReimbursements();
    }, []);

    let updateType = (e: any) => {
        console.log(e.target.value);
        if (e.target.value >= 0 && e.target.value < 5) {
            setType(e.target.value);
            
        }
    }

    let updateStatus = (e: any) => {
        if (e.target.value >= 0 && e.target.value < 4) {
            setStatus(e.target.value);
        }
        
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

    // let deleteReimbursementById = async (id: number) => {
    //     let response = await deleteReimbursement(id);
    //     if (response.status == 204) {
    //         console.log("success");
    //         getAllUserReimbursements();
    //     }
        
    // }

    let getAllReimbursements = async () => {
        let response = await getReimbursements(props.authUser?.id);
        console.log(response.status)
        if (response.status==200) {
            let data = response.data;
            if (status != 0) {
                data = data.filter((reimb: Reimbursement) => {
                    return reimb.reimb_status_id == status;
                });
            } 
            if (type != 0) {
                data = data.filter((reimb: Reimbursement) => {
                    return reimb.reimb_type_id == type;
                });
            }
            data.sort(function(a: Reimbursement, b: Reimbursement) { 
                return a.id - b.id;
            });
            setReimbursements(data);
        }
    }

    let approve = async (reimb: Reimbursement) => {
        let response = updateReimbursementStatus(reimb, 3, props.authUser.id);
        getAllReimbursements();
    }   

    let deny = async (reimb: Reimbursement) => {
        let response = updateReimbursementStatus(reimb, 2, props.authUser.id);
        getAllReimbursements();
    }

    //Function to get all user's reimbursements
    return (
        props.authUser ?
        <>
            <div className={classes.reimbursementContainer}>
                <Button style={{backgroundColor: '#282c34'}} onClick={getAllReimbursements} variant="contained" color="primary" size="medium">Load Selected Reimbursements</Button>
                <br/><br/>
            </div>

            <div className={classes.reimbursementContainer}>
                    <select id="typeSelect"value = {type} onChange={updateType}>
                        <option value="0">All</option>
                        <option value="1">Lodging</option>
                        <option value="2">Travel</option>
                        <option value="3">Food</option>
                        <option value="4">Other</option>
                    </select>
                    <select id="statusSelect" value = {status} onChange={updateStatus}>
                        <option value="0">All</option>
                        <option value="1">Pending</option>
                        <option value="2">Denied</option>
                        <option value="3">Approved</option>
                    </select>
            </div>
            <div className={classes.reimbursementContainer}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Reimbursement ID</TableCell>
                            <TableCell align="right">Amount (USD)</TableCell>
                            <TableCell align="right">Submission date</TableCell>
                            <TableCell align="right">Resolved date</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Author ID</TableCell>
                            <TableCell align="right">Resolver ID</TableCell>
                            <TableCell align="right">Status ID</TableCell>
                            <TableCell align="right">Type ID</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {reimbursements.map((row) => (
                            <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">${row.amount}</TableCell>
                            <TableCell align="right">{row.submitted}</TableCell>
                            <TableCell align="right">{row.resolved}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.author}</TableCell>
                            <TableCell align="right">{row.resolver}</TableCell>
                            <TableCell id="statusDecoder" align="right">{statusDecoder(row.reimb_status_id)}</TableCell>
                            <TableCell id="typeDecoder" align="right">{typeDecoder(row.reimb_type_id)}</TableCell>
                            
                            {
                            row.reimb_status_id == 1 ?
                            <>
                                <TableCell align="right"><Button id="approveButton" style={{backgroundColor: '#282c34'}} onClick={() => approve(row)} variant="contained" color="primary" size="medium">Approve</Button></TableCell>
                                <TableCell align="right"><Button id="denyButton" style={{backgroundColor: '#282c34'}} onClick={() => deny(row)} variant="contained" color="primary" size="medium">Deny</Button></TableCell>  
                            </>
                            : <></>    
                            }   

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

export default ManagerReimbursementComponent;
