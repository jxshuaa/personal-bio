import React, { useState, useEffect } from 'react';
import './IntroScreen.css';

const IntroScreen = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const animateText = async () => {
      while (isSubscribed) {
        const firstText = 'click me';
        for (let i = 0; i <= firstText.length; i++) {
          if (!isSubscribed) break;
          setText(firstText.slice(0, i));
          await new Promise(r => setTimeout(r, 100));
        }
        
        await new Promise(r => setTimeout(r, 2500));
        
        for (let i = firstText.length; i >= 0; i--) {
          if (!isSubscribed) break;
          setText(firstText.slice(0, i));
          await new Promise(r => setTimeout(r, 50));
        }

        await new Promise(r => setTimeout(r, 500));
        const secondText = 'jxsh <3';
        for (let i = 0; i <= secondText.length; i++) {
          if (!isSubscribed) break;
          setText(secondText.slice(0, i));
          await new Promise(r => setTimeout(r, 100));
        }

        await new Promise(r => setTimeout(r, 2500));
        for (let i = secondText.length; i >= 0; i--) {
          if (!isSubscribed) break;
          setText(secondText.slice(0, i));
          await new Promise(r => setTimeout(r, 50));
        }

        await new Promise(r => setTimeout(r, 500));
      }
    };
    
    animateText();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleClick = () => {
    if (hasClicked) return;
    setHasClicked(true);
    setIsFading(true);
    const audio = new Audio('/song.mp3');
    audio.loop = true;
    audio.play();
    window.audioElement = audio;
    setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, 1000);
  };

  return !isComplete ? (
    <div className={`intro-screen ${isFading ? 'fade-out' : ''}`} onClick={handleClick}>
      <div className="intro-content">
        <div className="intro-text">{text}</div>
      </div>
    </div>
  ) : null;
};

export default IntroScreen;