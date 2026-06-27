import React, { useEffect } from 'react';
import './Toast.css';

const TOAST_TYPES = {
  success: { icon: '✓', color: '#5AA87A' },
  liked: { icon: '♥', color: '#D4875E' },
  added: { icon: '+', color: '#4A9BAA' },
  error: { icon: '✕', color: '#D32F2F' },
  info: { icon: '◌', color: '#9BA3AF' },
};

const Toast = ({ toasts, onRemove }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), toast.duration || 3000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const type = TOAST_TYPES[toast.type] || TOAST_TYPES.info;

  return (
    <div className="toast" style={{ borderLeftColor: type.color }}>
      <span className="toast__icon" style={{ color: type.color }}>{type.icon}</span>
      <div className="toast__content">
        <span className="toast__title">{toast.title}</span>
        {toast.message && <span className="toast__message">{toast.message}</span>}
      </div>
      <button className="toast__close" onClick={() => onRemove(toast.id)}>✕</button>
    </div>
  );
};

// Helper to create a unique ID
export const createToast = (type, title, message, duration = 3000) => ({
  id: Date.now() + Math.random(),
  type,
  title,
  message,
  duration,
});

export default Toast;
