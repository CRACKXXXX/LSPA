import React, { useEffect, useState } from 'react';
import './AppLoader.css';

const AppLoader = ({ onComplete }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            if (onComplete) onComplete();
        }, 1500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!loading) return null;

    return (
        <div className="app-loader">
            <div className="loader-content">
                <div className="loader-logo-circle">
                    <span className="loader-initial">L</span>
                </div>
                <div className="loader-text">
                    LOADING LOS SANTOS...
                </div>
                <div className="loader-bar">
                    <div className="loader-progress"></div>
                </div>
            </div>
        </div>
    );
};

export default AppLoader;
