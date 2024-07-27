// components/Toast.tsx
import React, { useState, useEffect } from 'react';

type ToastProps = {
  message: string;
  duration?: number;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 p-4 bg-green-500 text-white rounded shadow-lg animate-fadeIn">
      {message}
    </div>
  );
};

export default Toast;
