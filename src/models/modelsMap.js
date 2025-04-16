// modelsMap.js
import { lazy } from "react";

export const modelos = {
  cirrosis: {
    Modelo1: lazy(() => import("./cirrosis/modelo1/Modelo1.jsx")),
    Modelo2: lazy(() => import("./cirrosis/modelo2/Modelo2.jsx")),
    Modelo3: lazy(() => import("./cirrosis/modelo3/Modelo3.jsx")),
    Modelo4: lazy(() => import("./cirrosis/modelo4/Modelo4.jsx")),
  },
  cancer: {
    Modelo1: lazy(() => import("./cancer/modelo1/Modelo1.jsx")),
    Modelo2: lazy(() => import("./cancer/modelo2/Modelo2.jsx")),
    Modelo3: lazy(() => import("./cancer/modelo3/Modelo3.jsx")),
    Modelo4: lazy(() => import("./cancer/modelo4/Modelo4.jsx")),
  },
  hepatitis: {
    Modelo1: lazy(() => import("./hepatitis/modelo1/Modelo1.jsx")),
    Modelo2: lazy(() => import("./hepatitis/modelo2/Modelo2.jsx")),
    Modelo3: lazy(() => import("./hepatitis/modelo3/Modelo3.jsx")),
    Modelo4: lazy(() => import("./hepatitis/modelo4/Modelo4.jsx")),
  },
  higadoGraso: {
    Modelo1: lazy(() => import("./higadoGraso/modelo1/Modelo1.jsx")),
    Modelo2: lazy(() => import("./higadoGraso/modelo2/Modelo2.jsx")),
    Modelo3: lazy(() => import("./higadoGraso/modelo3/Modelo3.jsx")),
    Modelo4: lazy(() => import("./higadoGraso/modelo4/Modelo4.jsx")),
  },
};
