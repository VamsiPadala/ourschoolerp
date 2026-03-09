import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardRedirect = () => {
    const { user, roles, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/auth/login" replace />;
    }

    // Priority-based redirect for multi-role users
    if (roles.includes('super_admin')) {
        return <Navigate to="/super/dashboard" replace />;
    }

    if (roles.includes('school_admin') || roles.includes('principal')) {
        return <Navigate to="/school/dashboard" replace />;
    }

    if (roles.includes('branch_admin') || roles.includes('branch_principal')) {
        return <Navigate to="/school/dashboard" replace />;
    }

    if (roles.includes('teacher')) {
        return <Navigate to="/school/teacher-dashboard" replace />;
    }

    if (roles.includes('student')) {
        return <Navigate to="/school/student-dashboard" replace />;
    }

    // Default fallback
    return <Navigate to="/school/dashboard" replace />;
};

export default DashboardRedirect;
