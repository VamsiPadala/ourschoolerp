import { useState, useCallback } from 'react';
import { api } from '../lib/api-client';
import { useBranch } from '../context/BranchContext';

/**
 * useBranches — CRUD helpers for branch management with local fallback.
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
            console.warn('API creation failed, falling back to local creation:', err);
            // Local fallback logic
            const id = Math.max(0, ...branches.map(b => Number(b.id) || 0)) + 1;
            const newBranchLocal = { ...payload, id };
            setBranches(prev => [...prev, newBranchLocal]);
            return { success: true, data: newBranchLocal, isLocal: true };
        } finally {
            setSaving(false);
        }
    }, [branches, setBranches]);

    const updateBranch = useCallback(async (id, payload) => {
        setSaving(true);
        setError(null);
        try {
            const updated = await api.patch(`/branches/${id}/`, payload);
            setBranches(prev => prev.map(b => b.id === id ? updated : b));
            return { success: true, data: updated };
        } catch (err) {
            console.warn('API update failed, falling back to local update:', err);
            // Local fallback
            setBranches(prev => prev.map(b => b.id === id ? { ...b, ...payload } : b));
            return { success: true, data: { id, ...payload }, isLocal: true };
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
            console.warn('API deletion failed, falling back to local deletion:', err);
            // Local fallback
            setBranches(prev => prev.filter(b => b.id !== id));
            return { success: true, isLocal: true };
        } finally {
            setSaving(false);
        }
    }, [setBranches]);

    return { branches, saving, error, createBranch, updateBranch, deleteBranch };
};

export default useBranches;
