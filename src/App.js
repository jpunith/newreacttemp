import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { themeChange } from 'theme-change'
import checkAuth from './app/auth';
import initializeApp from './app/init';
import OktaAuth from '@okta/okta-auth-js';
import { Security, SecureRoute } from '@okta/okta-react';
import LoginCallbackWarpper from './pages/LoginCallbackWarpper'

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))


// Initializing different libraries
initializeApp()


// Check for login and initialize axios
const token = checkAuth()


function App() {

  const oktaAuth = new OktaAuth({
    clientId: '0oaofn5uvbCRk7ua4697',
    issuer: 'https://trial-8768667.okta.com',
    responseType: 'id_token',
    redirectUri: `${window.location.origin}/login/callback`,
    scopes: ['openid', 'profile', 'email', 'groups'],
    pkce: true,
  });

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])


  return (
    <>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={() => { }}>
        <Router>
          <Switch>
            {/* <Route path="/login" >
              <Login />
            </Route> */}
            
            <Route path="/forgot-password" >
              <ForgotPassword />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/documentation">
              <Documentation />
            </Route>

            {/* Place new routes over this */}
            {/* <Route path="/app/*">
              <Layout />
            </Route> */}

            <SecureRoute path="/app/*"  component={Layout} >
            </SecureRoute>

            <Route path='/login/callback'>
              <LoginCallbackWarpper />
            </Route>

            <Route path="*" >
              <Redirect to={"/app/welcome"} />
            </Route>



          </Switch>
        </Router>
      </Security>
    </>
  )
}

export default App
