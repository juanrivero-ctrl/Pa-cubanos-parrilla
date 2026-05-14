import React from 'react';
import './ProductCard.css';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card glass">
      <div className="product-image-container">
        <span className="product-category-badge">{product.category}</span>
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString()}</p>
        <p className="product-description">{product.description}</p>
        <button className="btn-primary add-btn" onClick={() => onAdd(product)}>
          Agregar al Pedido
        </button>
      </div>
    </div>
  );
}
