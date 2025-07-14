import React from "react";
import "./Us.css";

const Us = () => {
  return (
    <section className="about-container">
      <div className="about-text">
        <h1>Sobre Nosotros</h1>
        <h3>LiverMed investiga y aprende</h3>
        <p>
          Somos un equipo multidisciplinario comprometido con la educación, prevención y tratamiento de las enfermedades del hígado.
          Nuestra misión es brindar información clara, confiable y actualizada para ayudar a pacientes, familiares y profesionales 
          de la salud a comprender mejor esta condición que afecta a millones de personas en el mundo.
        </p>
        <p>
          Con el apoyo de expertos desarrollamos contenidos y recursos interactivos que promueven el diagnóstico temprano, 
          los hábitos de vida saludable y el manejo adecuado del hígado. Creemos que la información es una herramienta poderosa
          para generar conciencia y mejorar la calidad de vida. Por eso, trabajamos cada día para construir un espacio accesible,
          humano y respaldado por evidencia científica.
        </p>
        <p>
          Nuestro objetivo es simple: ayudarte a entender tu salud hepática y ofrecerte las herramientas necesarias para cuidarla.
        </p>
      </div>
      <div className="about-image">
        <img src="/imagenes/medicos.png" alt="About Us" />
      </div>
    </section>
  );
};

export default Us;
