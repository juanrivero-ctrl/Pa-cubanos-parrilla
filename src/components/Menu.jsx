import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import './Menu.css';

const PRODUCTS = [
  // ASADOS
  { id: 1, category: 'Asados', name: 'Filete de Pechuga', price: 18000, description: 'Jugoso filete de pechuga a la brasa, marinado con hierbas finas.', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80' },
  { id: 2, category: 'Asados', name: 'Churrasco', price: 32000, description: 'Corte premium de res a la parrilla, tierno y en su punto.', image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/17/2b/63/dd/churrasco-350-gramos.jpg' },
  { id: 3, category: 'Asados', name: 'Costilla Asada o BBQ', price: 30000, description: 'Costillas de cerdo premium, bañadas en nuestra salsa BBQ secreta.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { id: 4, category: 'Asados', name: 'Plato Americano', price: 28000, description: 'Combinación perfecta de carnes asadas con acompañamientos tradicionales.', image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80' },

  // HAMBURGUESAS
  { id: 5, category: 'Hamburguesas', name: 'Hamburguesa Sencilla', price: 15000, description: 'Carne artesanal, queso fundido y vegetales frescos.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', hasSauces: true },
  { id: 6, category: 'Hamburguesas', name: 'Hamburguesa Especial', price: 22000, description: 'Carne premium, tocineta crocante y huevo frito.', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80', hasSauces: true },
  { id: 7, category: 'Hamburguesas', name: 'Hamburguesa Super', price: 28000, description: 'Doble carne, extra queso, tocineta y jamón.', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80', hasSauces: true },
  { id: 8, category: 'Hamburguesas', name: 'Hamburguesa Angus 150g + Papas', price: 26000, description: 'Carne 100% Angus certificada con papas a la francesa.', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80', hasSauces: true },
  { id: 9, category: 'Hamburguesas', name: 'Hamburguesa Angus 300g + Papas', price: 36000, description: 'Doble carne Angus para los más exigentes, incluye papas.', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80', hasSauces: true },

  // PERROS
  { id: 10, category: 'Perros', name: 'Perro Sencillo', price: 12000, description: 'Salchicha tipo americana con ripio de papa y salsas.', image: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?auto=format&fit=crop&w=800&q=80', hasSauces: true },
  { id: 11, category: 'Perros', name: 'Perro Especial', price: 18000, description: 'Con queso mozzarella fundido y tocineta picada.', image: 'https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=800&q=80', hasSauces: true },
  { id: 12, category: 'Perros', name: 'Perro Super', price: 24000, description: 'Cargado con jamón, queso, tocineta y huevo de codorniz.', image: 'https://www.la-unica.com/images/salchicha_americana.jpg', hasSauces: true },

  // PICADAS AL BARRIL
  { id: 13, category: 'Picadas', name: 'Picada X1', price: 25000, description: 'Porción individual con carne al barril, papa y arepa.', image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=800&q=80' },
  { id: 14, category: 'Picadas', name: 'Picada X2', price: 45000, description: 'Ideal para compartir en pareja, carnes premium al barril.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiQ6QuNKe8vZQLu-e6mXhlnC_brt4L8AgCww&s' },
  { id: 15, category: 'Picadas', name: 'Picada X3', price: 65000, description: 'Variedad de carnes y acompañamientos para 3 personas.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiQ6QuNKe8vZQLu-e6mXhlnC_brt4L8AgCww&s' },
  { id: 16, category: 'Picadas', name: 'Picada X4', price: 85000, description: 'Gran banquete al barril para un grupo de 4.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' },
  { id: 17, category: 'Picadas', name: 'Picada X6', price: 120000, description: 'Nuestra picada más grande, perfecta para toda la familia.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' },

  // SANDWICH
  { id: 18, category: 'Sandwich', name: 'Sandwich Sencillo', price: 14000, description: 'Pan cubano tostado con jamón, queso y mostaza.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80' },
  { id: 19, category: 'Sandwich', name: 'Sandwich Especial', price: 20000, description: 'Con doble carne, extra queso mozzarella y vegetales.', image: 'https://images.unsplash.com/photo-1553909489-cd47e0907d3c?auto=format&fit=crop&w=800&q=80' },
  { id: 20, category: 'Sandwich', name: 'Sandwich de Bondiola de Cerdo', price: 24000, description: 'Bondiola de cerdo desmechada cocinada a fuego lento.', image: 'https://images.unsplash.com/photo-1509722747041-619f383b4fa4?auto=format&fit=crop&w=800&q=80' },

  // SALCHIPAPAS
  { id: 21, category: 'Salchipapas', name: 'Salchipapa Sencilla', price: 15000, description: 'Papas fritas con salchicha manguera y salsas.', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80', hasSauces: true },
  { id: 22, category: 'Salchipapas', name: 'Salchipapa Gratinada', price: 20000, description: 'Con abundante queso fundido gratinado encima.', image: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=800&q=80', hasSauces: true },
  { id: 23, category: 'Salchipapas', name: 'Salchipapa Especial', price: 25000, description: 'Con pollo desmechado, tocineta y maíz tierno.', image: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=800&q=80', hasSauces: true },
  { id: 24, category: 'Salchipapas', name: 'Salchipapa Super', price: 32000, description: 'Nuestra versión más completa con todas las carnes.', image: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=800&q=80', hasSauces: true }
];

const CATEGORIES = ['Todos', 'Asados', 'Hamburguesas', 'Perros', 'Picadas', 'Sandwich', 'Salchipapas'];

export default function Menu({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProducts = activeCategory === 'Todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleConfirmAdd = (customizedProduct) => {
    onAddToCart(customizedProduct);
    setSelectedProduct(null);
  };

  return (
    <section className="menu-section container">
      <h2 className="section-title">Nuestro Menú</h2>

      <div className="category-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={() => handleProductClick(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={handleConfirmAdd}
        />
      )}
    </section>
  );
}
