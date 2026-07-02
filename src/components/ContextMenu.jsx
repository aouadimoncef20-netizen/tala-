import React, { useEffect, useRef } from 'react';
import usePlayerStore from '../stores/playerStore';
import useUIStore from '../stores/uiStore';
import { createToast } from './Toast';
import './ContextMenu.css';

const MENU_ITEMS = [
  { key: 'play', label: 'Play Now' },
  { key: 'queue', label: 'Add to Queue' },
  { key: 'playlist', label: 'Add to Playlist' },
  { key: 'share', label: 'Share' },
];

const ContextMenu = ({ x, y, track, onClose }) => {
  const playOrToggle = usePlayerStore(s => s.playOrToggle);
  const addToQueue = usePlayerStore(s => s.addToQueue);
  const addToast = useUIStore(s => s.addToast);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    // Delay adding listener so right-click on the same element doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClick);
      document.addEventListener('contextmenu', handleClick);
    }, 0);
    document.addEventListener('keydown', handleEsc);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!track) return null;

  // Clamp position to viewport
  const style = {};
  if (x !== undefined) {
    style.left = Math.min(x, window.innerWidth - 180);
    style.top = Math.min(y, window.innerHeight - 200);
  }

  const handleAction = (key) => {
    onClose();
    switch (key) {
      case 'play':
        playOrToggle(track);
        break;
      case 'queue':
        addToQueue(track);
        addToast(createToast('added', 'Added to queue', track?.title || ''));
        break;
      case 'playlist':
        addToast(createToast('info', 'Coming soon', 'Playlist support coming in a future update'));
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({ title: track.title, text: `${track.title} — ${track.artist || track.podcastName || ''}` }).catch(() => {});
        } else {
          navigator.clipboard?.writeText(`${track.title} — ${track.artist || track.podcastName || ''}`).then(() => {
            addToast(createToast('info', 'Copied to clipboard', track.title));
          }).catch(() => {});
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="context-menu" ref={menuRef} style={style}>
      <div className="context-menu__header">{track.title}</div>
      {MENU_ITEMS.map((item) => (
        <button
          key={item.key}
          className="context-menu__item"
          onClick={() => handleAction(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
