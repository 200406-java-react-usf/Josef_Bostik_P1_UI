import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginComponent from './components/LoginComponent/LoginComponent';
import HomeComponent from './components/HomeComponent/HomeComponent';

import { User } from './models/user';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import RegisterComponent from './components/RegisterComponent/RegisterComponent';
import UserReimbursementComponent from './components/UserReimbursementComponent/UserReimbursementComponent';
import ManagerReimbursementComponent from './components/ManagerReimbursementComponent/ManagerReimbursementComponent';
import AdminUserComponent from './components/AdminUserComponent/AdminUserComponent';
import UpdateUserComponent from './components/UpdateUserComponent/UpdateUserComponent';
// import UpdateReimbursementComponent from './components/UpdateReimbursementComponent';

function App() {

  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as User);

  return (
    <>
      <Router>

        <AppBar style=  {{
                            backgroundColor: '#282c34',
                            width: '100%',
                            height: '8%'
                        }} 
                color="primary" position="static">
          <Toolbar>
              <Typography variant="h5" color="inherit">
                <NavbarComponent authUser={authUser}/>
              </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/home" render={() => <HomeComponent username={authUser?.username} /> } />
          <Route path="/login" render={() => <LoginComponent authUser={authUser} setAuthUser={setAuthUser} /> } />
          <Route path="/register" render={() => <RegisterComponent authUser={authUser} setAuthUser={setAuthUser}/> } />
          <Route path="/reimbursements" render={() => <UserReimbursementComponent authUser={authUser} setAuthUser={setAuthUser}/> } />
          <Route path="/manager/reimbursements" render={() => <ManagerReimbursementComponent authUser={authUser} setAuthUser={setAuthUser}/> } />
          <Route path="/admin/users" render={() => <AdminUserComponent authUser={authUser} setAuthUser={setAuthUser}/> } />
          <Route path="/admin/updateUsers" render={() => <UpdateUserComponent authUser={authUser} setAuthUser={setAuthUser}/> } />
        </Switch>
        
      </Router>
    </>
  );
}

export default App;
