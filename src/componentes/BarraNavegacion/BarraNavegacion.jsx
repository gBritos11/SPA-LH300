import { NavLink } from "react-router-dom";
import { Heart, User } from "lucide-react";
import logoImg from "./../../assets/logo.png";
import { useContext } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import useFavoritos from "./../../hooks/useFavoritos";
import { useTranslation } from 'react-i18next';

export const BarraNavegacion = () => {
    const { usuario } = useContext(UsuarioContext);
    const { favoritos } = useFavoritos();
    const { t, i18n } = useTranslation();

    const cambiarIdioma = () => {
        const nuevoIdioma = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(nuevoIdioma);
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#0a1628] border-b border-white/10 shadow-lg backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

                {/* LOGO */}
                <NavLink to="/" className="flex items-center">
                    <img 
                        src={logoImg} 
                        alt="TravelHub Logo" 
                        className="h-12 w-auto object-contain hover:opacity-80 transition-opacity" 
                    />
                </NavLink>

                {/* SALUDO */}
                {usuario && (
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                        <User size={16} />
                        <span>{t('navbar.hola')}, <span className="text-white font-medium">{usuario}</span></span>
                    </div>
                )}

                {/* ACCIONES */}
                <div className="flex items-center gap-6">

                    {/* TOGGLE IDIOMA */}
                    <button 
                        onClick={cambiarIdioma}
                        className="text-white/70 hover:text-white text-sm font-medium tracking-widest transition-colors"
                    >
                        {i18n.language === 'es' ? 'EN' : 'ES'}
                    </button>

                    {/* FAVORITOS */}
                    <NavLink 
                        to="/favoritos" 
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                        {({ isActive }) => (
                            <>
                                <div className="relative">
                                    <Heart 
                                        size={20} 
                                        className={isActive ? "fill-orange-400 text-orange-400" : "stroke-current"} 
                                    />
                                    {favoritos.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                            {favoritos.length}
                                        </span>
                                    )}
                                </div>
                                <span className="hidden sm:inline text-sm font-medium">
                                    {t('navbar.favoritos')}
                                </span>
                            </>
                        )}
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};