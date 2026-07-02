import React, { useEffect, useState } from 'react';
import useUIStore from '../stores/uiStore';
import './Toast.css';

const TOAST_TYPES = {
  liked: { icon: '❤️', color: '#5AA87A' },
  added: { icon: '🎵', color: '#4A9BAA' },
  removed: { icon: '❌', color: '#D32F2F' },
  info: { icon: 'ℹ️', color: '#4285F4' },
  success: { icon: '✓', color: '#5AA87A' },
  error: { icon: '✕', color: '#D32F2F' },
};

const Toast = () => {
  const toasts = useUIStore(s => s.toasts);
  const removeToast = useUIStore(s => s.removeToast);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const [exiting, setExiting] = useState(false);
  const duration = toast.duration || 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onRemove]);

  const type = TOAST_TYPES[toast.type] || TOAST_TYPES.info;

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  return (
    <div
      className={`toast ${exiting ? 'toast--exiting' : ''}`}
      style={{ borderLeftColor: type.color }}
    >
      <span className={`toast__icon toast__icon--${toast.type === 'success' ? 'info' : toast.type || 'info'}`}>
        {type.icon}
      </span>
      <div className="toast__content">
        <span className="toast__title">{toast.title}</span>
        {toast.message && <span className="toast__message">{toast.message}</span>}
      </div>
      <button className="toast__close" onClick={handleClose}>✕</button>
      {/* Timer bar */}
      <div
        className="toast__timer"
        style={{
          color: type.color,
          animationDuration: `${duration}ms`,
          animationPlayState: exiting ? 'paused' : 'running',
        }}
      />
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
