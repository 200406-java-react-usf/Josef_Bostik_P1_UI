import React, { useState, useEffect } from 'react';

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

import { authenticate } from '../../remote/auth-service';
import { createNewReimbursement } from '../../remote/create-new-reimbursement';
import { getUserReimbursements } from '../../remote/get-user-reimbursements';
import { delUser } from '../../remote/delete-user';
import { getReimbursements } from '../../remote/get-all-reimbursements'
import { updateReimbursementStatus } from '../../remote/update-reimbursement-status';
import { User } from '../../models/user';
import { Reimbursement } from '../../models/reimbursements'
import { Redirect } from 'react-router-dom';
import { register } from '../../serviceWorker';
import { getUsers } from '../../remote/get-all-users';

export interface IUserProps {
    authUser: User;
    setAuthUser: (user: User) => void;
}

const useStyles = makeStyles({
    userContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    userForm: {
        width: "50%"
    },
    table: {
        minWidth: 650,
    }
});

function AdminUserComponent(props: IUserProps) {
    const classes = useStyles();

    // const [amount, setAmount] = useState(0);
    // const [description, setDescription] = useState('');
    const [type, setType] = useState(0);
    const [status, setStatus] = useState(0)
    const [users, setUsers] = useState([{} as User]);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorSeverity, setErrorSeverity] = useState('error')

    // let deleteReimbursementById = async (id: number) => {
    //     let response = await deleteReimbursement(id);
    //     if (response.status == 204) {
    //         console.log("success");
    //         getAllUserReimbursements();
    //     }
        
    // }

    useEffect(() => {
        getAllUsers();
    }, []);

    let getAllUsers = async () => {
        let response = await getUsers();
        console.log(response.status)
        if (response.status==200) {
            let data = response.data;
            data.sort(function(a: Reimbursement, b: Reimbursement) { 
                return a.id - b.id;
            });
            setUsers(data)
        }
    }

    let deleteUser = async (id: number) => {
        let response = await delUser(id);
        console.log(response.status)
        if (response.status == 204) {
            getAllUsers();
        }
    }

    let isAdmin = () => {
        if (props.authUser?.role == "Admin") {
            return true;
        }
        return false;
    }



    //Function to get all user's reimbursements
    return (
        isAdmin() ?
        <>

            {/* <div className={classes.loginContainer}>
                <br/><br/>
                <Button onClick={getAllUsers} variant="contained" color="primary" size="medium">Load All Users</Button>
                <br/><br/>
            </div> */}
            <div className={classes.userContainer}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell align="right">username</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">email</TableCell>
                            <TableCell align="right">role</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((row) => (
                            <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.username}</TableCell>
                            <TableCell align="right">{row.firstName}</TableCell>
                            <TableCell align="right">{row.lastName}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.role}</TableCell>
                            <TableCell align="right"><Button id="deleteButton" style={{backgroundColor: 'red'}} onClick={() => deleteUser(row.id)} variant="contained" color="primary" size="medium">DELETE</Button></TableCell>

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

export default AdminUserComponent;
