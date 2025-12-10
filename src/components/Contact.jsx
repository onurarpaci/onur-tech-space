import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';
import { supabase } from '../services/supabase';
import Typewriter from './Typewriter';


const Contact = () => {
    // Steps: 'boot', 'name', 'email', 'message', 'sending', 'success', 'error', 'partial_success'
    const [step, setStep] = useState('boot');
    const [history, setHistory] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errorLogs, setErrorLogs] = useState([]);

    // UI State for Typing
    const [isTyping, setIsTyping] = useState(true); // Start true for boot

    // Auto-scroll to bottom
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, step, isTyping, errorLogs]);

    // Focus input when typing is done
    useEffect(() => {
        if (!isTyping && inputRef.current && (step === 'name' || step === 'email' || step === 'message')) {
            inputRef.current.focus();
        }
    }, [isTyping, step]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            processInput();
        }
    };

    const processInput = () => {
        const value = inputValue.trim();

        // Validation for empty input
        if (!value && step !== 'confirm') return;

        // Construct history item for current step
        const newHistoryItem = {
            step: step,
            prompt: getPromptForStep(step),
            value: value
        };

        // Specific Validation for Email
        if (step === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {

                setHistory([...history,
                { prompt: getPromptForStep(step), value: value },
                { prompt: "[ SYSTEM ] ERROR:", value: "INVALID_EMAIL_FORMAT", error: true }
                ]);
                setInputValue('');
                setIsTyping(true); // Retype the error prompt if we want, or just the next prompt. 
                // Actually, for history we don't animate. We just animate active prompt.
                // Resetting isTyping to true will re-trigger animation for the CURRENT step prompt
                return;
            }
        }

        setHistory([...history, newHistoryItem]);
        setInputValue('');
        setIsTyping(true); // Start typing next prompt

        // Move to next step
        if (step === 'name') {
            setFormData({ ...formData, name: value });
            setStep('email');
        } else if (step === 'email') {
            setFormData({ ...formData, email: value });
            setStep('message');
        } else if (step === 'message') {
            setFormData({ ...formData, message: value });
            submitForm({ ...formData, message: value });
        }
    };

    const submitForm = async (data) => {
        setStep('sending');
        setIsTyping(true);

        try {
            // Using Promise.allSettled so one failure doesn't block the other
            const results = await Promise.allSettled([
                fetch("https://formsubmit.co/ajax/onurarpaci89@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        message: data.message,
                        _subject: "New Message from Portfolio Terminal"
                    })
                }),
                supabase.from('contact_messages').insert([
                    { name: data.name, email: data.email, message: data.message }
                ])
            ]);

            const [emailResult, dbResult] = results;

            // Process Email Result
            let emailStatus = "FAILED";
            let emailError = "";
            if (emailResult.status === 'fulfilled' && emailResult.value.ok) {
                emailStatus = "SENT";
            } else {
                emailStatus = "FAILED";
                emailError = emailResult.status === 'rejected' ? emailResult.reason : "API Error";
            }

            // Process DB Result
            let dbStatus = "FAILED";
            let dbError = "";
            if (dbResult.status === 'fulfilled' && !dbResult.value.error) {
                dbStatus = "SAVED";
            } else {
                dbStatus = "FAILED";
                dbError = dbResult.value?.error?.message || dbResult.reason || "DB Error";
            }

            if (emailStatus === "SENT" || dbStatus === "SAVED") {
                // Determine overall outcome for UI
                if (emailStatus === "FAILED" || dbStatus === "FAILED") {
                    setStep('partial_success');
                    // Add details to history for display
                    setHistory(prev => [...prev,
                    { prompt: "[ SYSTEM ] EMAIL_STATUS:", value: emailStatus, error: emailError },
                    { prompt: "[ SYSTEM ] DB_STATUS:", value: dbStatus, error: dbError }
                    ]);
                } else {
                    setStep('success');
                }
            } else {
                // Both Failed
                setErrorLogs([
                    `EMAIL: ${typeof emailError === 'string' ? emailError : JSON.stringify(emailError)}`,
                    `DB: ${typeof dbError === 'string' ? dbError : JSON.stringify(dbError)}`
                ]);
                setStep('error');
            }
            setIsTyping(true); // Animate result message

        } catch (error) {
            console.error("Critical Transmission Error:", error);
            setErrorLogs([
                `CRITICAL: ${error.message || "Unknown Application Error"}`,
                `DETAILS: Check Browser Console (F12)`
            ]);
            setStep('error');
            setIsTyping(true);
        }
    };

    const getPromptForStep = (currentStep) => {
        switch (currentStep) {
            case 'name': return '? INPUT_SENDER_IDENTITY (Name):';
            case 'email': return '? INPUT_RETURN_ADDRESS (Email):';
            case 'message': return '? INPUT_DATA_PAYLOAD (Message):';
            default: return '';
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1 className="contact-title">/bin/contact_admin</h1>
                <p className="contact-subtitle">Secure Messaging Protocol v1.0</p>
            </div>

            <div className="console-wrapper" onClick={() => inputRef.current?.focus()}>
                <div className="console-bezel">
                    <span>root@oa-systems:~</span>
                    <span>bash</span>
                </div>

                <div className="console-body">
                    {/* Interactive Boot Line */}
                    <div className="cmd-prompt">
                        <span style={{ color: '#10b981' }}>root@oa-systems</span>:<span style={{ color: '#569cd6' }}>~</span>$ {step === 'boot' ? (
                            <Typewriter
                                text="./initiate_contact.sh"
                                speed={40}
                                onComplete={() => {
                                    setTimeout(() => {
                                        setStep('name');
                                        setIsTyping(true);
                                    }, 500);
                                }}
                            />
                        ) : (
                            "./initiate_contact.sh"
                        )}
                        {step === 'boot' && <span className="blinking-cursor">█</span>}
                    </div>

                    {/* Terminal Output */}
                    {step !== 'boot' && (
                        <div className="terminal-output">
                            {/* History of previous commands (Static) */}
                            {history.map((item, idx) => (
                                <div key={idx} className="history-item">
                                    <div className="cmd-prompt">{item.prompt}</div>
                                    <div className="cmd-line">
                                        <span className="cmd-arrow">{'>'}</span>
                                        <span className="history-value">{item.value}</span>
                                    </div>
                                    {/* If item has error/extra info appended in history */}
                                    {item.error && <div className="system-msg error" style={{ marginBottom: '0.5rem' }}>{item.prompt} {item.value}</div>}
                                    {/* Small hack: history items are usually prompt+value. Specific Error objects might need custom rendering if we put them in history array directly like in processInput*/}
                                </div>
                            ))}

                            {/* Active Input Line */}
                            {(step === 'name' || step === 'email' || step === 'message') && (
                                <div className="active-input-group">
                                    <div className="cmd-prompt">
                                        {/* Always re-render Typewriter when step changes */}
                                        <Typewriter
                                            key={step} // Key forces re-mount on step change
                                            text={getPromptForStep(step)}
                                            speed={20}
                                            onComplete={() => setIsTyping(false)}
                                        />
                                    </div>
                                    {!isTyping && (
                                        <div className="cmd-line">
                                            <span className="cmd-arrow">{'>'}</span>
                                            <input
                                                ref={inputRef}
                                                type={step === 'email' ? 'email' : 'text'}
                                                className="terminal-input"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                autoComplete="off"
                                                spellCheck="false"
                                                autoFocus
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Loading State */}
                            {step === 'sending' && (
                                <div className="system-msg">
                                    <Typewriter text="[ SYSTEM ] ENCRYPTING_PAYLOAD... OK" speed={20} /><br />
                                    <Typewriter text="[ SYSTEM ] ESTABLISHING_UPLINK..." speed={30} /><br />
                                    <div className="loading-spinner" style={{ marginTop: '0.5rem' }}>TRANSMITTING...</div>
                                </div>
                            )}

                            {/* Success State */}
                            {step === 'success' && (
                                <div className="system-msg success">
                                    <Typewriter text="[ SUCCESS ] PACKET_DELIVERED (200 OK)" speed={20} /><br />
                                    <Typewriter text="[ SYSTEM ] CONNECTION_TERMINATED" speed={20} />
                                    <br />
                                    <div className="cmd-prompt" style={{ marginTop: '1rem' }}>
                                        <span style={{ color: '#10b981' }}>root@oa-systems</span>:<span style={{ color: '#569cd6' }}>~</span>$ <span className="blinking-cursor">_</span>
                                    </div>
                                </div>
                            )}

                            {/* Partial Success State */}
                            {step === 'partial_success' && (
                                <div className="system-msg icon-warning">
                                    <Typewriter text="[ WARNING ] TRANSMISSION_INCOMPLETE" speed={30} />
                                    <div className="cmd-prompt" style={{ marginTop: '1rem' }}>
                                        <span style={{ color: '#10b981' }}>root@oa-systems</span>:<span style={{ color: '#569cd6' }}>~</span>$ <span className="blinking-cursor">_</span>
                                    </div>
                                </div>
                            )}

                            {/* Error State */}
                            {step === 'error' && (
                                <div className="system-msg error">
                                    <Typewriter text="[ ERROR ] TRANSMISSION_FAILED (500)" speed={20} />
                                    <div style={{ marginTop: '0.8rem', opacity: 0.9, fontSize: '0.9rem', color: '#ff6b6b' }}>
                                        {errorLogs.map((log, i) => (
                                            <div key={i} style={{ marginBottom: '0.3rem' }}>
                                                &gt; <Typewriter text={log} speed={10} />
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: '1rem', color: '#888' }}>
                                        <Typewriter text="[ SYSTEM ] PLEASE_REVIEW_SETUP" speed={20} />
                                    </div>
                                </div>
                            )}

                            <div ref={bottomRef} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
