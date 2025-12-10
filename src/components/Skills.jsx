import React, { useState, useEffect } from 'react';
import { profile } from '../data/profile';
import './Experience.css'; // Reuse Experience styles
import Typewriter from './Typewriter';

const Skills = () => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [];
        timers.push(setTimeout(() => setStage(1), 100));
        timers.push(setTimeout(() => setStage(2), 800));

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="xp-page-container">
            <div className="xp-header-section">
                <h1 className="xp-main-title">
                    <Typewriter text="TECHNICAL INFRASTRUCTURE" speed={30} cursor />
                </h1>
                <p className={`xp-subtitle fade-in ${stage >= 1 ? 'visible' : ''}`}>Core Competencies & Certifications</p>
            </div>

            {/* SKILLS MODULES */}
            <div className={`xp-divider-code fade-in ${stage >= 2 ? 'visible' : ''}`}>
                // SKILL_MODULES
            </div>

            <div className="infra-grid">
                {profile.skillCategories && Object.entries(profile.skillCategories).map(([category, items], idx) => (
                    <div key={category} className={`infra-module fade-in ${stage >= 2 ? 'visible' : ''}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                        <div className="module-header">
                            <span className="module-icon">[]</span>
                            <span className="module-title">{category.toUpperCase()}</span>
                        </div>
                        <div className="module-body">
                            {items.map((skill, skIdx) => (
                                <div key={skIdx} className="infra-chip">
                                    <span className="chip-prefix">dbo.</span>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* CERTIFICATIONS */}
            {profile.certifications && (
                <>
                    <div className={`xp-divider-code fade-in ${stage >= 2 ? 'visible' : ''}`} style={{ marginTop: '4rem', transitionDelay: '0.5s' }}>
                        // CERTIFICATIONS
                    </div>
                    <div className={`infra-grid fade-in ${stage >= 2 ? 'visible' : ''}`} style={{ transitionDelay: '0.7s' }}>
                        <div className="infra-module" style={{ gridColumn: '1 / -1' }}>
                            <div className="module-header">
                                <span className="module-icon">✓</span>
                                <span className="module-title">VERIFIED CREDENTIALS</span>
                            </div>
                            <div className="module-body">
                                {profile.certifications.map((cert, idx) => (
                                    <div key={idx} className="infra-chip">
                                        <span className="chip-prefix">cert.</span>
                                        {cert}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* LANGUAGES */}
            {profile.languages && (
                <>
                    <div className={`xp-divider-code fade-in ${stage >= 2 ? 'visible' : ''}`} style={{ marginTop: '4rem', transitionDelay: '0.9s' }}>
                        // LANGUAGE_PROTOCOLS
                    </div>
                    <div className={`infra-grid fade-in ${stage >= 2 ? 'visible' : ''}`} style={{ transitionDelay: '1.1s' }}>
                        {profile.languages.map((lang, idx) => (
                            <div key={idx} className="infra-module">
                                <div className="module-header">
                                    <span className="module-icon">🌐</span>
                                    <span className="module-title">{lang.language.toUpperCase()}</span>
                                </div>
                                <div className="module-body">
                                    <div className="infra-chip" style={{ width: '100%', justifyContent: 'center' }}>
                                        {lang.level}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Skills;
