import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardRedirect = () => {
    const { user, isAuthenticated, isLoading } = useAuth();

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

    switch (user?.role) {
        case 'super_admin':
            return <Navigate to="/super/dashboard" replace />;
        case 'teacher':
            return <Navigate to="/school/teacher-dashboard" replace />;
        case 'student':
            return <Navigate to="/school/student-dashboard" replace />;
        case 'school_admin':
        case 'branch_admin':
        default:
            return <Navigate to="/school/dashboard" replace />;
    }
};

export default DashboardRedirect;
