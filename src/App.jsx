import { Routes, Route } from "react-router-dom";

import Pie from "./componentes/Pie";
import BarraNavegacion from "./componentes/BarraNavegacion";

import Inicio from './paginas/Inicio';
import Detalles from "./paginas/Detalles";
import Favoritos from "./paginas/Favoritos";
import Error from "./paginas/Error";

const App = () => {
  return (
    <>
      <BarraNavegacion />
      <Routes>
        {/*
          RUTA PADRE: renderiza el Layout.
          Todas las rutas que estén anidadas adentro van a aparecer
          dentro del <Outlet /> del Layout.
          path="/" significa que aplica a cualquier URL que empiece con /
        */}
        <Route path="/" element={<Inicio />} />

        {/*
          RUTA INDEX: se activa cuando la URL es exactamente "/"
          Es la página de inicio. La palabra "index" es especial en
          react-router-dom, equivale a path="/" pero sin conflicto.
        */}

        {/* RUTA DINÁMICA: el ":id" captura cualquier valor en esa posición.
            /producto/1   → id = "1"
            /producto/42  → id = "42"
            /producto/abc → id = "abc"
            El componente Detalles puede leer ese valor con useParams() 
        */}
        <Route path="detalle/:id" element={<Detalles/>} />

        {/* RUTA FIJA: solo se activa cuando la URL es "/favoritos" */}
        <Route path="favoritos" element={<Favoritos/>} />

        {/*
            CATCH-ALL: el "*" captura CUALQUIER ruta que no haya
            hecho match con las anteriores.
            /test, /blabla, /ruta-que-no-existe → muestra Error
            SIEMPRE tiene que ir al final, de lo contrario podría
            interceptar rutas que deberían matchear con otra regla.
        */}

        <Route path="*" element={<Error/>} />

      </Routes>
      <Pie />
    </>
    
  )
}

export default App