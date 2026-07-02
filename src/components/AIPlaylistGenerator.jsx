import React, { useState, useMemo } from 'react';
import { createPlaylist, addTrackToPlaylist } from '../data/playlist-store';
import { recordPlaylist } from '../data/gamification-store';
import './AIPlaylistGenerator.css';

// Simulated track pool for AI generation
const TRACK_POOLS = {
  rai90s: [
    { title: 'Didi', artist: 'Cheb Khaled', duration: '4:18' },
    { title: 'Aicha', artist: 'Cheb Khaled', duration: '5:04' },
    { title: 'Wahran', artist: 'Cheb Khaled', duration: '3:42' },
    { title: 'N\'ssa N\'ssa', artist: 'Cheb Khaled', duration: '4:36' },
    { title: 'Ya Lella', artist: 'Cheb Hasni', duration: '5:22' },
    { title: 'Tal Ghyabek', artist: 'Cheb Hasni', duration: '3:58' },
    { title: 'Rohou', artist: 'Cheb Hasni', duration: '4:48' },
    { title: 'Merci', artist: 'Cheb Hasni', duration: '3:34' },
    { title: 'El Harraga', artist: 'Cheb Mami', duration: '5:44' },
    { title: 'Sahraoui', artist: 'Cheb Mami', duration: '4:22' },
    { title: 'Hada Rayek', artist: 'Cheb Zahouania', duration: '3:48' },
    { title: 'Liberte', artist: 'Cheb Khaled', duration: '4:56' },
  ],
  chaabi: [
    { title: 'Sanaat El Khoubz', artist: 'El Anka', duration: '6:12' },
    { title: 'El Hamdoulah', artist: 'El Anka', duration: '4:28' },
    { title: 'Ya Rayah', artist: 'Dahmane El Harrachi', duration: '5:38' },
    { title: 'Ya Mahla', artist: 'Dahmane El Harrachi', duration: '4:14' },
    { title: 'Achki', artist: 'Amar Ezzahi', duration: '3:52' },
    { title: 'El Kaoui', artist: 'Amar Ezzahi', duration: '5:18' },
    { title: 'Sanaat', artist: 'Boudjema El Ankis', duration: '4:48' },
    { title: 'Ya Rayess', artist: 'El Anka', duration: '3:42' },
    { title: 'Mizana', artist: 'Amar Ezzahi', duration: '5:04' },
    { title: 'Dounia Zina', artist: 'Boudjema El Ankis', duration: '3:58' },
    { title: 'Nostalgie', artist: 'Dahmane El Harrachi', duration: '6:34' },
    { title: 'El Kaoui', artist: 'El Anka', duration: '4:22' },
  ],
  kabyle: [
    { title: 'A Vava Inouva', artist: 'Idir', duration: '4:36' },
    { title: 'Azawad', artist: 'Idir', duration: '5:22' },
    { title: 'Ssendu', artist: 'Idir', duration: '3:48' },
    { title: 'Raba Hni', artist: 'Lounis Ait Menguellet', duration: '4:18' },
    { title: 'Tamezghit', artist: 'Lounis Ait Menguellet', duration: '5:04' },
    { title: 'Thassast', artist: 'Matoub Lounes', duration: '3:34' },
    { title: 'A Ttnagh', artist: 'Matoub Lounes', duration: '4:56' },
    { title: 'Chants de L\'Atlas', artist: 'Taos Amrouche', duration: '5:44' },
    { title: 'Achewal', artist: 'Taos Amrouche', duration: '3:58' },
    { title: 'Zwit Rwit', artist: 'Idir', duration: '4:22' },
    { title: 'Tilleli', artist: 'Idir', duration: '6:12' },
    { title: 'Ay Arrac Nnegh', artist: 'Idir', duration: '4:48' },
  ],
  diwan: [
    { title: 'Mimouna', artist: 'Tamtam', duration: '5:38' },
    { title: 'Tahala', artist: 'Tamtam', duration: '4:14' },
    { title: 'Gnawa', artist: 'Tamtam', duration: '3:52' },
    { title: 'Diwan', artist: 'Tamtam', duration: '5:18' },
    { title: 'Tinariwen', artist: 'Groupe Douli', duration: '6:08' },
    { title: 'Desert Blues', artist: 'Groupe Douli', duration: '3:42' },
    { title: 'Targui', artist: 'Groupe Douli', duration: '4:36' },
    { title: 'Sahara', artist: 'Tamtam', duration: '5:22' },
    { title: 'Tombouctou', artist: 'Tamtam', duration: '3:58' },
    { title: 'Hoggar', artist: 'Groupe Douli', duration: '4:48' },
    { title: 'Tassili', artist: 'Groupe Douli', duration: '6:34' },
    { title: 'Amazigh', artist: 'Tamtam', duration: '4:22' },
  ],
  rapdz: [
    { title: 'Khalti', artist: 'Lotfi Dz', duration: '3:42' },
    { title: 'Bladi', artist: 'Lotfi Dz', duration: '4:18' },
    { title: 'Ana El Hak', artist: 'Didine', duration: '3:58' },
    { title: 'Dz Hip Hop', artist: 'Didine', duration: '4:36' },
    { title: 'Nzida', artist: 'Tiba', duration: '3:34' },
    { title: 'Rap Dz', artist: 'Tiba', duration: '4:48' },
    { title: 'Rap 2025', artist: 'Lotfi Dz', duration: '5:04' },
    { title: 'Street', artist: 'Didine', duration: '3:52' },
    { title: 'Flex', artist: 'Tiba', duration: '4:22' },
    { title: 'Underground', artist: 'Lotfi Dz', duration: '5:18' },
    { title: 'Justice', artist: 'Didine', duration: '3:48' },
    { title: 'Freedom', artist: 'Tiba', duration: '4:14' },
  ],
  staifi: [
    { title: 'Zarga', artist: 'Various', duration: '4:18' },
    { title: 'Djamila', artist: 'Various', duration: '3:42' },
    { title: 'Bent Bladi', artist: 'Various', duration: '5:04' },
    { title: 'Ya Lalla', artist: 'Various', duration: '4:36' },
    { title: 'Melaya', artist: 'Various', duration: '3:58' },
    { title: 'Tlata', artist: 'Various', duration: '4:48' },
    { title: 'El Jamila', artist: 'Various', duration: '3:34' },
    { title: 'Chouf', artist: 'Various', duration: '5:22' },
    { title: 'Saha Ftour', artist: 'Various', duration: '4:22' },
    { title: 'Nouvelle Vie', artist: 'Various', duration: '3:48' },
    { title: 'Soleil de Minuit', artist: 'Various', duration: '5:44' },
    { title: 'Fou de Toi', artist: 'Various', duration: '4:56' },
  ],
  targhi: [
    { title: 'Tinariwen', artist: 'Groupe Douli', duration: '6:08' },
    { title: 'Desert Blues', artist: 'Groupe Douli', duration: '3:42' },
    { title: 'Targui', artist: 'Groupe Douli', duration: '4:36' },
    { title: 'Sahara', artist: 'Groupe Douli', duration: '5:22' },
    { title: 'Tamanrasset', artist: 'Groupe Douli', duration: '3:58' },
    { title: 'Adrar', artist: 'Groupe Douli', duration: '4:48' },
    { title: 'Hoggar', artist: 'Groupe Douli', duration: '6:34' },
    { title: 'Tassili', artist: 'Groupe Douli', duration: '4:22' },
    { title: 'Azawad', artist: 'Groupe Douli', duration: '5:38' },
    { title: 'Desert Wind', artist: 'Groupe Douli', duration: '4:14' },
  ],
  andalous: [
    { title: 'Nouba', artist: 'Andalous Ensemble', duration: '6:12' },
    { title: 'Moorish Dream', artist: 'Andalous Ensemble', duration: '5:38' },
    { title: 'Granada', artist: 'Andalous Ensemble', duration: '4:48' },
    { title: 'Ziryab', artist: 'Andalous Ensemble', duration: '5:22' },
    { title: 'Medina', artist: 'Andalous Ensemble', duration: '3:58' },
    { title: 'Al Andalus', artist: 'Andalous Ensemble', duration: '6:34' },
    { title: 'Cordoba', artist: 'Andalous Ensemble', duration: '4:22' },
    { title: 'Sevilla', artist: 'Andalous Ensemble', duration: '5:04' },
  ],
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getConfidence = (desc) => {
  const words = desc.toLowerCase();
  if (words.includes('energetic') || words.includes('90s') || words.includes('rai')) return 'high';
  if (words.includes('focus') || words.includes('study') || words.includes('workout') || words.includes('gym')) return 'high';
  if (words.includes('party') || words.includes('chill') || words.includes('relax')) return 'high';
  return 'medium';
};

const generateTracks = (description) => {
  const desc = description.toLowerCase();
  let pool;

  if ((desc.includes('energetic') || desc.includes('rai') || desc.includes('90s')) && !desc.includes('chaabi')) {
    pool = [...TRACK_POOLS.rai90s];
  } else if (desc.includes('focus') || desc.includes('study')) {
    pool = [...TRACK_POOLS.chaabi];
  } else if (desc.includes('workout') || desc.includes('gym')) {
    pool = [...TRACK_POOLS.rapdz];
  } else if (desc.includes('party')) {
    pool = [...shuffle([...TRACK_POOLS.rai90s, ...TRACK_POOLS.rapdz]).slice(0, 12)];
  } else if (desc.includes('chill') || desc.includes('relax')) {
    pool = [...shuffle([...TRACK_POOLS.kabyle, ...TRACK_POOLS.diwan]).slice(0, 12)];
  } else if (desc.includes('kabyle')) {
    pool = [...TRACK_POOLS.kabyle];
  } else if (desc.includes('chaabi')) {
    pool = [...TRACK_POOLS.chaabi];
  } else if (desc.includes('rap') || desc.includes('hip hop')) {
    pool = [...TRACK_POOLS.rapdz];
  } else if (desc.includes('diwan') || desc.includes('gnawa')) {
    pool = [...TRACK_POOLS.diwan];
  } else if (desc.includes('targhi') || desc.includes('desert') || desc.includes('tuareg')) {
    pool = [...TRACK_POOLS.targhi];
  } else if (desc.includes('andalous') || desc.includes('moorish')) {
    pool = [...TRACK_POOLS.andalous];
  } else if (desc.includes('staifi')) {
    pool = [...TRACK_POOLS.staifi];
  } else {
    // Random mix across all genres
    const all = [
      ...TRACK_POOLS.rai90s, ...TRACK_POOLS.chaabi, ...TRACK_POOLS.kabyle,
      ...TRACK_POOLS.diwan, ...TRACK_POOLS.rapdz, ...TRACK_POOLS.staifi,
      ...TRACK_POOLS.targhi, ...TRACK_POOLS.andalous,
    ];
    pool = shuffle(all);
  }

  const confidence = getConfidence(desc);
  const tracks = shuffle(pool).slice(0, 8).map((t, i) => ({
    id: `ai_${Date.now()}_${i}`,
    ...t,
    image: `https://picsum.photos/seed/ai${i}/300/170`,
  }));

  return { tracks, confidence };
};

const AIPlaylistGenerator = ({ onPlay, onToast }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const generated = generateTracks(prompt);
      setResult(generated);
      setLoading(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!result || result.tracks.length === 0) return;
    setSaving(true);
    const name = prompt.trim().length > 30
      ? prompt.trim().slice(0, 30) + '…'
      : prompt.trim();
    const pl = createPlaylist(`AI: ${name}`);
    result.tracks.forEach(t => addTrackToPlaylist(pl.id, t));
    recordPlaylist();
    setSaving(false);
    if (onToast) onToast('Playlist saved! 🎉');
  };

  const badgeColor = result?.confidence === 'high' ? 'var(--accent-green)' : 'var(--accent-amber)';
  const badgeLabel = result?.confidence === 'high' ? 'High Confidence' : 'Medium Confidence';

  return (
    <div className="ai-pl-gen">
      <div className="ai-pl-gen__header">
        <span className="ai-pl-gen__icon">✨</span>
        <div>
          <span className="ai-pl-gen__title">AI Playlist Generator</span>
          <span className="ai-pl-gen__sub">Describe your perfect playlist in words</span>
        </div>
      </div>

      <div className="ai-pl-gen__input-row">
        <input
          className="ai-pl-gen__input"
          placeholder="Describe the playlist you want..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          disabled={loading}
        />
        <button
          className="ai-pl-gen__btn"
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
        >
          {loading ? (
            <span className="ai-pl-gen__btn-loading">
              <span className="ai-pl-gen__spinner" />
              Thinking...
            </span>
          ) : (
            'Generate ✨'
          )}
        </button>
      </div>

      {loading && (
        <div className="ai-pl-gen__loading">
          <div className="ai-pl-gen__loading-bar">
            <div className="ai-pl-gen__loading-fill" />
          </div>
          <span className="ai-pl-gen__loading-text">Analyzing your request...</span>
        </div>
      )}

      {result && (
        <div className="ai-pl-gen__result">
          <div className="ai-pl-gen__result-header">
            <span className="ai-pl-gen__result-title">Generated Playlist</span>
            <span
              className="ai-pl-gen__confidence"
              style={{ background: badgeColor }}
            >
              {badgeLabel}
            </span>
          </div>

          <div className="track-list">
            {result.tracks.map((track, i) => (
              <div
                key={track.id}
                className="track-row"
                onClick={() => onPlay?.(track)}
              >
                <span className="track-row__num">{i + 1}</span>
                <div className="track-row__info">
                  <div className="track-row__title">{track.title}</div>
                  <div className="track-row__artist">{track.artist}</div>
                </div>
                <span className="track-row__duration">{track.duration}</span>
              </div>
            ))}
          </div>

          <button
            className="ai-pl-gen__save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save as Playlist 💾'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AIPlaylistGenerator;
