import React, { useState } from 'react';
import './PremiumView.css';

const PLANS = [
  {
    id: 'basic',
    name: 'Tala Free',
    price: '0',
    period: 'forever',
    desc: 'For casual listeners',
    color: '#6B7280',
    features: ['Ad-supported playback', 'Basic audio quality', 'Skip limit: 6 per hour', 'No offline mode'],
    disabled: [],
  },
  {
    id: 'premium',
    name: 'Tala Premium',
    price: '499',
    period: '/month',
    desc: 'For real music lovers',
    color: '#D4875E',
    popular: true,
    features: ['Ad-free experience', 'High quality audio (320kbps)', 'Unlimited skips', 'Download for offline', 'Sleep timer extended', 'Priority support'],
    disabled: ['Ad-free experience', 'High quality audio (320kbps)', 'Unlimited skips', 'Download for offline'],
  },
  {
    id: 'family',
    name: 'Tala Family',
    price: '899',
    period: '/month',
    desc: 'For the whole household',
    color: '#4A9BAA',
    features: ['Everything in Premium', 'Up to 6 accounts', 'Family playlist sharing', 'Parental controls', 'Dedicated Family Mix'],
    disabled: ['Everything in Premium', 'Up to 6 accounts', 'Family playlist sharing', 'Parental controls'],
  },
  {
    id: 'student',
    name: 'Tala Student',
    price: '249',
    period: '/month',
    desc: '50% off for students',
    color: '#C9A04A',
    features: ['Everything in Premium', 'Verified student discount', 'Valid for 48 months', 'Includes Hiberate access'],
    disabled: ['Everything in Premium', 'Verified student discount', 'Valid for 48 months'],
  },
];

const PremiumView = ({ onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [showConfirm, setShowConfirm] = useState(false);
  const [activated, setActivated] = useState(false);

  const plan = PLANS.find(p => p.id === selectedPlan);

  const handleSubscribe = () => {
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
      {/* Backdrop */}
      <div className="premium__backdrop" onClick={onClose} />

      {/* Panel */}
      <div className="premium__panel">
        {/* Close */}
        <button className="premium__close" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="premium__header">
          <div className="premium__logo">A</div>
          <h1 className="premium__title">Upgrade to <span style={{ color: 'var(--accent)' }}>Premium</span></h1>
          <p className="premium__subtitle">Unlock the full Algerian audio experience. No ads, high quality, offline mode.</p>
        </div>

        {/* Plans */}
        <div className="premium__plans">
          {PLANS.map(p => (
            <div
              key={p.id}
              className={`premium__plan ${selectedPlan === p.id ? 'premium__plan--selected' : ''} ${p.popular ? 'premium__plan--popular' : ''}`}
              onClick={() => setSelectedPlan(p.id)}
              style={{ borderColor: selectedPlan === p.id ? p.color : 'var(--border)' }}
            >
              {p.popular && <span className="premium__popular-badge">Most Popular</span>}
              <div className="premium__plan-header">
                <span className="premium__plan-name">{p.name}</span>
                <div className="premium__plan-price">
                  <span className="premium__price-amount">{p.price === '0' ? 'Free' : `${p.price} DA`}</span>
                  <span className="premium__price-period">{p.period}</span>
                </div>
                <span className="premium__plan-desc">{p.desc}</span>
              </div>
              <ul className="premium__plan-features">
                {p.features.map((f, i) => (
                  <li key={i} className={`premium__feature ${p.disabled?.includes(f) ? '' : 'premium__feature--disabled'}`}>
                    <span className="premium__feature-icon">{p.disabled?.includes(f) ? '✓' : '○'}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Subscribe Button */}
        <button className="premium__subscribe" onClick={handleSubscribe} style={{ background: plan?.color }}>
          {plan?.price === '0' ? 'Keep Free' : `Subscribe — ${plan?.price} DA${plan?.period}`}
        </button>
        <p className="premium__footnote">Cancel anytime. No commitment.</p>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="premium__modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="premium__modal" onClick={e => e.stopPropagation()}>
            <div className="premium__modal-check">✓</div>
            <h2 className="premium__modal-title">Confirm Subscription</h2>
            <p className="premium__modal-text">
              You are subscribing to <strong>{plan?.name}</strong> for <strong>{plan?.price} DA{plan?.period}</strong>.
            </p>
            <div className="premium__modal-actions">
              <button className="premium__modal-btn premium__modal-btn--cancel" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="premium__modal-btn premium__modal-btn--confirm" onClick={handleConfirm} style={{ background: plan?.color }}>
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
            <span>Your peaceful audio experience is now unlocked.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumView;
