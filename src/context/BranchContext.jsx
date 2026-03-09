import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api-client';

const BranchContext = createContext(undefined);

export const BranchProvider = ({ children }) => {
    const [branches, setBranches] = useState([]);
    const [activeBranch, setActiveBranchState] = useState(null);
    const [loading, setLoading] = useState(false);

    // Restore active branch from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('active_branch');
        if (stored) {
            try {
                setActiveBranchState(JSON.parse(stored));
            } catch {
                localStorage.removeItem('active_branch');
            }
        }
    }, []);

    const fetchBranches = useCallback(async () => {
        setLoading(true);
        try {
            const data = await api.get('/branches/');
            const list = Array.isArray(data) ? data : (data.results ?? []);
            setBranches(list);
            // Auto-select first branch if none active
            if (!activeBranch && list.length > 0) {
                const first = list[0];
                setActiveBranchState(first);
                localStorage.setItem('active_branch', JSON.stringify(first));
                localStorage.setItem('active_branch_id', first.id);
            }
        } catch (err) {
            // Backend not ready yet — seed with a default so UI works
            const fallback = [{ id: 1, name: 'Main Campus', address: 'Main Address', is_active: true }];
            setBranches(fallback);
            if (!activeBranch) {
                setActiveBranchState(fallback[0]);
                localStorage.setItem('active_branch', JSON.stringify(fallback[0]));
                localStorage.setItem('active_branch_id', fallback[0].id);
            }
        } finally {
            setLoading(false);
        }
    }, [activeBranch]);

    const setActiveBranch = useCallback((branch) => {
        setActiveBranchState(branch);
        localStorage.setItem('active_branch', JSON.stringify(branch));
        localStorage.setItem('active_branch_id', branch.id);
    }, []);

    return (
        <BranchContext.Provider value={{ branches, activeBranch, loading, setActiveBranch, fetchBranches, setBranches }}>
            {children}
        </BranchContext.Provider>
    );
};

export const useBranch = () => {
    const ctx = useContext(BranchContext);
    if (!ctx) throw new Error('useBranch must be used within a BranchProvider');
    return ctx;
};

export default BranchContext;
