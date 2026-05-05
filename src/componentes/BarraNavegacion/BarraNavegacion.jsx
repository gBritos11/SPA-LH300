import { NavLink } from "react-router-dom";
import { Heart, User } from "lucide-react"; // User para perfil(nombre)
import Boton from "../Boton/Boton"; // Importo el componente por si a futuro agregarmos botones al navbar
import logoImg from "./../../assets/logo.png";
import { useContext } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import useFavoritos from "./../../hooks/useFavoritos";
import { useTranslation } from 'react-i18next'; 

const estiloNavLink = ({ isActive }) => 
    isActive 
        ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 flex items-center gap-2 transition-all'
        : 'text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors'
;

export const BarraNavegacion = () => {

    const { usuario } = useContext(UsuarioContext);
    const { favoritos } = useFavoritos();
    const { t, i18n } = useTranslation();

    const cambiarIdioma = () => {
        const nuevoIdioma = i18n.language === 'es' ? 'en' : 'es'
        i18n.changeLanguage(nuevoIdioma)
    }

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#004080] shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
                
                <NavLink to="/" className="flex items-center">
                    <img 
                        src={logoImg} 
                        alt="TravelHub Logo" 
                        className="h-15 w-auto object-contain hover:opacity-80 transition-opacity" 
                    />
                </NavLink>

                 {/* 🔹 Aquí se muestra el saludo si hay usuario */}
                {usuario && (
                    <div className="flex items-center gap-2 text-slate-700">
                    <User size={20} />
                    <span>{t('navbar.hola')}, {usuario}</span>
                    </div>
                )}

                <div className="flex items-center gap-8">
                    <button 
                        onClick={cambiarIdioma}
                        className="text-white font-semibold text-sm border border-white rounded-full px-3 py-1 hover:bg-white hover:text-[#004080] transition-colors"
                    >
                        {i18n.language === 'es' ? 'EN' : 'ES'}
                    </button>

                    <NavLink 
                        to="/favoritos" 
                        className="flex items-center gap-2 text-white hover:text-orange-600 transition-colors"
                    >
                        {({ isActive }) => (
                        <>
                            <div className="relative">
                            <Heart size={20} className={isActive ? "fill-current text-naranja" : "stroke-current text-naranja"} />
                            {favoritos.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {favoritos.length}
                                </span>
                            )}
                        </div>
                            <span className="hidden sm:inline">{t('navbar.favoritos')}</span>
                        </>
                        )}
                    </NavLink>

                </div>
            </div>
        </nav>
    );
};