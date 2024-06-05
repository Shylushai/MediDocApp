import { Route, Routes } from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import { Authenticator, View, Image, useTheme, Text  } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@aws-amplify/ui-react/styles.css';

import SiteNav from './components/common/SiteNav';
import SiteFooter from './components/common/SiteFooter';
import HomePage from './components/home/HomePage';
import PatientPage from './patient/PatientPage';


import { fetchUserAttributes } from 'aws-amplify/auth';
import { Outlet, Navigate } from "react-router-dom";


var isDoctor = false;

//privatRoute
const PrivateRoutes = () => {

  //  if (userAttributes.name === 'doctor') {
    let auth = {'token': isDoctor}

    return(

        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}

//logs what type of user you are
async function getDoctor() {
  const userAttributes = await fetchUserAttributes();
  if (userAttributes.name === 'doctor') {
    console.log('is doctor')
    isDoctor = true;
    return true;
    }
    else {
      console.log('is not doctor')
      isDoctor = false;
      return false;
    }
}

async function getName() {
  const userAttributes = await fetchUserAttributes();
  
  if (userAttributes.name === 'doctor') {
    console.log('you are a doctor');
    return true;
    }
    else if (userAttributes.name === 'admin') {
    console.log('you are a admin');

    }
    else {
      console.log('you have no role')
    }
}
Amplify.configure(awsExports);

function App() {
getDoctor()

  return (
    getDoctor(),
    <Authenticator loginMechanisms={['email']}>

    {({ signOut, user }) => (
      <div>
        <SiteNav logOut={signOut} />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<PatientPage/>} path='/patient' exact/>
          </Route>
          <Route path='*' element={<HomePage />} />
          <Route path='/' exact={true} element={<HomePage />} />
        </Routes>
        <SiteFooter />
      </div>
    )}
    </Authenticator>
  );
}

export default App;