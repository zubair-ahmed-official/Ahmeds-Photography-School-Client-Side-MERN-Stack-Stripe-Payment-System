// import React from 'react';

import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
// import { Spinner } from "react-bootstrap";

const StudentRoutes = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isInstructor, isInstructorLoading] = useInstructor();
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading && !isAdminLoading && !isInstructorLoading) {
        return 'loading...'
    }
    if (user && !isInstructor && !isAdmin) {
        return children;
    }
    return (
        <Navigate state={{ from: location }} to='/' />
    );
};

export default StudentRoutes;