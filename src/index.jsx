import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App';
import useAuthStore from './stores/authStore';
import reportWebVitals from './reportWebVitals';

// Auth guard component
const AuthGate = ({ children }) => {
  const { user, loading, init } = useAuthStore();

  useEffect(() => { init(); }, [init]);

  if (loading) {
    return (
      <div className="h-screen bg-[#0C0F14] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-xl bg-[#D4875E] flex items-center justify-center text-[#0C0F14] font-extrabold text-2xl mx-auto mb-4 animate-pulse" style={{ boxShadow: '0 0 30px rgba(212,135,94,0.3)' }}>T</div>
          <div className="text-sm text-[var(--text-subdued)]">Loading...</div>
        </div>
      </div>
    );
  }

  // Lazy load LoginPage
  const LoginPage = React.lazy(() => import('./components/LoginPage'));

  return (
    <React.Suspense fallback={
      <div className="h-screen bg-[#0C0F14] flex items-center justify-center">
        <div className="text-sm text-[var(--text-subdued)]">Loading...</div>
      </div>
    }>
      {user ? children : <LoginPage />}
    </React.Suspense>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthGate>
      <App />
    </AuthGate>
  </React.StrictMode>
);

reportWebVitals();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
