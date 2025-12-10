import React, { useState, useEffect } from 'react';
import { profile } from '../data/profile';
import './Experience.css';
import Typewriter from './Typewriter';

const Experience = () => {
    const [stage, setStage] = useState(0);

    // Pipeline Nodes mapping
    // Node 1: Origin (Comdata) -> ID 3
    // Node 2: Logic (Logiwa V1) -> ID 2
    // Node 3: Integration (Logiwa V2) -> ID 1
    // We reverse the array to get Chronological Order (Oldest -> Newest) strictly for the Visual Pipeline
    const pipelineData = [
        profile.experience.find(e => e.id === 3),
        profile.experience.find(e => e.id === 2),
        profile.experience.find(e => e.id === 1)
    ].filter(Boolean);

    useEffect(() => {
        // Trigger animations over time
        const timers = [];
        timers.push(setTimeout(() => setStage(1), 100)); // Title starts immediate
        // Pipeline nodes stagger
        pipelineData.forEach((_, idx) => {
            timers.push(setTimeout(() => {
                setStage(prev => Math.max(prev, 2 + idx));
            }, 800 + (idx * 600)));
        });

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="xp-page-container">
            <div className="xp-header-section">
                <h1 className="xp-main-title">
                    <Typewriter text="SYSTEM ARCHITECTURE" speed={30} cursor />
                </h1>
                <p className={`xp-subtitle fade-in ${stage >= 1 ? 'visible' : ''}`}>Infrastructure & Protocol Timeline</p>
            </div>

            {/* PHASE 1: THE PIPELINE (EXPERIENCE) */}
            <div className="pipeline-container">
                <div className={`pipeline-track fade-in ${stage >= 2 ? 'visible' : ''}`}></div>

                {pipelineData.map((node, index) => (
                    <div key={node.id} className={`pipeline-node node-${index + 1} fade-in ${stage >= 2 + index ? 'visible' : ''}`}>
                        <div className="node-marker">
                            <div className="marker-dot"></div>
                            {index < 2 && <div className="connection-line-label">
                                {index === 0 ? "TRANSFORMATION >>" : "UPGRADE >>"}
                            </div>}
                        </div>

                        <div className="server-box">
                            <div className="server-header">
                                <span className="server-icon">SERVER:</span>
                                <span className="server-name">{node.company.toUpperCase()}</span>
                            </div>
                            <div className="server-body">
                                <h3 className="server-role">{node.role}</h3>
                                <div className="server-meta">{node.period}</div>
                                <p className="server-desc">{node.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PHASE 2: INFRASTRUCTURE (SKILLS) */}
            <div className={`xp-divider-code fade-in ${stage >= 5 ? 'visible' : ''}`} style={{ marginTop: '4rem' }}>
                // INFRASTRUCTURE_COMPONENTS
            </div>

            <div className="infra-grid">
                {profile.skillCategories && Object.entries(profile.skillCategories).map(([category, items], idx) => (
                    <div key={category} className={`infra-module fade-in ${stage >= 5 ? 'visible' : ''}`} style={{ transitionDelay: `${idx * 100}ms` }}>
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
        </div>
    );
};
export default Experience;
