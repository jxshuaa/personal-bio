import React, { useState, useEffect } from 'react';
import './DiscordPresence.css';

const DISCORD_ID = '843536174726512642';
const LANYARD_WS_URL = 'wss://api.lanyard.rest/socket';

const DiscordPresence = () => {
    const [presence, setPresence] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initial fetch using REST API
        fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setPresence(data.data);
            });

        // WebSocket connection for real-time updates
        const ws = new WebSocket(LANYARD_WS_URL);
        
        ws.onopen = () => {
            ws.send(JSON.stringify({
                op: 2,
                d: {
                    subscribe_to_id: DISCORD_ID
                }
            }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.op === 0 && data.t === 'PRESENCE_UPDATE') {
                setPresence(data.d);
            }
        };

        setSocket(ws);

        return () => {
            if (socket) socket.close();
        };
    }, []);

    if (!presence) return <div className="discord-presence loading">Loading...</div>;

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

    return (
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
                    <h2>{presence.discord_user.username}</h2>
                    {presence.discord_status && (
                        <p className="status">{getStatusText(presence.discord_status)}</p>
                    )}
                </div>
            </div>
            
            {presence.activities && presence.activities.length > 0 && (
                <div className="activities-section">
                    {presence.activities.map((activity, index) => (
                        <div key={index} className="activity">
                            {activity.type === 2 && activity.name === 'Spotify' ? (
                                <div className="spotify-activity">
                                    <img src={activity.assets.large_image} alt="Album Art" />
                                    <div className="spotify-info">
                                        <p className="song">{activity.details}</p>
                                        <p className="artist">by {activity.state}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="general-activity">
                                    <p className="activity-name">{activity.name}</p>
                                    {activity.details && <p className="activity-details">{activity.details}</p>}
                                    {activity.state && <p className="activity-state">{activity.state}</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DiscordPresence; 