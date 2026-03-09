import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import { IconLock, IconEye, IconEyeOff, IconCheck, IconSchool, IconChevronRight } from '@tabler/icons-react';
import { api } from 'src/lib/api-client';
import StudentPageContainer from '../../school/pages/StudentInformation/components/StudentPageContainer';
import { useLocation } from 'react-router-dom';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const location = useLocation();
    const isSchoolContext = location.pathname.startsWith('/school');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // If somehow they got here without being authenticated, AuthGuard will handle them.
    // We can just rely on user state being present.

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters long.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.patch('/auth/me/password', {
                current_password: currentPassword,
                new_password: newPassword
            });

            // Update the user's local state to reflect they are no longer on first login
            if (user) {
                const updatedUser = { ...user, is_first_login: false };
                const token = localStorage.getItem('auth_token');
                login(token, updatedUser); // Re-fire context and localStorage
            }

            setSuccess(true);

            // Auto redirect after a tiny delay for UX
            setTimeout(() => {
                const dashboardRoute = user?.role === 'super_admin' ? '/super/dashboard' : '/school/dashboard';
                navigate(dashboardRoute, { replace: true });
            }, 1500);

        } catch (err) {
            console.error('Password update error:', err);
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError('Failed to update password. Please verify your current password is correct.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const layoutClasses = isSchoolContext
        ? "w-full pt-10 lg:pt-20 px-4 flex justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        : "!min-h-[100vh] !w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 !p-6 sm:!p-12 !m-0";

    // Premium Modern Look
    return (
        <div className={layoutClasses} style={{ zIndex: 10, position: 'relative' }}>
            <div className="!w-full !max-w-xl mx-auto">
                {/* Header Section */}
                <div className="!text-center !mb-10">
                    <div className="inline-flex items-center justify-center !w-20 !h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-500/30 !mb-6 transform hover:scale-105 transition-transform duration-300">
                        <IconSchool size={40} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight !mb-3">
                        Update Password
                    </h1>
                    <p className="text-base text-center text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                        For security reasons, please change your system-generated password to continue.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-[2.5rem] !shadow-2xl shadow-gray-200/50 dark:shadow-black/40 border border-gray-100 dark:border-gray-700/50 !p-8 sm:!p-12">
                    {success ? (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <IconCheck size={40} className="text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white !mb-3">Password Updated!</h3>
                            <p className="text-gray-500 dark:text-gray-400">Redirecting to your dashboard...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col !gap-8">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 !text-sm !px-5 !py-4 rounded-2xl border border-red-100 dark:border-red-800 flex items-center !gap-3 animate-shake">
                                    <span className="!w-1.5 !h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col !gap-6">
                                {/* Current Password */}
                                <div className="group flex flex-col !gap-2">
                                    <label className="!block text-sm font-semibold text-gray-700 dark:text-gray-300 !mb-2.5 !ml-1">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <IconLock size={20} />
                                        </div>
                                        <input
                                            type={showCurrent ? 'text' : 'password'}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter current password"
                                            className="!w-full !pl-12 !pr-12 !py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-base"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrent(!showCurrent)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                                        >
                                            {showCurrent ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div className="group flex flex-col !gap-2 mt-4">
                                    <label className="!block text-sm font-semibold text-gray-700 dark:text-gray-300 !mb-2.5 !ml-1">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <IconLock size={20} />
                                        </div>
                                        <input
                                            type={showNew ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Create a new password"
                                            className="!w-full !pl-12 !pr-12 !py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-base"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNew(!showNew)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                                        >
                                            {showNew ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="group flex flex-col !gap-2 mt-4">
                                    <label className="!block text-sm font-semibold text-gray-700 dark:text-gray-300 !mb-2.5 !ml-1">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <IconLock size={20} />
                                        </div>
                                        <input
                                            type={showNew ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm your new password"
                                            className="!w-full !pl-12 !pr-12 !py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-base"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="!w-full group relative flex items-center justify-center !gap-3 !py-4 !px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold !text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                                ) : (
                                    <>
                                        <span>Update Password</span>
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
