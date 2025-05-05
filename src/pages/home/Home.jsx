import { useMemo } from "react";
import { Suspense } from "react";
import { modelos } from "../../models/modelsMap";
import Carousel from './Carrusel';
import { images } from '../../data/images';
import "./Home.css";


const getRandomModelo1 = () => {
  const enfermedades = Object.keys(modelos);
  const random = Math.floor(Math.random() * enfermedades.length);
  const enfermedad = enfermedades[random];
  return modelos[enfermedad].Modelo1;
};

const Home = () => {
  const ModeloAleatorio = useMemo(() => getRandomModelo1(), []);

  return (
    <div>
      <section className="homePresentation">
        <div className="homeText">
          <h1>LiverMed</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur posuere nibh sit amet lacinia. Aliquam posuere, mi in suscipit ultrices, velit diam mollis quam, id rutrum risus mauris nec ligula. Pellentesque dignissim blandit mauris, eget interdum lectus convallis at.</p>
          <button className="BotonAprende">Aprende ahora</button>
        </div>

        <div className="presentationModel">
          <Suspense fallback={<div>Cargando modelo 3D...</div>}>
            <ModeloAleatorio />
          </Suspense>
        </div>
      </section>

      <section className="exploracion">
        <h1>Explora con total inmersión</h1>
        <Suspense fallback={<div>Cargando modelo 3d</div>}>      
              <img src="/imagenes/liver.png" alt="liver" />
        </Suspense>
      </section>

      <section className="enfermedadesComunes">
        <h1>Enfermedades comunes</h1>
        <Carousel images={images} />
      </section>
    </div>
  );
};

export default Home;
