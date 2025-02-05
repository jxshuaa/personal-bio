<<<<<<< HEAD
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

=======
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaPython } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { SiLua } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { SiUnrealengine } from 'react-icons/si';
import { BsSun, BsVolumeUp, BsVolumeMute } from 'react-icons/bs';
import './Home.css';

const DISCORD_ID = process.env.REACT_APP_DISCORD_ID;
const LANYARD_WS_URL = process.env.REACT_APP_LANYARD_WS_URL;

const DISCORD_FLAGS = {
  DISCORD_EMPLOYEE: 1 << 0,
  PARTNERED_SERVER_OWNER: 1 << 1,
  HYPESQUAD_EVENTS: 1 << 2,
  BUGHUNTER_LEVEL_1: 1 << 3,
  EARLY_SUPPORTER: 1 << 9,
  BUGHUNTER_LEVEL_2: 1 << 14,
  VERIFIED_BOT_DEVELOPER: 1 << 17,
  ACTIVE_DEVELOPER: 1 << 22,
  NITRO: 1 << 23
};

const getBadgeUrl = (flag) => {
  switch (flag) {
    case 'DISCORD_EMPLOYEE': return 'https://cdn.discordapp.com/badge-icons/5e74e9b61934fc1f67c65515d1f7e89d.png';
    case 'PARTNERED_SERVER_OWNER': return 'https://cdn.discordapp.com/badge-icons/3f9748e53446a137a052f3454e2de41e.png';
    case 'HYPESQUAD_EVENTS': return 'https://cdn.discordapp.com/badge-icons/bf01d1073931f921909045f3a39fd264.png';
    case 'BUGHUNTER_LEVEL_1': return 'https://cdn.discordapp.com/badge-icons/8353d89b529e13365c415aef08d1d1f4.png';
    case 'EARLY_SUPPORTER': return 'https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png';
    case 'BUGHUNTER_LEVEL_2': return 'https://cdn.discordapp.com/badge-icons/f599063762165e0d23e8b11b684765a8.png';
    case 'VERIFIED_BOT_DEVELOPER': return 'https://cdn.discordapp.com/badge-icons/6df5892e0f35b051f8b61eace34f4967.png';
    case 'ACTIVE_DEVELOPER': return 'https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png';
    case 'NITRO': return 'https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png';
    default: return null;
  }
};

