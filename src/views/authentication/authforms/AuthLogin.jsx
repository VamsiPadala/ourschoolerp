import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import FullLogo from "src/layouts/full/shared/logo/FullLogo";

// Helper to decode JWT and safely extract the role
function getRoleFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || 'super_admin'; // fallback just in case
  } catch (e) {
    return 'super_admin';
  }
}
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
import { Label } from 'src/components/ui/label';
import { api } from 'src/lib/api-client';
import { IconSchool, IconBuildingBank, IconUser, IconLock, IconEye, IconEyeOff, IconMail } from '@tabler/icons-react';

const DEMO_USERS = {
  school_admin: {
    username: 'school_admin',
    password: 'admin123',
    label: 'School Admin',
    icon: IconSchool,
  },
  branch_admin: {
    username: 'branch_admin',
    password: 'branch123',
    label: 'Branch Admin',
    icon: IconBuildingBank,
  },
  teacher: {
    username: 'teacher1',
    password: 'teacher123',
    label: 'Teacher',
    icon: IconUser,
  }
};

const AuthLogin = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickLogin = (role) => {
    const demo = DEMO_USERS[role];
    if (demo) {
      setUsername(demo.username);
      setPassword(demo.password);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    setIsLoading(true);

    try {
      let loginEndpoint = '/super-admin/login';
      let loginParams = {};

      // Identify if it's a school user based on username pattern (e.g., admin_oep-002)
      // or if it's not 'school_admin' (hardcoded super admin demo)
      const isSchoolUser = username.includes('_') && username !== 'school_admin';

      if (isSchoolUser) {
        loginEndpoint = '/auth/login';
        // Extract school code from username (e.g., oep-002 from admin_oep-002)
        const schoolCode = username.split('_')[1];
        if (schoolCode) {
          loginParams = { school: schoolCode };
          // Ensure the interceptor uses the correct tenant header for this request
          localStorage.setItem('tenant_id', schoolCode);
        }
      } else {
        // Super admins don't use tenant isolation, clear any stale tenant header
        localStorage.removeItem('tenant_id');
      }

      const response = await api.post(loginEndpoint, {
        username,
        password
      }, { params: loginParams });

      localStorage.setItem('auth_token', response.access_token);

      // Try to fetch profile to verify success
      try {
        // Super admins use /super-admin/me, school users use /auth/me
        const profileEndpoint = isSchoolUser ? '/auth/me' : '/super-admin/me';
        const profile = await api.get(profileEndpoint, { params: loginParams });

        // Extract role from JWT token or profile
        const userRole = profile.role || getRoleFromToken(response.access_token);
        const userProfileWithRole = { ...profile, role: userRole };

        // Update AuthContext state
        authLogin(response.access_token, userProfileWithRole);
        localStorage.setItem('auth_user', JSON.stringify(userProfileWithRole));

        // Redirect based on role and first login status
        if (profile.is_first_login) {
          navigate(userProfileWithRole.role === 'super_admin' ? '/super/update-password' : '/school/update-password');
        } else {
          navigate(userProfileWithRole.role === 'super_admin' ? '/super/dashboard' : '/school/dashboard');
        }
      } catch (profileError) {
        console.error("Failed to fetch profile", profileError);
        localStorage.removeItem('auth_token');
        setError('Failed to fetch user profile. Please try again.');
      }

    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.status === 401) {
        setError('Incorrect username or password');
      } else {
        setError('Login failed. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo Section */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
          <IconSchool size={30} stroke={2} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">OUR SCHOOL ERP</h1>
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500 mt-1">School Management System</p>
        </div>
      </div>

      <div>
        <h2 className="text-[1.7rem] font-bold text-slate-800 mb-8">Login to your account</h2>

        <form onSubmit={handleLogin}>

          {/* Username Input */}
          <div className="flex items-center bg-[#f4f6fa] rounded-2xl px-5 py-3.5 mb-5 shadow-sm">
            <IconMail size={22} className="text-slate-400 mr-3" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username or Email"
              className="bg-transparent border-none outline-none w-full text-slate-700 font-semibold placeholder-slate-400 text-[15px]"
              disabled={isLoading}
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center bg-[#f4f6fa] rounded-2xl px-5 py-3.5 mb-6 shadow-sm">
            <IconLock size={22} className="text-slate-400 mr-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-transparent border-none outline-none w-full text-slate-700 font-semibold placeholder-slate-400 text-[15px]"
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 focus:outline-none text-slate-400 hover:text-slate-600 transition-colors ml-2"
            >
              {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>

          {/* Extras & Submit */}
          <div className="flex flex-col gap-6 mb-8">
            <Link to={'/auth/auth2/forgot-password'} className="text-[14px] font-bold text-slate-500 hover:text-blue-700 w-fit transition-colors">
              Forget password?
            </Link>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white rounded-xl py-4 font-bold text-[16px] w-[180px] shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex justify-center items-center"
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
            <div className="text-red-600 text-[13px] font-bold mt-2 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </div>
          )}
        </form>

        {/* Dev Tools / Quick Login */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Demo Access (Dev Only)</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(DEMO_USERS).map(([key, demo]) => (
              <button
                key={key}
                type="button"
                onClick={() => quickLogin(key)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 text-sm font-bold text-slate-600 transition-all active:scale-95"
              >
                <demo.icon size={16} className="text-[#1e3a8a]" />
                {demo.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLogin;

