import React, { useState, useEffect, useRef } from 'react';
import './PremiumView.css';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '',
    desc: 'For casual listeners',
    color: '#6B7280',
    features: [
      { text: 'Ad-supported playback', included: true },
      { text: 'Basic audio quality', included: true },
      { text: '6 skips per hour', included: true },
      { text: 'No offline mode', included: true },
      { text: 'High quality audio (320kbps)', included: false },
      { text: 'Unlimited skips', included: false },
      { text: 'Download for offline', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$3.99',
    period: '/month',
    desc: 'For real music lovers',
    color: '#D4875E',
    popular: true,
    features: [
      { text: 'Ad-free experience', included: true },
      { text: 'High quality audio (320kbps)', included: true },
      { text: 'Unlimited skips', included: true },
      { text: 'Download for offline', included: true },
      { text: 'Sleep timer extended', included: true },
      { text: 'Priority support', included: true },
      { text: 'Up to 6 accounts', included: false },
    ],
  },
  {
    id: 'family',
    name: 'Family',
    price: '$6.99',
    period: '/month',
    desc: 'For the whole household',
    color: '#4A9BAA',
    features: [
      { text: 'All Premium features', included: true },
      { text: 'Up to 6 accounts', included: true },
      { text: 'Family playlist sharing', included: true },
      { text: 'Parental controls', included: true },
      { text: 'Ad-free experience', included: true },
      { text: 'High quality audio (320kbps)', included: true },
      { text: 'Unlimited skips & offline', included: true },
    ],
  },
];

const PremiumView = ({ onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [showConfirm, setShowConfirm] = useState(false);
  const [activated, setActivated] = useState(false);
  const panelRef = useRef(null);

  // Focus trap and Escape key handling
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose?.();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = panel.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    panel.addEventListener('keydown', handleKeyDown);
    const closeBtn = panel.querySelector('.premium__close');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 100);

    return () => panel.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const plan = PLANS.find(p => p.id === selectedPlan);

  const handleSubscribe = () => {
    if (selectedPlan === 'free') {
      if (onClose) onClose();
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setActivated(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 2500);
  };

  return (
    <div className="premium">
      <div className="premium__backdrop" onClick={onClose} />

      <div className="premium__panel" ref={panelRef}>
        <button className="premium__close" onClick={onClose} aria-label="Close premium plans">✕</button>

        <div className="premium__header">
          <div className="premium__logo">T</div>
          <h1 className="premium__title">Choose Your <span style={{ color: 'var(--accent)' }}>Plan</span></h1>
          <p className="premium__subtitle">Unlock the full Algerian audio experience. No ads, high quality, offline mode.</p>
        </div>

        {/* Pricing Cards */}
        <div className="premium__plans">
          {PLANS.map(p => {
            const isSelected = selectedPlan === p.id;
            return (
              <div
                key={p.id}
                className={`premium__plan ${isSelected ? 'premium__plan--selected' : ''} ${p.popular ? 'premium__plan--popular' : ''}`}
                onClick={() => setSelectedPlan(p.id)}
                style={{ borderColor: isSelected ? p.color : 'var(--border)' }}
              >
                {p.popular && <span className="premium__popular-badge">Most Popular</span>}

                <div className="premium__plan-header">
                  <span className="premium__plan-name">{p.name}</span>
                  <div className="premium__plan-price">
                    <span className="premium__price-amount">{p.price}</span>
                    {p.period && <span className="premium__price-period">{p.period}</span>}
                  </div>
                  <span className="premium__plan-desc">{p.desc}</span>
                </div>

                <ul className="premium__plan-features">
                  {p.features.map((f, i) => (
                    <li key={i} className={`premium__feature ${f.included ? 'premium__feature--included' : 'premium__feature--excluded'}`}>
                      <span className="premium__feature-icon">{f.included ? '✓' : '✕'}</span>
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`premium__plan-btn ${isSelected ? 'premium__plan-btn--active' : ''}`}
                  style={isSelected ? { background: p.color } : {}}
                  onClick={(e) => { e.stopPropagation(); setSelectedPlan(p.id); }}
                  aria-label={`Select ${p.name} plan`}
                >
                  {p.price === '$0' ? 'Get Started' : `Subscribe — ${p.price}${p.period}`}
                </button>
              </div>
            );
          })}
        </div>

        <p className="premium__footnote">Cancel anytime. No commitment. Secure payment.</p>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="premium__modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="premium__modal" onClick={e => e.stopPropagation()}>
            <div className="premium__modal-check">✓</div>
            <h2 className="premium__modal-title">Confirm Subscription</h2>
            <p className="premium__modal-text">
              You are subscribing to <strong>{plan?.name}</strong> for <strong>{plan?.price}{plan?.period}</strong>.
            </p>
            <div className="premium__modal-features-preview">
              {plan?.features.filter(f => f.included).slice(0, 4).map((f, i) => (
                <div key={i} className="premium__modal-feature-item">
                  <span className="premium__modal-feature-check">✓</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
            <div className="premium__modal-actions">
              <button className="premium__modal-btn premium__modal-btn--cancel" onClick={() => setShowConfirm(false)} aria-label="Cancel subscription">Cancel</button>
              <button className="premium__modal-btn premium__modal-btn--confirm" onClick={handleConfirm} style={{ background: plan?.color }} aria-label="Confirm and pay">
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {activated && (
        <div className="premium__toast">
          <div className="premium__toast-icon">🎉</div>
          <div className="premium__toast-text">
            <strong>Welcome to {plan?.name}!</strong>
            <span>Your premium experience is now unlocked.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumView;
