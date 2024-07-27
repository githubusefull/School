'use client';
import  { useState, ReactNode, createContext, FC } from 'react';
import Toast from './Toast';

type ToastManagerProps = {
    children: ReactNode;
  };
export const ToastContext = createContext<{
    showToast: (message: string, duration?: number) => void;
}>({
    showToast: () => { },
});

const ToastManager: FC<ToastManagerProps> = ({ children }) => {
    const [toasts, setToasts] = useState<
        { id: number; message: string; duration?: number }[]
    >([]);

    const showToast = (message: string, duration?: number) => {
        const id = Math.random();
        setToasts((prevToasts) => [
            ...prevToasts,
            { id, message, duration },
        ]);
    };

    const removeToast = (id: number) => {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        );
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-5 right-5 z-50 space-y-4">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        duration={toast.duration}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastManager;
