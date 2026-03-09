import React from 'react';
import { IconEdit, IconMail, IconPhone, IconBook, IconUsers, IconNotebook, IconClipboard } from '@tabler/icons-react';

// Try importing useAuth, but don't crash if AuthContext isn't available
let useAuthSafe;
try {
    useAuthSafe = require('src/context/AuthContext').useAuth;
} catch {
    useAuthSafe = () => ({ user: null });
}

const STAT_CARDS = [
    { label: 'Total Classes', value: 12, color: '#3D5EE1', bg: '#EEF2FF', icon: IconBook },
    { label: 'Total Students', value: 185, color: '#f59e0b', bg: '#fef3c7', icon: IconUsers },
    { label: 'Subjects', value: 4, color: '#10b981', bg: '#d1fae5', icon: IconNotebook },
    { label: 'Assignments', value: 28, color: '#ec4899', bg: '#fce7f3', icon: IconClipboard },
];

const TeacherProfileCard = () => {
    const { user } = useAuthSafe();
    const initial = user?.name?.charAt(0)?.toUpperCase() || 'T';
    const name = user?.name || 'Henriques Morgan';
    const dept = user?.department || 'Science Department';
    const desg = user?.designation || 'Senior Teacher';

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: 24 }}>
            {/* Profile header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20, paddingBottom: 18, borderBottom: '1px solid #f1f5f9' }}>
                {/* Avatar */}
                <div style={{ width: 68, height: 68, borderRadius: 14, background: 'linear-gradient(135deg, #3D5EE1, #6C49EF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 26, flexShrink: 0, boxShadow: '0 4px 14px rgba(61,94,225,0.3)' }}>
                    {initial}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 18, color: '#1e1b4b', marginBottom: 2 }}>{name}</div>
                    <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>{dept} · {desg}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        {user?.email && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6b7280' }}>
                                <IconMail size={13} color="#9ca3af" /> {user.email}
                            </div>
                        )}
                        {user?.phone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6b7280' }}>
                                <IconPhone size={13} color="#9ca3af" /> {user.phone}
                            </div>
                        )}
                    </div>
                </div>

                {/* Edit btn */}
                <a href="/school/profile" style={{ flexShrink: 0, padding: '7px 14px', borderRadius: 10, background: '#f3f4f6', fontSize: 12, fontWeight: 600, color: '#374151', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <IconEdit size={14} /> Edit Profile
                </a>
            </div>

            {/* Stat tiles – 4 across */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {STAT_CARDS.map(({ label, value, color, bg, icon: Icon }) => (
                    <div key={label} style={{ background: bg, borderRadius: 12, padding: '14px 12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={17} color="white" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: 20, color: '#1e1b4b', lineHeight: 1 }}>{value}</div>
                            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>{label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherProfileCard;
