import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import CursorTrail from './components/CursorTrail';
import IntroScreen from './components/IntroScreen';
import './App.css';

function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    return () => {
      if (window.audioElement) {
        window.audioElement.pause();
        window.audioElement = null;
      }
    };
  }, []);

  return (
    <div className="App">
      {!showContent && <IntroScreen onComplete={() => setShowContent(true)} />}
      {showContent && (
        <>
          <Navbar />
          <Home />
          <CursorTrail />
        </>
      )}
    </div>
  );
}

export default App;