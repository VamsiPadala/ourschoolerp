import React, { useState } from 'react';
import { IconChartBar } from '@tabler/icons-react';

// Monthly revenue & expense data
const DATA = {
    '2024 - 2025': [
        { month: 'Apr', revenue: 9800, expenses: 3200 },
        { month: 'May', revenue: 11200, expenses: 3700 },
        { month: 'Jun', revenue: 10500, expenses: 2900 },
        { month: 'Jul', revenue: 13400, expenses: 4100 },
        { month: 'Aug', revenue: 12800, expenses: 3800 },
        { month: 'Sep', revenue: 14200, expenses: 4400 },
        { month: 'Oct', revenue: 13900, expenses: 4200 },
        { month: 'Nov', revenue: 15600, expenses: 4900 },
        { month: 'Dec', revenue: 16200, expenses: 5200 },
        { month: 'Jan', revenue: 14800, expenses: 4600 },
        { month: 'Feb', revenue: 15900, expenses: 4800 },
        { month: 'Mar', revenue: 17400, expenses: 5100 },
    ],
    '2023 - 2024': [
        { month: 'Apr', revenue: 8500, expenses: 2800 },
        { month: 'May', revenue: 9600, expenses: 3100 },
        { month: 'Jun', revenue: 9200, expenses: 2700 },
        { month: 'Jul', revenue: 11400, expenses: 3600 },
        { month: 'Aug', revenue: 10900, expenses: 3300 },
        { month: 'Sep', revenue: 12200, expenses: 3900 },
        { month: 'Oct', revenue: 11800, expenses: 3700 },
        { month: 'Nov', revenue: 13500, expenses: 4300 },
        { month: 'Dec', revenue: 14100, expenses: 4600 },
        { month: 'Jan', revenue: 12600, expenses: 4000 },
        { month: 'Feb', revenue: 13800, expenses: 4200 },
        { month: 'Mar', revenue: 15200, expenses: 4700 },
    ],
};

const AccountantRevenueChart = () => {
    const [year, setYear] = useState('2024 - 2025');
    const data = DATA[year];
    const maxVal = Math.max(...data.flatMap(d => [d.revenue, d.expenses]));
    const CHART_H = 180;

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconChartBar size={18} color="#3D5EE1" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b' }}>Revenue vs Expenses</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {/* Legend */}
                    <div style={{ display: 'flex', gap: 14 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#3D5EE1', display: 'flex', alignItems: 'center', gap: 5 }}>
                            <span style={{ width: 10, height: 10, borderRadius: 3, background: '#3D5EE1', display: 'inline-block' }} /> Revenue
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 5 }}>
                            <span style={{ width: 10, height: 10, borderRadius: 3, background: '#ef4444', display: 'inline-block' }} /> Expenses
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                        {Object.keys(DATA).map(y => (
                            <button key={y} onClick={() => setYear(y)}
                                style={{ padding: '4px 10px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 600, background: year === y ? '#3D5EE1' : '#f3f4f6', color: year === y ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                                {y}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: CHART_H + 8, borderBottom: '2px solid #f1f5f9', paddingBottom: 4 }}>
                    {data.map((d, i) => {
                        const rH = Math.max(((d.revenue / maxVal) * CHART_H), 4);
                        const eH = Math.max(((d.expenses / maxVal) * CHART_H), 4);
                        return (
                            <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                                <div title={`Revenue: $${d.revenue.toLocaleString()}`} style={{ flex: 1, height: rH, background: 'linear-gradient(180deg,#3D5EE1,#6C49EF88)', borderRadius: '5px 5px 0 0', transition: 'height 0.4s ease', cursor: 'pointer' }}
                                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }} />
                                <div title={`Expenses: $${d.expenses.toLocaleString()}`} style={{ flex: 1, height: eH, background: 'linear-gradient(180deg,#ef4444,#ef444488)', borderRadius: '5px 5px 0 0', transition: 'height 0.4s ease', cursor: 'pointer' }}
                                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }} />
                            </div>
                        );
                    })}
                </div>
                {/* X axis labels */}
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    {data.map((d, i) => (
                        <div key={i} style={{ flex: 1, fontSize: 9, color: '#9ca3af', textAlign: 'center', fontWeight: 600 }}>{d.month}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccountantRevenueChart;
