import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { SpeedInsights } from "@vercel/speed-insights/react"
import App from './App';
import './App.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
      <SpeedInsights />
    </Suspense>
  </React.StrictMode>
);