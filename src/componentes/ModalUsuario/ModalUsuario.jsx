// Importaciones
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom"; // 1. Importamos useNavigate
import { useUsuario } from "../../context/UsuarioContext";
import toast from "react-hot-toast";

const ModalUsuario = ({ onConfirm, onClose }) => {
  // Inicializo estados
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useUsuario();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ username: '', email: '', password: '' });
    setError(null);
  }, [isRegistering]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegistering) {
        await register(formData);
        await login({ email: formData.email, password: formData.password });
      } else {
        await login({ email: formData.email, password: formData.password });
      }
      
      onConfirm();// Cierro modal
      navigate("/");// Redirijo a inicio
    } catch (err) {

      // Muestro error
      const errorMessage = err.error || t('modal.errorGeneral');
      setError(errorMessage);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Formulario
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm animate-in fade-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isRegistering ? t('modal.tituloRegistro') : t('modal.tituloLogin')}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center font-medium">{error}</p>}

        {isRegistering && (
          <input
            required
            type="text"
            value={formData.username}
            placeholder={t('modal.userPlaceholder')}
            className="w-full mb-4 p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        )}

        <input
          required
          type="email"
          value={formData.email}
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-xl"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        
        <input
          required
          type="password"
          value={formData.password}
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-xl"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all disabled:opacity-50"
        >
          {loading ? t('modal.cargando') : (isRegistering ? t('modal.botonRegistro') : t('modal.botonLogin'))}
        </button>

        <p className="mt-4 text-center text-sm">
          {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
          <button type="button" className="text-orange-500 ml-1 font-bold" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default ModalUsuario;