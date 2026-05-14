import React from 'react';
import './Header.css';

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="header glass">
      <div className="container header-content">
        <div className="logo-container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWWLo-z9li41X1sX90tGjdVxz1oc7hYh9vMg&s" alt="PA CUBANOS Logo" className="logo" />
        </div>
        <button onClick={toggleTheme} className="btn-icon theme-toggle" aria-label="Toggle Theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
