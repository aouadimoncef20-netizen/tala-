import React, { useState } from 'react';
import './ShareButton.css';

const ShareButton = ({ track, artist, type = 'track', onToast }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = `🎵 Listening to "${track}" by ${artist} on Tala — Algerian Audio Platform`;

    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Tala', text, url: window.location.href });
        return;
      } catch {}
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (onToast) onToast('success', 'Copied to clipboard', text);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      if (onToast) onToast('error', 'Share failed', 'Could not copy to clipboard');
    }
  };

  return (
    <button className="share-btn" onClick={handleShare} title="Share">
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path d="M18 8a3 3 0 10-2.98-2.56l-7.34 4.2a3 3 0 100 4.72l7.35 4.2a3 3 0 10.63-1.1l-7.35-4.2a3 3 0 000-2.52l7.35-4.2A3 3 0 0018 8z" fill="currentColor"/>
      </svg>
      <span>{copied ? 'Copied!' : 'Share'}</span>
    </button>
  );
};

export default ShareButton;
