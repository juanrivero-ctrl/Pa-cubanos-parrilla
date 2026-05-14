import React, { useState } from 'react';
import './ProductModal.css';

const SAUCES = ['Tomate', 'Mayonesa', 'Mostaza', 'Ajo', 'Piña'];

export default function ProductModal({ product, onClose, onConfirm }) {
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [notes, setNotes] = useState('');

  const toggleSauce = (sauce) => {
    setSelectedSauces(prev => 
      prev.includes(sauce) 
        ? prev.filter(s => s !== sauce)
        : [...prev, sauce]
    );
  };

  const handleConfirm = () => {
    onConfirm({
      ...product,
      cartId: Date.now(), // unique ID for cart
      sauces: selectedSauces,
      notes
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <button className="close-btn btn-icon" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Personaliza tu {product.name}</h2>
        <p className="modal-description">{product.description}</p>
        
        {product.hasSauces && (
          <div className="sauces-section">
            <h3>Selecciona tus salsas</h3>
            <div className="sauces-grid">
              {SAUCES.map(sauce => (
                <label key={sauce} className="sauce-label">
                  <input 
                    type="checkbox" 
                    checked={selectedSauces.includes(sauce)}
                    onChange={() => toggleSauce(sauce)}
                  />
                  <span className="sauce-name">{sauce}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="notes-section">
          <h3>Notas adicionales</h3>
          <textarea 
            placeholder="Ej: Sin cebolla, extra queso..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="notes-input"
            rows="3"
          />
        </div>

        <button className="btn-primary confirm-btn" onClick={handleConfirm}>
          Añadir al Pedido - ${product.price.toLocaleString()}
        </button>
      </div>
    </div>
  );
}
