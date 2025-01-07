import React, { useState, useEffect, useMemo } from 'react';
import { FaPython } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { SiLua } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { SiUnrealengine } from 'react-icons/si';
import { BsSun, BsVolumeUp, BsVolumeMute } from 'react-icons/bs';
import './Home.css';

const Home = React.memo(() => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [is24Hour, setIs24Hour] = useState(true);
  const [isTimeTransitioning, setIsTimeTransitioning] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const greetings = useMemo(() => [
    "Hello",
    "Bonjour",
    "Hola",
    "Привет",
    "こんにちは",
    "Ciao",
    "你好",
    "नमस्ते"
  ], []);

  const icons = useMemo(() => [
    { Icon: FaPython, color: '#3776AB' },
    { Icon: IoLogoJavascript, color: '#F7DF1E' },
    { Icon: SiLua, color: '#000080' },
    { Icon: FaReact, color: '#61DAFB' },
    { Icon: SiUnrealengine, color: '#FFFFFF' }
  ], []);

  useEffect(() => {
    let timer;
    const current = greetings[loopNum % greetings.length];
    
    const tick = () => {
      if (!isDeleting) {
        setText((prev) => 
          current.substring(0, prev.length + 1)
        );
        
        if (text === current) {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 5000);
        }
      } else {
        setText((prev) => 
          current.substring(0, prev.length - 1)
        );
        
        if (text === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }
    };
  
    timer = setTimeout(tick, isDeleting ? 100 : 150);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, greetings]);

  const toggleTimeFormat = () => {
    setIsTimeTransitioning(true);
    setTimeout(() => {
      setIs24Hour(!is24Hour);
      setIsTimeTransitioning(false);
    }, 300);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (window.audioElement) {
      window.audioElement.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (window.audioElement) {
      if (isMuted) {
        window.audioElement.volume = volume;
        setIsMuted(false);
      } else {
        window.audioElement.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const marseilleTtime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Europe/Paris',
    hour12: !is24Hour,
  });

  return (
    <div className="home-container">
      <div className="grid-background" aria-hidden="true"></div>
      <div className="content">
        <div className="welcome-text">
          <span className="typewriter">{text}</span>
          <span className="static-text">, I'm jxsh</span>
        </div>
        <div className="sub-text">
          an untalented guy that makes stuff
        </div>
        <div className="icons-container">
          {icons.map(({ Icon, color }, index) => (
            <div 
              key={index} 
              className="icon"
              style={{ color: color }}
            >
              <Icon size={35} />
            </div>
          ))}
        </div>
        <div className="time-container">
          <div className="time-text">
            <div className="sun-toggle" onClick={toggleTimeFormat}>
              <BsSun className="sun-icon" />
            </div>
            the time for me currently is: {' '}
            <span className={`bold-time ${isTimeTransitioning ? 'time-fade' : ''}`}>
              {marseilleTtime}
            </span>
          </div>
          <div className="volume-controls">
            <button className="volume-button" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <BsVolumeMute /> : <BsVolumeUp />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Home;