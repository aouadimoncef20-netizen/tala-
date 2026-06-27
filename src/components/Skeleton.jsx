import React from 'react';
import './Skeleton.css';

const SkeletonCard = ({ style }) => (
  <div className="skeleton-card" style={style}>
    <div className="skeleton skeleton--img" />
    <div className="skeleton skeleton--text" style={{ width: '80%', marginTop: 8 }} />
    <div className="skeleton skeleton--text" style={{ width: '50%', marginTop: 4 }} />
  </div>
);

const SkeletonRow = () => (
  <div className="skeleton-row">
    <div className="skeleton skeleton--img-sm" />
    <div className="skeleton-row__info">
      <div className="skeleton skeleton--text" style={{ width: '60%' }} />
      <div className="skeleton skeleton--text" style={{ width: '35%', marginTop: 4 }} />
    </div>
    <div className="skeleton skeleton--text" style={{ width: '30px' }} />
  </div>
);

const SkeletonHero = () => (
  <div className="skeleton-hero">
    <div className="skeleton skeleton--hero" />
  </div>
);

const SkeletonGrid = ({ count = 6, columns = 'repeat(auto-fill, minmax(150px, 1fr))' }) => (
  <div className="skeleton-grid" style={{ gridTemplateColumns: columns }}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export { SkeletonCard, SkeletonRow, SkeletonHero, SkeletonGrid };
export default SkeletonGrid;
