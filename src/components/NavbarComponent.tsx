import React from 'react';
import { Link } from 'react-router-dom';

import { 
    makeStyles, 
    List, 
    ListItem, 
    Typography, 
    ListItemText 
} from '@material-ui/core';

import { User } from '../models/user';

interface INavbarProps {
    authUser: User;
}

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "white"
    }
});

const NavbarComponent = (props: INavbarProps) => {

    const classes = useStyles();

    let isAdmin = () => {
        if (props.authUser?.role == "Admin") {
            return true;
        }
        return false;
    }

    let isManager = () => {
        if (props.authUser?.role == "Manager") {
            return true;
        }
        return false;
    }

    let isUser = () => {
        if (props.authUser?.role == "User") {
            return true;
        }
        return false;
    }

    return (
        <>
            <List component="nav">
                <ListItem component="div">
                    <Typography color="inherit" variant="h5">Project 1</Typography>
                    {
                        props.authUser
                        ?
                        <>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">
                                    <Link to="/home" className={classes.link}>Home</Link>
                                </Typography>
                            </ListItemText>
                            <ListItemText inset>
                            <Typography color="inherit" variant="h6">
                                <Link to="/reimbursements" className={classes.link}>Reimbursements</Link>
                            </Typography>
                            </ListItemText>
                            {
                            // props.authUser.role == 1
                            // ?
                            // <>
                            //     <ListItemText inset>
                            //     <Typography color="inherit" variant="h6">
                            //         <Link to="/users" className={classes.link}>Manage Users</Link>
                            //     </Typography>
                            //     </ListItemText>
                            // </>
                            }
                            {console.log(props.authUser)}
                            {   
                                (isAdmin() || isManager())
                                ?
                                    <>
                                        <ListItemText inset>
                                        <Typography color="inherit" variant="h6">
                                            <Link to="/manager/reimbursements" className={classes.link}>Manage Reimbursements</Link>
                                        </Typography>
                                        </ListItemText>
                                    </>
                                :
                                <></>
                            }
                            {
                                (isAdmin())
                                ?
                                <>
                                    <ListItemText inset>
                                        <Typography color="inherit" variant="h6">
                                            <Link to="/admin/users" className={classes.link}>Manage Users</Link>
                                        </Typography>
                                    </ListItemText>
                                    <ListItemText inset>
                                        <Typography color="inherit" variant="h6">
                                            <Link to="/register" className={classes.link}>Register New Users</Link>
                                        </Typography>
                                    </ListItemText>
                                    <ListItemText inset>
                                        <Typography color="inherit" variant="h6">
                                            <Link to="/admin/updateUsers" className={classes.link}>Update User Information</Link>
                                        </Typography>
                                    </ListItemText>
                                </>
                                :
                                <></>
                            }
                            <></>
                        </>
                        :
                        <>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">
                                    <Link to="/login" className={classes.link}>Login</Link>
                                </Typography>
                            </ListItemText>
                        </>
                    }
                    
                    <ListItemText inset>
                        <Typography color="inherit" variant="h6">
                            <span className={classes.link}>{props.authUser?.username}</span>
                        </Typography>
                    </ListItemText>
                    
                </ListItem>
            </List>
        </>
    );

}

export default NavbarComponent;