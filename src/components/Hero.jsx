import React, { useState, useEffect } from 'react';
import { profile } from '../data/profile';
import './Hero.css';
import Typewriter from './Typewriter';

const Hero = () => {
    // Stage controls for staggered animations
    const [stage, setStage] = useState(0);

    return (
        <div className="hero-container">
            <div className="hero-processor-node">
                <div className="node-header">
                    <span className="node-id">
                        <Typewriter text="NODE_ID: CENTRAL_PROCESSOR" speed={20} onComplete={() => setStage(1)} />
                    </span>
                    <span className={`node-status fade-in ${stage >= 1 ? 'visible' : ''}`}>STATUS: KERNEL_ACTIVE</span>
                </div>

                <div className="node-content">
                    <h1 className="processor-title">
                        {stage >= 1 && (
                            <Typewriter
                                text="INTEGRATION ARCHITECT"
                                speed={40}
                                delay={200}
                                onComplete={() => setStage(2)}
                                cursor
                            />
                        )}
                        {!stage && <span style={{ opacity: 0 }}>INTEGRATION ARCHITECT</span>} {/* Placeholder for layout stability */}
                    </h1>

                    <div className={`processor-divider expand-width ${stage >= 2 ? 'visible' : ''}`}></div>

                    <p className={`processor-subtitle fade-in ${stage >= 2 ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
                        Bridging SaaS Platforms & External Systems
                    </p>

                    <div className={`tech-specs fade-in ${stage >= 2 ? 'visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
                        <div className="spec-row">
                            <span className="spec-label">PRIMARY FUNCTIONS:</span>
                            <span className="spec-value">API Engineering, EDI Implementation, Data Transformation</span>
                        </div>
                        <div className="spec-row">
                            <span className="spec-label">CURRENT STATE:</span>
                            <span className="spec-value">{profile.role} @ Logiwa</span>
                        </div>
                    </div>

                    <div className={`hero-actions fade-in ${stage >= 2 ? 'visible' : ''}`} style={{ transitionDelay: '0.9s' }}>
                        <a href="/resume.html" target="_blank" className="btn btn-primary">[ EXECUTE DOWNLOAD (RESUME.PDF) ]</a>
                    </div>
                </div>

                <div className="node-footer">
                    <span className={`fade-in ${stage >= 3 ? 'visible' : ''}`}>UPTIME: 5+ YEARS</span>
                    <span className={`fade-in ${stage >= 3 ? 'visible' : ''}`}>MEMORY: SQL, API, EDI</span>
                </div>
            </div>
        </div>
    );
};

export default Hero;
