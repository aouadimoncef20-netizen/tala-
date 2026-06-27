import React from 'react';
import { RADIO_STATIONS } from '../data/athir-data';
import './MainContent.css';

const RadioView = ({ onPlay, currentTrack, isPlaying }) => {
  const isActive = (id) => currentTrack?.id === id && currentTrack?.type === 'radio' && isPlaying;

  return (
    <div>
      <div className="hero-mini">
        <div className="hero-mini__info">
          <div className="hero-mini__type">◈ Live Radio</div>
          <h1 className="hero-mini__title">Algerian Radio Stations</h1>
          <p className="hero-mini__desc">Listen live to Algeria's most popular radio stations — news, music, culture, and more.</p>
        </div>
      </div>

      <div className="scroll">
        {RADIO_STATIONS.map(radio => (
          <div key={radio.id} className="card" onClick={() => onPlay({
            id: radio.id, title: radio.name, artist: radio.freq, type: 'radio',
            image: radio.image, duration: 'Live', podcastName: radio.name,
          })}>
            <div className="card__img-wrap">
              <img className="card__img" src={radio.image} alt={radio.name} loading="lazy" />
              {isActive(radio.id) ? (
                <div className="card__play card__play--visible" style={{ background: '#5AA87A' }}>
                  <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                </div>
              ) : (
                <div className="card__play card__play--visible" style={{ background: '#4A9BAA' }}>
                  <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
                </div>
              )}
            </div>
            <div className="card__body">
              <div className="card__title">{radio.name}</div>
              <div className="card__sub">{radio.freq} · {radio.language}</div>
              {isActive(radio.id) && (
                <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                  <span style={{ width: 2, height: 10, background: '#5AA87A', borderRadius: 1, animation: 'eq 0.8s infinite' }} />
                  <span style={{ width: 2, height: 14, background: '#5AA87A', borderRadius: 1, animation: 'eq 1s infinite 0.2s' }} />
                  <span style={{ width: 2, height: 7, background: '#5AA87A', borderRadius: 1, animation: 'eq 0.6s infinite 0.4s' }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <section className="section" style={{ marginTop: 28 }}>
        <div className="section__head">
          <span className="section__title">All Stations</span>
        </div>
        <div className="track-list">
          {RADIO_STATIONS.map(radio => (
            <div
              key={radio.id}
              className={`track-row ${isActive(radio.id) ? 'track-row--active' : ''}`}
              onClick={() => onPlay({
                id: radio.id, title: radio.name, artist: radio.freq, type: 'radio',
                image: radio.image, duration: 'Live', podcastName: radio.name,
              })}
            >
              <img className="track-row__img" src={radio.image} alt={radio.name} loading="lazy" />
              <div className="track-row__info">
                <div className="track-row__title">
                  {isActive(radio.id) && <span className="track-row__indicator" />}
                  {radio.name}
                </div>
                <div className="track-row__artist">{radio.freq} · {radio.language} · {radio.listeners} listeners</div>
              </div>
              <span className="track-row__duration">{radio.category}</span>
              <div className="track-row__actions">
                <button className="track-row__action">{isActive(radio.id) ? '⏹' : '▶'}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RadioView;
