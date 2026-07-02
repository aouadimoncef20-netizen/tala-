import React, { useState, useEffect, useRef } from 'react';
import './ShareMenu.css';

const ShareMenu = ({ track, onClose, onToast }) => {
  const [toastMsg, setToastMsg] = useState(null);
  const menuRef = useRef(null);

  const trackTitle = track?.title || 'Tala Track';
  const trackArtist = track?.artist || track?.podcastName || 'Tala Artist';
  const shareText = `🎵 Listening to "${trackTitle}" by ${trackArtist} on Tala — Algerian Audio Platform`;
  const shareUrl = window.location.href;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setToastMsg('Copied to clipboard');
      if (onToast) onToast('info', 'Copied to clipboard', shareText);
      setTimeout(() => { setToastMsg(null); onClose(); }, 800);
    } catch {
      if (onToast) onToast('error', 'Copy failed', 'Could not copy to clipboard');
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodedText}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <>
      <div className="share-menu-overlay" onClick={onClose} />
      <div className="share-menu" ref={menuRef}>
        <div className="share-menu__header">Share</div>

        <button className="share-menu__option" onClick={handleCopyLink}>
          <span className="share-menu__icon share-menu__icon--link">
            {toastMsg ? '✓' : '🔗'}
          </span>
          <span className="share-menu__label">{toastMsg || 'Copy Link'}</span>
        </button>

        <button className="share-menu__option" onClick={handleWhatsApp}>
          <span className="share-menu__icon share-menu__icon--whatsapp">📱</span>
          <span className="share-menu__label">WhatsApp</span>
        </button>

        <button className="share-menu__option" onClick={handleTwitter}>
          <span className="share-menu__icon share-menu__icon--twitter">🐦</span>
          <span className="share-menu__label">Twitter</span>
        </button>

        <button className="share-menu__option" onClick={handleFacebook}>
          <span className="share-menu__icon share-menu__icon--facebook">📘</span>
          <span className="share-menu__label">Facebook</span>
        </button>

        <button className="share-menu__option" onClick={handleTelegram}>
          <span className="share-menu__icon share-menu__icon--telegram">✈️</span>
          <span className="share-menu__label">Telegram</span>
        </button>
      </div>
    </>
  );
};

export default ShareMenu;
