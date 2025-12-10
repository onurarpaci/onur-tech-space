import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './styles/variables.css';
import './App.css';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';

import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-content">
            <Link to="/" className="logo">[ OA_SYSTEMS_V5.0 ]</Link>
            <div className="nav-links">
              <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>// HOME</NavLink>
              <NavLink to="/experience" className={({ isActive }) => isActive ? "active-link" : ""}>// EXPERIENCE</NavLink>
              <NavLink to="/skills" className={({ isActive }) => isActive ? "active-link" : ""}>// SKILLS</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>// CONTACT</NavLink>
            </div>
            <div className="system-status">
              <span className="status-dot"></span>
              <span className="status-text">SYSTEM ONLINE: TR</span>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<section id="hero"><Hero /></section>} />
            <Route path="/experience" element={
              <div className="page-wrapper">
                <section id="experience-page"><Experience /></section>
              </div>
            } />
            <Route path="/skills" element={<section id="skills"><Skills /></section>} />
            <Route path="/contact" element={<section id="contact"><Contact /></section>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
