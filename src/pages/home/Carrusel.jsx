import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Carrusel.css';

function Carousel({ images }) {
  const [selectedId, setSelectedId] = useState(images[0].id);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {images.map((image) => (
          <NavLink
            key={image.id}
            to={image.path} // Asegúrate de que cada objeto image tenga una propiedad 'path'
            className={`image-card ${selectedId === image.id ? 'selected' : ''}`}
            onMouseEnter={() => handleSelect(image.id)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedId === image.id}
          >
            <div className="image-container">
              <img src={image.src} alt={image.alt} />
            </div>
            <div className="image-name">
              <span>{image.name}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Carousel;