import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  IconSchool,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconArrowRight,
  IconBuildingBank
} from
  '@tabler/icons-react';
import { api } from 'src/lib/api-client';

// ——————————————————————————————————————————
// Demo credentials for development / testing.
// Remove or replace with real API calls in production.
// ——————————————————————————————————————————
const DEMO_USERS = {
  school_admin: {
    password: 'admin123',
    user: {
      id: 1,
      email: 'admin@school.com',
      username: 'school_admin',
      fullName: 'School Administrator',
      role: 'school_admin',
      schoolId: 1,
      role_assignments: [],
      permissions: ['student.read', 'student.write', 'teacher.read', 'fees.view', 'course.read', 'school.settings', 'users.manage']
    }
  },
  branch_admin: {
    password: 'branch123',
    user: {
      id: 2,
      email: 'branch@school.com',
      username: 'branch_admin',
      fullName: 'Branch Administrator',
      role: 'branch_admin',
      schoolId: 1,
      branchId: 1,
      branchName: 'Main Branch',
      role_assignments: [],
      permissions: ['student.read', 'attendance.mark', 'teacher.read', 'course.read', 'users.manage']
    }
  }
};

const SchoolLogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, let the DashboardRedirect handle it
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Detect school admin by username pattern (e.g., admin_oep-002)
      const isSchoolUser = username.includes('_') && username !== 'school_admin' && username !== 'branch_admin';
      let loginEndpoint = '/super-admin/login';
      let loginParams = {};

      // Handle demo users specifically
      if (DEMO_USERS[username]) {
        const demo = DEMO_USERS[username];
        if (password === demo.password) {
          localStorage.setItem('auth_token', 'demo-token');
          localStorage.setItem('auth_user', JSON.stringify(demo.user));
          window.location.href = '/';
          return;
        }
      }

      if (isSchoolUser) {
        loginEndpoint = '/auth/login';
        const schoolCode = username.split('_').slice(1).join('_');
        if (schoolCode) {
          loginParams = { school: schoolCode };
        }
      }

      // 1. Authenticate with backend using x-www-form-urlencoded which FastAPI expects
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await api.post(loginEndpoint, formData, {
        params: loginParams,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      // 2. Save token FIRST — axios interceptor needs it for the /me call
      localStorage.setItem('auth_token', response.access_token);

      // 3. Fetch profile which now contains full RBAC data
      const profileEndpoint = isSchoolUser ? '/auth/me' : '/super-admin/me';
      const profile = await api.get(profileEndpoint, { params: loginParams });

      // Ensure role is set (backend sends it, but fallback just in case)
      const userData = {
        ...profile,
        role: profile.role || (isSchoolUser ? 'school_admin' : 'super_admin')
      };

      // 4. Persist user to localStorage and do a full reload
      localStorage.setItem('auth_user', JSON.stringify(userData));

      if (userData.is_first_login) {
        window.location.href = '/school/update-password';
      } else {
        window.location.href = '/';
      }

    } catch (err) {
      console.error('Login error:', err);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');

      if (err.response && err.response.status === 401) {
        setError('Invalid username or password');
      } else if (err.response && err.response.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Login failed. Please verify your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (role) => {
    const demo = DEMO_USERS[role];
    if (demo) {
      setUsername(role);
      setPassword(demo.password);
    }
  };

  return (
    <>
      <style>{`
        .login-input-wrap {
          background: #f4f6fa;
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 8px 16px;
          margin-bottom: 20px;
          color: #6b7280;
        }
        .login-input-wrap input {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          padding: 10px 12px;
          color: #374151;
          font-weight: 500;
          font-size: 15px;
        }
        .login-input-wrap input::placeholder {
          color: #9ca3af;
        }
        .login-btn-primary {
          background-color: #1e3a8a; /* Deep blue from second image */
          color: white;
          border-radius: 10px;
          padding: 14px;
          font-weight: 600;
          font-size: 16px;
          width: 100%;
          max-width: 180px;
          transition: all 0.2s ease;
        }
        .login-btn-primary:hover {
          background-color: #1e40af;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
        }
        .bg-illustration {
          background-image: url('/src/assets/login-bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>

      <div className="flex min-h-screen bg-white font-sans overflow-hidden">

        {/* Left Side: Login Form Area (Similar to second image) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10 bg-white">

          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-md">
              <IconSchool size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight uppercase">OUR SCHOOL ERP</h1>
              <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500">School Management System</p>
            </div>
          </div>

          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Login to your account</h2>

            <form onSubmit={handleSubmit}>

              {/* Username Input */}
              <div className="login-input-wrap">
                <IconMail size={20} className="text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username or Email"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="login-input-wrap mb-4">
                <IconLock size={20} className="text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 focus:outline-none text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
              </div>

              {/* Extras & Submit */}
              <div className="flex flex-col gap-6 mb-8">
                <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-700 w-fit transition-colors">
                  Forget password?
                </a>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="login-btn-primary flex justify-center items-center gap-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

              {/* Error block */}
              {error && (
                <div className="text-red-500 text-sm font-medium mt-2 p-3 bg-red-50 rounded-lg border border-red-100 mb-6">
                  {error}
                </div>
              )}
            </form>

            {/* Dev Tools / Quick Login */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Demo Access</p>
              <div className="flex gap-3">
                {Object.entries(DEMO_USERS).map(([key, demo]) => (
                  <button
                    key={key}
                    onClick={() => quickLogin(key)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-white hover:border-blue-400 hover:shadow-sm text-sm font-semibold text-slate-600 transition-all"
                  >
                    {key === 'branch_admin' ? <IconBuildingBank size={16} className="text-blue-600" /> : <IconSchool size={16} className="text-blue-600" />}
                    {demo.user.fullName.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Flowing Background Illustration */}
        <div className="hidden lg:block w-[55%] relative overflow-hidden bg-slate-50">
          {/* Soft edge fade left */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>

          {/* Illustration graphic */}
          <div className="absolute inset-0 bg-illustration"></div>

        </div>

      </div>
    </>
  );

};

export default SchoolLogin;