import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LOADING_TEXTS = ['Loading...', 'Getting ready...', 'Almost there...'];

const LoadingScreen = ({ onComplete, minDuration = 2500 }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Cycle loading text
    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % LOADING_TEXTS.length);
    }, 800);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 8 + 2;
        return next >= 100 ? 100 : next;
      });
    }, 300);

    // Complete after minDuration
    const completeTimer = setTimeout(() => {
      setProgress(100);
      clearInterval(textInterval);
      clearInterval(progressInterval);

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500);
      }, 400);
    }, minDuration);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [minDuration, onComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'loading-screen--fade-out' : ''}`}>
      <div className="loading-screen__content">
        {/* Animated T logo with expanding rings */}
        <div className="loading-screen__logo">
          <div className="loading-screen__ring loading-screen__ring--1" />
          <div className="loading-screen__ring loading-screen__ring--2" />
          <div className="loading-screen__ring loading-screen__ring--3" />
          <div className="loading-screen__letter">T</div>
        </div>

        {/* Loading text */}
        <span className="loading-screen__text" key={textIndex}>
          {LOADING_TEXTS[textIndex]}
        </span>

        {/* Progress bar */}
        <div className="loading-screen__progress-track">
          <div
            className="loading-screen__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
