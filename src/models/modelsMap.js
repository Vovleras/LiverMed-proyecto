// modelsMap.js
import { lazy } from "react";

export const modelos = {
  cirrosis: {
    Modelo1: lazy(() => import("./cirrosis/Modelo1.jsx")),
    Modelo2: lazy(() => import("./cirrosis/Modelo2.jsx")),
    Modelo3: lazy(() => import("./cirrosis/Modelo3.jsx")),
    Modelo4: lazy(() => import("./cirrosis/Modelo4.jsx")),
  },
  cancer: {
    Modelo1: lazy(() => import("./cancer/Modelo1.jsx")),
    Modelo2: lazy(() => import("./cancer/Modelo2.jsx")),
    Modelo3: lazy(() => import("./cancer/Modelo3.jsx")),
    Modelo4: lazy(() => import("./cancer/Modelo4.jsx")),
  },
  hepatitis: {
    Modelo1: lazy(() => import("./hepatitis/Modelo1.jsx")),
    Modelo2: lazy(() => import("./hepatitis/Modelo2.jsx")),
    Modelo3: lazy(() => import("./hepatitis/Modelo3.jsx")),
    Modelo4: lazy(() => import("./hepatitis/Modelo4.jsx")),
  },
  higadoGraso: {
    Modelo1: lazy(() => import("./higadoGraso/Modelo1.jsx")),
    Modelo2: lazy(() => import("./higadoGraso/Modelo2.jsx")),
    Modelo3: lazy(() => import("./higadoGraso/Modelo3.jsx")),
    Modelo4: lazy(() => import("./higadoGraso/Modelo4.jsx")),
  },
};
