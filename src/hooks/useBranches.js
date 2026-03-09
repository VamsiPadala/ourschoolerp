import { useState, useCallback } from 'react';
import { api } from '../lib/api-client';
import { useBranch } from '../context/BranchContext';

/**
 * useBranches — CRUD helpers for branch management.
 * Keeps BranchContext in sync after each mutation.
 */
const useBranches = () => {
    const { branches, setBranches } = useBranch();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const createBranch = useCallback(async (payload) => {
        setSaving(true);
        setError(null);
        try {
            const newBranch = await api.post('/branches/', payload);
            setBranches(prev => [...prev, newBranch]);
            return { success: true, data: newBranch };
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to create branch';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setSaving(false);
        }
    }, [setBranches]);

    const updateBranch = useCallback(async (id, payload) => {
        setSaving(true);
        setError(null);
        try {
            const updated = await api.patch(`/branches/${id}/`, payload);
            setBranches(prev => prev.map(b => b.id === id ? updated : b));
            return { success: true, data: updated };
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to update branch';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setSaving(false);
        }
    }, [setBranches]);

    const deleteBranch = useCallback(async (id) => {
        setSaving(true);
        setError(null);
        try {
            await api.delete(`/branches/${id}/`);
            setBranches(prev => prev.filter(b => b.id !== id));
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to delete branch';
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setSaving(false);
        }
    }, [setBranches]);

    return { branches, saving, error, createBranch, updateBranch, deleteBranch };
};

export default useBranches;
