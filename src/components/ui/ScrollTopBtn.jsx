import React, { useState, useEffect } from 'react';

const ScrollTopBtn = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (!isVisible) return null;

    return (
        <button 
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.8)',
                color: 'var(--primary-color)',
                border: '2px solid var(--primary-color)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)'
            }}
            onMouseOver={(e) => e.target.style.background = 'var(--primary-color)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(0,0,0,0.8)'}
        >
            ↑
        </button>
    );
};

export default ScrollTopBtn;
