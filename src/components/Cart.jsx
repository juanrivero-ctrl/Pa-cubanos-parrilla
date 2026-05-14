import React, { useState } from 'react';
import './Cart.css';

const PHONE_NUMBER = "573508668446";

export default function Cart({ items, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'Nequi'
  });

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Por favor completa todos los campos de envío.");
      return;
    }

    let message = "🍔 *NUEVO PEDIDO - PA CUBANOS*\n\n";
    message += `👤 *Cliente:* ${formData.name}\n`;
    message += `📍 *Dirección:* ${formData.address}\n`;
    message += `📞 *Teléfono:* ${formData.phone}\n`;
    message += `💳 *Método de Pago:* ${formData.paymentMethod}\n\n`;
    message += "📝 *Detalle del Pedido:*\n";
    
    items.forEach((item, index) => {
      message += `• ${item.name} - $${item.price.toLocaleString()}\n`;
      if (item.sauces && item.sauces.length > 0) {
        message += `   _Salsas: ${item.sauces.join(', ')}_\n`;
      }
      if (item.notes) {
        message += `   _Notas: ${item.notes}_\n`;
      }
    });

    message += `\n💰 *Total a Pagar: $${total.toLocaleString()}*\n\n¡Gracias por elegirnos! 🇨🇺`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  if (itemCount === 0) return null;

  return (
    <>
      {/* Floating Cart Button */}
      <button 
        className="floating-cart-btn" 
        onClick={() => setIsOpen(true)}
        aria-label="Abrir carrito"
      >
        <span className="cart-icon">🛒</span>
        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
      </button>

      {/* Cart Drawer Overlay */}
      {isOpen && (
        <div className="cart-overlay" onClick={() => setIsOpen(false)}>
          <div className="cart-drawer glass" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2 className="cart-title">Tu Pedido</h2>
              <button className="btn-icon close-cart" onClick={() => setIsOpen(false)}>&times;</button>
            </div>

            <div className="cart-content">
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.cartId} className="cart-item">
                    <div className="cart-item-info">
                      <span className="item-name">{item.name}</span>
                      {item.sauces && item.sauces.length > 0 && (
                        <div className="item-details">Salsas: {item.sauces.join(', ')}</div>
                      )}
                      {item.notes && <div className="item-details">Notas: {item.notes}</div>}
                      <span className="item-price">${item.price.toLocaleString()}</span>
                    </div>
                    <button className="btn-icon remove-btn" onClick={() => onRemove(item.cartId)}>
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              {itemCount > 0 && (
                <div className="checkout-section">
                  <h3>Datos de Entrega</h3>
                  <form onSubmit={handleCheckout} className="checkout-form">
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="Nombre Completo" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="address" 
                        placeholder="Dirección de Entrega" 
                        required 
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Teléfono" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Método de Pago</label>
                      <select 
                        name="paymentMethod" 
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                      >
                        <option value="Nequi">Nequi</option>
                        <option value="Bancolombia">Bancolombia</option>
                        <option value="Efectivo">Efectivo</option>
                      </select>
                    </div>
                    
                    <div className="cart-footer">
                      <div className="cart-total">
                        <span>Total:</span>
                        <span>${total.toLocaleString()}</span>
                      </div>
                      <button type="submit" className="btn-primary checkout-btn">
                        Pedir por WhatsApp 🚀
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
