import React, { useState, useEffect } from 'react';

const Typewriter = ({
    text,
    speed = 30,
    onComplete,
    className,
    cursor = false,
    delay = 0
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        let timeoutId;

        if (delay > 0) {
            timeoutId = setTimeout(() => {
                setIsStarted(true);
            }, delay);
        } else {
            setIsStarted(true);
        }

        return () => clearTimeout(timeoutId);
    }, [delay]);

    useEffect(() => {
        if (!isStarted) return;

        let i = 0;
        setDisplayedText('');
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed, isStarted]); // Added isStarted dependency

    return (
        <span className={className}>
            {displayedText}
            {cursor && <span className="blinking-cursor">█</span>}
        </span>
    );
};

export default Typewriter;
