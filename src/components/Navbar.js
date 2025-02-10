import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="https://github.com/jxshuaa" target="_blank" rel="noopener noreferrer">
          projects
        </a>
        <a href="https://e-z.bio/jxsh" target="_blank" rel="noopener noreferrer">
          my e-z.bio
        </a>
        <a href="https://discord.gg/UWFH2sEfCW" target="_blank" rel="noopener noreferrer">
          carbon softworks
        </a>
        <a href="https://discord.gg/atkWHGTpNs" target="_blank" rel="noopener noreferrer">
          syphon.cc
        </a>
      </div>
    </nav>
  );
};

export default Navbar;