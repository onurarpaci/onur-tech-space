import React from 'react';
import { profile } from '../data/profile';
import './General.css';

const Education = () => {
    return (
        <div className="section-container">
            <h2 className="section-title">Education</h2>
            <div className="doc-grid">
                {profile.education.map((edu) => (
                    <div key={edu.id} className="doc-card">
                        <div className="doc-header">
                            <span className="doc-id">REF: EDU-{String(edu.id).padStart(3, '0')}</span>
                        </div>
                        <h3 className="doc-title">{edu.school}</h3>
                        <div className="doc-meta">
                            <span>{edu.degree}</span>
                            {edu.field && <span> • {edu.field}</span>}
                        </div>
                        <div className="doc-body">
                            <span className="doc-date" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{edu.year}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Education;
