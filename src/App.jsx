import { useContext } from "react";
import { UsuarioProvider, UsuarioContext } from "./context/UsuarioContext";
import ModalUsuario from "./componentes/ModalUsuario/ModalUsuario"; 

import { Routes, Route } from "react-router-dom";
import { BarraNavegacion } from "./componentes/BarraNavegacion/BarraNavegacion";
import Pie from "./componentes/Pie/Pie";
import Inicio from './paginas/Inicio';
import Detalles from "./paginas/Detalles";
import Favoritos from "./paginas/Favoritos";
import Error from "./paginas/Error";

const AppContent = () => {
  const { usuario, setUsuario } = useContext(UsuarioContext);

  return (
    <>
      {/* Mostrar modal si no hay usuario */}
      {!usuario && <ModalUsuario onConfirm={setUsuario} />}

      <div className={!usuario ? "blur-sm pointer-events-none" : ""}>
        <BarraNavegacion />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="destino/:id" element={<Detalles />} />
          <Route path="favoritos" element={<Favoritos />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Pie />
      </div>
    </>
  );
};

const App = () => {
  return (
    <UsuarioProvider>
      <AppContent />
    </UsuarioProvider>
  );
};

export default App