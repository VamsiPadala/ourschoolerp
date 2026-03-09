import React from 'react';
import { IconMail, IconMessageCircle } from '@tabler/icons-react';

const FACULTIES = [
    { name: 'Aaron', subject: 'Chemistry', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-01.jpg' },
    { name: 'Hellana', subject: 'English', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-02.jpg' },
    { name: 'Morgan', subject: 'Physics', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-03.jpg' },
    { name: 'Daniel Josua', subject: 'Spanish', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-04.jpg' },
    { name: 'Teresa', subject: 'Maths', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-05.jpg' },
    { name: 'Jacquelin', subject: 'Biology', img: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-06.jpg' },
];

const ClassFaculties = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
            <h5 style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Class Faculties</h5>
        </div>
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
            {FACULTIES.map((f, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', border: '2.5px solid #e5e7eb', margin: '0 auto 10px' }}>
                        <img src={f.img} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&size=60&background=3D5EE1&color=fff`; }} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#1e1b4b', marginBottom: 2 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 10 }}>{f.subject}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                        <button style={{ width: 28, height: 28, borderRadius: 8, background: '#eef2ff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <IconMail size={13} color="#3D5EE1" />
                        </button>
                        <button style={{ width: 28, height: 28, borderRadius: 8, background: '#d1fae5', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <IconMessageCircle size={13} color="#10b981" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default ClassFaculties;
