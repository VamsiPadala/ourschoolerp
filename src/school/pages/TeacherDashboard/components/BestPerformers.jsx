import React from 'react';
import { IconTrophy } from '@tabler/icons-react';

const performers = [
    {
        name: 'Class IV, C',
        percentage: 80,
        gradFrom: '#3D5EE1',
        gradTo: '#6C49EF',
        avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg',
    },
    {
        name: 'Class III, B',
        percentage: 54,
        gradFrom: '#10b981',
        gradTo: '#0ea5e9',
        avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-02.jpg',
    },
    {
        name: 'Class V, A',
        percentage: 76,
        gradFrom: '#f59e0b',
        gradTo: '#ef4444',
        avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-03.jpg',
    },
];

const BestPerformers = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: 24, height: '100%', boxSizing: 'border-box' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconTrophy size={17} color="#f59e0b" />
                </div>
                <h4 style={{ fontWeight: 700, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Best Performers</h4>
            </div>
            <a href="#" style={{ fontSize: 12, color: '#3D5EE1', fontWeight: 600, textDecoration: 'none' }}>View All</a>
        </div>

        {/* Performer rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {performers.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {/* Avatar */}
                    <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #e5e7eb' }}>
                        <img src={p.avatar} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=3D5EE1&color=fff`; }} />
                    </div>

                    {/* Bar */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#1f2937' }}>{p.name}</span>
                            <span style={{ fontSize: 13, fontWeight: 800, color: '#1f2937' }}>{p.percentage}%</span>
                        </div>
                        {/* Track */}
                        <div style={{ width: '100%', height: 8, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
                            {/* Fill */}
                            <div style={{ height: '100%', width: `${p.percentage}%`, borderRadius: 99, background: `linear-gradient(90deg, ${p.gradFrom}, ${p.gradTo})`, transition: 'width 0.6s ease' }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default BestPerformers;
