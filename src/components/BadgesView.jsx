import React, { useState, useEffect } from 'react';
import { getStats } from '../data/gamification-store';
import './BadgesView.css';

const ALL_BADGES = [
  { id: 'early_bird', name: 'Early Bird', icon: '🐦', desc: 'Played 10 tracks' },
  { id: 'hundred_club', name: 'Hundred Club', icon: '💯', desc: 'Played 100 tracks' },
  { id: 'music_lover', name: 'Music Lover', icon: '🎵', desc: 'Played 500 tracks' },
  { id: 'streak_3', name: '3-Day Streak', icon: '🔥', desc: 'Listened 3 days in a row' },
  { id: 'streak_7', name: 'Week Warrior', icon: '📅', desc: 'Listened 7 days in a row' },
  { id: 'streak_30', name: 'Dedicated', icon: '🏆', desc: 'Listened 30 days in a row' },
  { id: 'ten_hours', name: 'Ten Hours', icon: '⏰', desc: '10 hours of listening' },
  { id: 'hundred_hours', name: 'Hundred Hours', icon: '🌟', desc: '100 hours of listening' },
];

const BadgesView = () => {
  const [stats, setStats] = useState(getStats());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const earnedIds = new Set(stats.badges.map(b => b.id));

  return (
    <section className="badges-section">
      <div className="section__head">
        <span className="section__title">Badges</span>
        <span className="section__count">{stats.badges.length}/{ALL_BADGES.length}</span>
      </div>
      <div className="badges-grid">
        {ALL_BADGES.map((badge, i) => {
          const earned = earnedIds.has(badge.id);
          return (
            <div
              key={badge.id}
              className={`badge-card ${earned ? 'badge-card--earned' : 'badge-card--locked'} ${visible ? 'badge-card--visible' : ''}`}
              style={{ animationDelay: `${i * 80}ms` }}
              title={earned ? badge.desc : '🔒 Keep listening to unlock'}
            >
              <div className="badge-card__icon-wrap">
                <span className="badge-card__icon">{earned ? badge.icon : '🔒'}</span>
              </div>
              <span className="badge-card__name">{earned ? badge.name : '???'}</span>
              <span className="badge-card__desc">{earned ? badge.desc : 'Locked'}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BadgesView;
