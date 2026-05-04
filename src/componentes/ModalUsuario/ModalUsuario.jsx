import { useState } from "react";

const ModalUsuario = ({ onConfirm }) => {
  const [usuario, setUsuario] = useState("");

  const handleConfirm = () => {
    localStorage.setItem("usuario", usuario);
    onConfirm(usuario);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Ingresa tu nombre</h2>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Tu nombre..."
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleConfirm}
          disabled={usuario.length < 3}
          className={`w-full py-2 rounded ${
            usuario.length < 3
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          }`}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default ModalUsuario;
