import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children, redirectIfAuth = false }) => {
    const { user } = useAuth();

    if (redirectIfAuth && user) {
        return <Navigate to="/carousel" replace />;
    }

    if (!redirectIfAuth && !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
