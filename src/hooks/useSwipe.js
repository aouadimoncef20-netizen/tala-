import { useRef, useCallback } from 'react';

/**
 * Custom hook that detects swipe gestures on touch devices.
 *
 * @param {Object} options
 * @param {Function} [options.onSwipeLeft]   - Called when user swipes left
 * @param {Function} [options.onSwipeRight]  - Called when user swipes right
 * @param {Function} [options.onSwipeUp]     - Called when user swipes up
 * @param {Function} [options.onSwipeDown]   - Called when user swipes down
 * @param {number}   [options.thresholdX=50] - Minimum horizontal distance (px)
 * @param {number}   [options.thresholdY=30] - Minimum vertical distance (px)
 * @returns {{ onTouchStart: Function, onTouchEnd: Function }}
 */
const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  thresholdX = 50,
  thresholdY = 30,
} = {}) => {
  const touchStart = useRef({ x: 0, y: 0, time: 0 });

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const touch = e.changedTouches[0];
    if (!touch) return;

    const { x: startX, y: startY, time: startTime } = touchStart.current;
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    const elapsed = Date.now() - startTime;

    // Require the gesture to be reasonably fast (< 300ms) or far enough
    if (elapsed > 300 && Math.abs(deltaX) < thresholdX * 2 && Math.abs(deltaY) < thresholdY * 2) {
      return; // too slow and short — probably a tap, not a swipe
    }

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Horizontal swipe
    if (absX > thresholdX && absX > absY) {
      if (deltaX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
      return;
    }

    // Vertical swipe
    if (absY > thresholdY && absY > absX) {
      if (deltaY > 0) {
        onSwipeDown?.();
      } else {
        onSwipeUp?.();
      }
      return;
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, thresholdX, thresholdY]);

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
};

export default useSwipe;
