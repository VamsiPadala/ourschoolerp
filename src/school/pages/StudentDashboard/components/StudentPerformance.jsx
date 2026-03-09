import React, { useState } from 'react';
import { IconChartBar } from '@tabler/icons-react';

const YEARS = ['2024 - 2025', '2023 - 2024', '2022 - 2023'];

const PERF_DATA = {
    '2024 - 2025': [
        { subject: 'Mathematics', maxMarks: 100, scored: 92, color: '#3D5EE1' },
        { subject: 'Physics', maxMarks: 100, scored: 85, color: '#10b981' },
        { subject: 'Chemistry', maxMarks: 100, scored: 88, color: '#f59e0b' },
        { subject: 'English', maxMarks: 100, scored: 90, color: '#ec4899' },
        { subject: 'Biology', maxMarks: 100, scored: 78, color: '#8b5cf6' },
        { subject: 'Spanish', maxMarks: 100, scored: 65, color: '#06b6d4' },
    ],
    '2023 - 2024': [
        { subject: 'Mathematics', maxMarks: 100, scored: 80, color: '#3D5EE1' },
        { subject: 'Physics', maxMarks: 100, scored: 75, color: '#10b981' },
        { subject: 'Chemistry', maxMarks: 100, scored: 82, color: '#f59e0b' },
        { subject: 'English', maxMarks: 100, scored: 88, color: '#ec4899' },
        { subject: 'Biology', maxMarks: 100, scored: 70, color: '#8b5cf6' },
        { subject: 'Spanish', maxMarks: 100, scored: 60, color: '#06b6d4' },
    ],
    '2022 - 2023': [
        { subject: 'Mathematics', maxMarks: 100, scored: 74, color: '#3D5EE1' },
        { subject: 'Physics', maxMarks: 100, scored: 68, color: '#10b981' },
        { subject: 'Chemistry', maxMarks: 100, scored: 77, color: '#f59e0b' },
        { subject: 'English', maxMarks: 100, scored: 83, color: '#ec4899' },
        { subject: 'Biology', maxMarks: 100, scored: 65, color: '#8b5cf6' },
        { subject: 'Spanish', maxMarks: 100, scored: 55, color: '#06b6d4' },
    ],
};

const StudentPerformance = () => {
    const [year, setYear] = useState('2024 - 2025');
    const data = PERF_DATA[year];
    const avg = Math.round(data.reduce((s, d) => s + d.scored, 0) / data.length);

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconChartBar size={18} color="#3D5EE1" />
                    </div>
                    <h5 style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Performance</h5>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                    {YEARS.map(y => (
                        <button key={y} onClick={() => setYear(y)}
                            style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: year === y ? '#3D5EE1' : '#f3f4f6', color: year === y ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                            {y}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ padding: '20px', display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                {/* Bar chart */}
                <div style={{ flex: 2, minWidth: 240 }}>
                    {/* Bar chart visualisation */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 180, borderBottom: '2px solid #f1f5f9', paddingBottom: 8 }}>
                        {data.map((s, i) => {
                            const barH = Math.round((s.scored / s.maxMarks) * 160);
                            return (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.scored}</div>
                                    <div style={{ width: '100%', height: barH, background: `linear-gradient(180deg, ${s.color}, ${s.color}88)`, borderRadius: '6px 6px 0 0', transition: 'height 0.4s ease', position: 'relative', minHeight: 6 }} />
                                </div>
                            );
                        })}
                    </div>
                    {/* X labels */}
                    <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                        {data.map((s, i) => (
                            <div key={i} style={{ flex: 1, fontSize: 10, color: '#9ca3af', textAlign: 'center', fontWeight: 600 }}>
                                {s.subject.substring(0, 3)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div style={{ flex: 1, minWidth: 140, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ textAlign: 'center', padding: '16px', borderRadius: 14, background: '#eef2ff' }}>
                        <div style={{ fontWeight: 900, fontSize: 32, color: '#3D5EE1' }}>{avg}%</div>
                        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Overall Avg</div>
                    </div>
                    {data.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                            <span style={{ fontSize: 11, color: '#6b7280', flex: 1 }}>{s.subject.substring(0, 7)}</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.scored}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentPerformance;
