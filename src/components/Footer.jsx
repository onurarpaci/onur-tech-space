import React from 'react';
import { profile } from '../data/profile';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="debug-console">
            <div className="console-column col-left">
                <div className="console-header">// USER_SESSION</div>
                <div className="console-row">
                    <span className="key">USER:</span>
                    <span className="value">{profile.name}</span>
                </div>
                <div className="console-row">
                    <span className="key">LANG:</span>
                    <span className="value">TR (Native), EN (Pro), DE (Ltd)</span>
                </div>
            </div>

            <div className="console-column col-center">
                <div className="console-header">// CERTIFICATIONS_LOADED</div>
                {profile.certifications.slice(0, 2).map((cert, idx) => (
                    <div key={idx} className="console-row">
                        <span className="prompt">{'>'}</span>
                        <span className="value">{cert}</span>
                    </div>
                ))}
            </div>

            <div className="console-column col-right">
                <div className="console-header">// COMM_CHANNELS</div>
                <div className="console-row">
                    <span className="prompt">{'>'}</span>
                    <a href={profile.social.email} className="cmd-link">POST /message</a>
                </div>
                <div className="console-row">
                    <span className="prompt">{'>'}</span>
                    <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="cmd-link">GET /linkedin/profile</a>
                </div>
            </div>

            <div className="console-bar-bottom">
                <span>STATUS: STABLE</span>
                <span>V5.0.1</span>
            </div>
        </footer>
    );
};

export default Footer;
