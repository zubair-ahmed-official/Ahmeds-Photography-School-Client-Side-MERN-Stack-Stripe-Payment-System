// import React from 'react';

import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
// import { Spinner } from "react-bootstrap";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return 
    }
    if (user) {
        return children;
    }
    return (
        <Navigate state={{ from: location }} to='/Login' />
    );
};

export default PrivateRoutes;