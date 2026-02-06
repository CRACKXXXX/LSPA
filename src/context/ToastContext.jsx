import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import './Toast.css';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    
    // USAMOS REF PARA EL BLOQUEO (Síncrono e Inmediato)
    // useRef allows reading/writing immediately without waiting for re-renders
    const lastToastRef = useRef({ message: '', time: 0 });

    const showToast = useCallback((type, message, duration = 3000) => {
        const now = Date.now();
        const DUPLICATE_DELAY = 1500; // 1.5 seconds cooldown

        // LOCKING LOGIC:
        // If message is identical to the last one AND it's been less than 1.5s -> BLOCK
        if (
            message === lastToastRef.current.message && 
            now - lastToastRef.current.time < DUPLICATE_DELAY
        ) {
            console.warn("Toast duplicado bloqueado:", message);
            return; // Stop execution immediately
        }

        // Update reference IMMEDIATELY (Synchronous)
        lastToastRef.current = { message, time: now };

        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, type, message }]); 

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast-message toast-${toast.type} slide-in`}>
                        <div className="toast-icon">
                            {toast.type === 'success' && '✅'}
                            {toast.type === 'error' && '❌'}
                            {toast.type === 'info' && 'ℹ️'}
                            {toast.type === 'warning' && '⚠️'}
                        </div>
                        <div className="toast-content">{toast.message}</div>
                        <button className="toast-close" onClick={() => removeToast(toast.id)}>×</button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
