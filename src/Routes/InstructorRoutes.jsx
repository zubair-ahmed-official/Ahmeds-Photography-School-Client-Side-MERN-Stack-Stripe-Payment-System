// import React, { useContext } from 'react';
import {  Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useInstructor from '../hooks/useInstructor';

const InstructorRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();
    if(loading || isInstructorLoading)
    {
        return 'loading...'
    }
    if(user && isInstructor)
    {
        return children;
    }
  
    return (
        <Navigate to="/" state={{from: location}} replace></Navigate>
    );
    
    
};

export default InstructorRoutes;