import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Videos from './pages/Videos';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        
        <Navbar />

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/videos" element={<Videos />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}