const Home = React.memo(() => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [is24Hour, setIs24Hour] = useState(true);
  const [isTimeTransitioning, setIsTimeTransitioning] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [isMuted, setIsMuted] = useState(false);
  const [presence, setPresence] = useState(null);
  const [previousVolume, setPreviousVolume] = useState(0.2);
  const [isSliding, setIsSliding] = useState(false);

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

  const connectWebSocket = useCallback(() => {
    try {
      const ws = new WebSocket(LANYARD_WS_URL);
      
      ws.onopen = () => {
        ws.send(JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: DISCORD_ID
          }
        }));
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        const newWs = connectWebSocket();
        if (newWs) {
          newWs.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              if (data.op === 0 && data.t === 'PRESENCE_UPDATE') {
                setPresence(data.d);
              }
            } catch (error) {
              console.error('Error processing WebSocket message:', error);
            }
          };
        }
      };

      return ws;
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    // Initial fetch with error handling
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        if (data.success) setPresence(data.data);
      })
      .catch(error => {
        console.error('Error fetching Discord presence:', error);
      });

    const ws = connectWebSocket();
    if (ws) {
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.op === 0 && data.t === 'PRESENCE_UPDATE') {
            setPresence(data.d);
          }
        } catch (error) {
          console.error('Error processing WebSocket message:', error);
        }
      };
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [connectWebSocket]);

  useEffect(() => {
    if (window.audioElement) {
      window.audioElement.volume = volume;
    }
  }, [volume]);

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
    if (newVolume > 0) {
      setPreviousVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (window.audioElement) {
      setIsSliding(true);
      if (isMuted) {
        setVolume(previousVolume);
        window.audioElement.volume = previousVolume;
        setIsMuted(false);
      } else {
        setPreviousVolume(volume);
        setVolume(0);
        window.audioElement.volume = 0;
        setIsMuted(true);
      }
      setTimeout(() => setIsSliding(false), 300);
    }
  };

  const marseilleTtime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Europe/Paris',
    hour12: !is24Hour,
  });

  // Add audio security
  const initAudio = () => {
    if (!window.audioElement) {
      try {
        const audio = new Audio('/song.mp3');
        audio.volume = volume;
        audio.loop = true;
        window.audioElement = audio;
      } catch (error) {
        console.error('Failed to initialize audio:', error);
      }
    }
    return window.audioElement;
  };

  const handleClick = () => {
    const audio = initAudio();
    if (audio) {
      audio.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#43b581';
      case 'idle': return '#faa61a';
      case 'dnd': return '#f04747';
      default: return '#747f8d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'idle': return 'Idle';
      case 'dnd': return 'Do Not Disturb';
      default: return 'Offline';
    }
  };

  const getDiscordBadges = (flags) => {
    const badges = [];
    for (const [flagName, flagValue] of Object.entries(DISCORD_FLAGS)) {
      if (flags & flagValue) {
        const badgeUrl = getBadgeUrl(flagName);
        if (badgeUrl) {
          badges.push({ name: flagName, url: badgeUrl });
        }
      }
    }
    return badges;
  };

  return (
    <div className="home-container" onClick={handleClick}>
      <div className="grid-background" aria-hidden="true"></div>
      <div className="content">
        <div className="welcome-text">
          <span className="typewriter">{text}</span>
          <span className="static-text">, I'm jxsh</span>
        </div>
        <div className="sub-text">
          an untalented guy that makes stuff
        </div>
        {presence && (
          <div className="discord-presence">
            <div className="profile-section">
              <div className="avatar-container">
                <img 
                  src={`https://api.lanyard.rest/${DISCORD_ID}.png`}
                  alt="Discord Avatar"
                  className="avatar"
                />
                <div 
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(presence.discord_status) }}
                  title={getStatusText(presence.discord_status)}
                />
              </div>
              <div className="user-info">
                <div className="username-container">
                  <span className="username">jxshuaa</span>
                  <div className="badges">
                    {presence.discord_user.public_flags && 
                      getDiscordBadges(presence.discord_user.public_flags).map((badge, index) => (
                        <img 
                          key={index}
                          src={badge.url}
                          alt={badge.name}
                          className="discord-badge"
                          title={badge.name.toLowerCase().replace(/_/g, ' ')}
                        />
                      ))
                    }
                  </div>
                </div>
              </div>
              {presence.activities && presence.activities.length > 0 && (
                <div className="activities">
                  {presence.activities.map((activity, index) => (
                    <div key={index} className="activity">
                      {activity.type === 2 && activity.name === 'Spotify' ? (
                        <div className="spotify">
                          {activity.assets?.large_image && (
                            <img 
                              src={`https://i.scdn.co/image/${activity.assets.large_image.split(':')[1]}`}
                              alt="Album Art"
                              className="spotify-album-art"
                            />
                          )}
                          <div className="spotify-info">
                            <p className="song">{activity.details}</p>
                            <p className="artist">by {activity.state}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="general-activity">
                          <p>{activity.name}</p>
                          {activity.details && <p>{activity.details}</p>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="icons-container">
          {icons.map(({ Icon, color }, index) => (
            <div 
              key={index} 
              className="tech-icon"
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
            <button 
              className={`volume-button ${isMuted ? 'muted' : ''}`} 
              onClick={toggleMute}
            >
              {isMuted ? <BsVolumeMute /> : <BsVolumeUp />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className={`volume-slider ${isSliding ? 'sliding' : ''}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

>>>>>>> f7e664a (feat: Major UI and Performance Improvements)
export default Home;