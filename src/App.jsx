// Importaciones
import { useContext } from "react";
import { UsuarioProvider, UsuarioContext } from "./context/UsuarioContext";
import ModalUsuario from "./componentes/ModalUsuario/ModalUsuario"; 
import { Routes, Route } from "react-router-dom";
import { BarraNavegacion } from "./componentes/BarraNavegacion/BarraNavegacion";
import { FavoritosProvider } from "./context/entornoFavoritos";
import Pie from "./componentes/Pie/Pie";
import Inicio from './paginas/Inicio';
import Detalles from "./paginas/Detalles";
import Favoritos from "./paginas/Favoritos";
import Error from "./paginas/Error";
import MensajesApp from "./componentes/MensajesApp/MensajesApp";
import { Toaster } from 'react-hot-toast';

const AppContent = () => {
  const { usuario, cargando } = useContext(UsuarioContext);

  // Si el contexto todavía está verificando la sesión, mostramos spinner
  if (cargando) return <MensajesApp tipo="cargando" />

  return (
    <>
      <FavoritosProvider>
        {/* Si no hay usuario y ya terminó de cargar, mostramos el modal */}
        {!usuario && <ModalUsuario onConfirm={() => {}} />}
        
        <div className={!usuario ? "blur-sm pointer-events-none" : ""}>
          <BarraNavegacion />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="destino/:id" element={<Detalles/>} />
            <Route path="favoritos" element={<Favoritos/>} />
            <Route path="*" element={<Error/>} />
          </Routes>
          <Pie />
        </div>
      </FavoritosProvider>
    </>
  );
};

const App = () => {
  return (
    <UsuarioProvider>
      <AppContent />
      <Toaster />
    </UsuarioProvider>
  );
};

export default App;