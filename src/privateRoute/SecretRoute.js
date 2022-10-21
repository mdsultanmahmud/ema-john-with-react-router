import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserInformationContext } from '../contexts/UserInformContext/UserInformContext';

const SecretRoute = ({ children }) => {
    const { user, loading } = useContext(UserInformationContext)
    const location = useLocation()

    if(loading){
        return <span>Loading........</span>
    }

    if (user && user.uid) {
        return children
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default SecretRoute;