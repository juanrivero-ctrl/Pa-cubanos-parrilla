import React from 'react';
import './LocationMap.css';

export default function LocationMap() {
  return (
    <section className="map-section container">
      <h2 className="section-title">Encuéntranos</h2>
      <div className="map-container glass">
        <iframe
          title="Ubicación PA CUBANOS"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15933.243577777017!2d-76.539225!3d3.260447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a1000b522bf1%3A0x6d8b9d6eb4cfcd10!2sCiudad%20Sur%2C%20Jamund%C3%AD%2C%20Valle%20del%20Cauca!5e0!3m2!1ses!2sco!4v1715440000000!5m2!1ses!2sco"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="map-info">
          <h3>Sede Principal</h3>
          <p>📍 Ciudad Sur, Jamundí, Valle del Cauca</p>
          <p>¡Te esperamos con el mejor sabor cubano!</p>
        </div>
      </div>
    </section>
  );
}
