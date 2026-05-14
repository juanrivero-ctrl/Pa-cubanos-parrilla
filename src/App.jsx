import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import LocationMap from './components/LocationMap';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [cartItems, setCartItems] = useState([]);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  const handleRemoveFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  return (
    <div className="app-container">
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <section className="hero-section">
          <div className="container hero-content">
            <p className="neon-text">"Al mal tiempo buena salsa"</p>
            <h1><span className="force-white">Bienvenido a</span> <span className="highlight-red">PA CUBANOS</span></h1>
            <p className="subtitle">El verdadero sabor en Jamundí</p>
          </div>
          <div className="fire-bg">
            <div className="fire-flames"></div>
          </div>
          <span className="floating-food f1">🥩</span>
          <span className="floating-food f2">🍔</span>
          <span className="floating-food f3">🌭</span>
          <span className="floating-food f4">🍟</span>
        </section>

        <Menu onAddToCart={handleAddToCart} />
        
        <LocationMap />
      </main>

      <Cart items={cartItems} onRemove={handleRemoveFromCart} />
    </div>
  );
}

export default App;
