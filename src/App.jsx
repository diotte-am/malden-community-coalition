import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Videos from './pages/Videos';
import Contact from './pages/Contact';

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
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/message" element={<ContactFormPage />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}