import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * PermissionGuard conditionally renders its children based on whether
 * the current user has the required permission.
 * 
 * Usage:
 * <PermissionGuard permission="student.write">
 *   <button>Add Student</button>
 * </PermissionGuard>
 */
const PermissionGuard = ({
    permission,
    fallback = null,
    children
}) => {
    const { hasPermission, isLoading } = useAuth();

    if (isLoading) return null;

    if (hasPermission(permission)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};

export default PermissionGuard;
