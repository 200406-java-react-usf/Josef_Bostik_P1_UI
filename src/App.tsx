import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';

import { User } from './models/user';
import NavbarComponent from './components/NavbarComponent';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import RegisterComponent from './components/RegisterComponent';
import UserReimbursementComponent from './components/UserReimbursementComponent';

function App() {

  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as User);

  return (
    <>
      <Router>

        <AppBar color="primary" position="static">
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
        </Switch>
        
      </Router>
    </>
  );
}

export default App;
