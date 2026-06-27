import React, { useState } from 'react';

const COLORS = ['#D32F2F','#8B0000','#C2185B','#AD1457','#006B3F','#2E7D32','#E65100','#C62828','#F5A623','#7B1FA2','#00ACC1','#C8A45C','#1565C0','#388E3C'];

const getFallbackColor = (alt) => {
  const code = alt.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return COLORS[code % COLORS.length];
};

const getInitials = (alt) => {
  return alt.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
};

const SafeImage = ({ src, alt, className, style, ...rest }) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: `linear-gradient(135deg, ${getFallbackColor(alt || '?')}, ${getFallbackColor(alt || '?')}88)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          color: '#fff',
          fontSize: style?.fontSize || (style?.width ? `calc(${style.width} * 0.35)` : '14px'),
          overflow: 'hidden',
        }}
        {...rest}
      >
        {getInitials(alt || '?')}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
      loading="lazy"
      {...rest}
    />
  );
};

export default SafeImage;
