import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const AuthContext = createContext(undefined);

/**
 * AuthProvider provides authentication state and RBAC helpers.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('auth_user');
      if (savedToken && savedUser) {
        // Simple validation — in production, verify with backend or check JWT exp
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to restore auth state", e);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((token, userData) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  }, []);

  const getToken = useCallback(() => {
    return localStorage.getItem('auth_token');
  }, []);

  // RBAC Helpers
  const roles = useMemo(() => {
    if (!user) return [];
    // Combine primary role field with role_assignments for compatibility
    const allRoles = new Set();
    if (user.role) allRoles.add(user.role);
    if (user.role_assignments) {
      user.role_assignments.forEach(ra => allRoles.add(ra.role_name));
    }
    return Array.from(allRoles);
  }, [user]);

  const permissions = useMemo(() => {
    if (!user || !user.permissions) return new Set();
    return new Set(user.permissions);
  }, [user]);

  const hasPermission = useCallback((permissionKey) => {
    if (!user) return false;
    // Super admins have all permissions
    if (roles.includes('super_admin')) return true;
    return permissions.has(permissionKey);
  }, [user, roles, permissions]);

  const hasAnyRole = useCallback((requiredRoles) => {
    if (!user) return false;
    return requiredRoles.some(role => roles.includes(role));
  }, [user, roles]);

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        permissions,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        getToken,
        hasPermission,
        hasAnyRole
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ──
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;