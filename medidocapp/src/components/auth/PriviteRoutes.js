import { Outlet, Navigate } from "react-router-dom";
//import { IsDoctor } from "../../App";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useState, useEffect, isDoctor } from "react";

const PrivateRoutes = () => {

  //  if (userAttributes.name === 'doctor') {
    let auth = {'token': isDoctor}

    return(

        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes
