import React, { useState, useCallback } from 'react';
import './Skeleton.css';

// Generates a silent WAV as base64 for real audio playback
export const SILENT_AUDIO = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';

// Generates a simple tone WAV at given frequency (in base64)
export const generateTone = (frequency = 440, duration = 0.1, sampleRate = 8000) => {
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  // WAV header
  const writeString = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  // Generate sine wave samples
  for (let i = 0; i < numSamples; i++) {
    const sample = Math.sin(2 * Math.PI * frequency * i / sampleRate);
    view.setInt16(44 + i * 2, sample * 8000, true);
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
};

// ===== LAZY IMAGE WITH SKELETON =====
const LazyImage = ({ src, alt, className, style, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const COLORS = ['#D32F2F','#8B0000','#C2185B','#AD1457','#006B3F','#2E7D32','#E65100','#C62828','#F5A623','#7B1FA2','#00ACC1','#C8A45C','#1565C0','#388E3C'];
  const getColor = (t) => {
    const code = (t || '?').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return COLORS[code % COLORS.length];
  };
  const getInitials = (t) => (t || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  if (failed || !src) {
    return (
      <div className={className} style={{ ...style, background: `linear-gradient(135deg, ${getColor(alt)}, ${getColor(alt)}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', overflow: 'hidden' }} {...rest}>
        {getInitials(alt)}
      </div>
    );
  }

  return (
    <div className={className} style={{ ...style, position: 'relative', overflow: 'hidden' }} {...rest}>
      {!loaded && (
        <div className="skeleton" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit' }} />
      )}
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    </div>
  );
};

export { LazyImage };
export default LazyImage;
