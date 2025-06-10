import React from 'react'
import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({children,roleRequired}) => {
    const token=localStorage.getItem('token');
    if(!token){
        return <Navigate to='/' replace/>;
    }
    try{
        const decoded=jwtDecode(token);

        //Check if the role matches
        if(decoded.role===roleRequired){
            return children;
        }
        else{
            return <Navigate to="/" replace/>;
        }
    } catch(error){
        //Invalid token
        localStorage.removeItem('token');
        return <Navigate to='/' replace/>;
    }
}

export default ProtectedRoute