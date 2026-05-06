import { useState, useEffect } from "react"; // Agregamos useEffect
import { useTranslation } from 'react-i18next';

const ModalUsuario = ({ onConfirm }) => {
  const [usuario, setUsuario] = useState("");
  const { t } = useTranslation();

  // 🔒 Bloquear el scroll del body mientras el modal esté montado
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleConfirm = () => {
    if (usuario.length >= 3) {
      localStorage.setItem("usuario", usuario);
      onConfirm(usuario);
    }
  };

  return (
    /* OVERLAY: "backdrop-blur-sm" crea el efecto de vidrio esmerilado */
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      
      {/* CONTENEDOR DEL MODAL: Animado y con sombra profunda */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm animate-in fade-in zoom-in-95 duration-300">
        
        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
          {t('modal.titulo')}
        </h2>
        
        <p className="text-sm text-gray-500 mb-6 text-center">
          Tu aventura comienza aquí.
        </p>

        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder={t('modal.placeholder')}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        />

        <button
          onClick={handleConfirm}
          disabled={usuario.length < 3}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            usuario.length < 3
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-orange-200 active:scale-95"
          }`}
        >
          {t('modal.boton')}
        </button>

      </div>
    </div>
  );
};

export default ModalUsuario;