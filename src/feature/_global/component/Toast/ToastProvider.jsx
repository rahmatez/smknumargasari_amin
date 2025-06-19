import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = Date.now(); // Unique ID
        setToasts((prev) => [...prev, { id, message, type }]);
        // Auto-remove toast after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="toast toast-top toast-center z-50">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`alert text-white`} style={{ backgroundColor: toast.type === 'error' ? '#FF5630' : '#22C55E' }}>
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
