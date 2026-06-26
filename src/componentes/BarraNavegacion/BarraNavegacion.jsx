import { NavLink } from "react-router-dom";
import { Heart, User, LogOut, PlusCircle } from "lucide-react";
import logoImg from "./../../assets/logo.png";
import { useContext, useState } from "react"; 
import { UsuarioContext } from "../../context/UsuarioContext";
import useFavoritos from "./../../hooks/useFavoritos";
import { useTranslation } from 'react-i18next';
import { ModalCrearDestino } from "../ModalCrearDestino/ModalCrearDestino";

export const BarraNavegacion = () => {
    const { usuario, logout } = useContext(UsuarioContext);
    const { favoritos } = useFavoritos();
    const { t, i18n } = useTranslation();

    const [modalAbierto, setModalAbierto] = useState(false);

    const cambiarIdioma = () => {
        const nuevoIdioma = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(nuevoIdioma);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-[#0a1628] border-b border-white/10 shadow-lg backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    
                    {/* Logo */}
                    <div className="flex-1">
                        <NavLink to="/" className="flex items-center">
                            <img src={logoImg} alt="Logo" className="h-12 w-auto" />
                        </NavLink>
                    </div>

                    {/* Saludo */} 
                    <div className="flex-1 flex justify-center">
                        {usuario && (
                            <div className="flex items-center gap-3 text-white/80 text-sm bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                                <User size={16} />
                                <span>{t('navbar.hola')}, <span className="text-orange-400 font-bold">{usuario.username}</span></span>
                            </div>
                        )}
                    </div>

                    {/* Acciones (Derecha) */}
                    <div className="flex-1 flex justify-end items-center gap-6">

                        {/* BOTÓN ADMINISTRADOR */}
                        {usuario?.role === 'ADMIN' && (
                            <button
                                onClick={() => setModalAbierto(true)}
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-orange-500/20 transform hover:-y-0.5 cursor-pointer"
                            >
                                <PlusCircle size={16} />
                                {t('navbar.añadir_destino') || "Cargar Destino"}
                            </button>
                        )}

                        {/* Favoritos */}
                        <NavLink to="/favoritos" className="text-white/70 hover:text-white transition-colors">
                            <div className="relative">
                                <Heart size={24} />
                                {favoritos.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">{favoritos.length}</span>}
                            </div>
                        </NavLink>
                        
                        {/* Toggle Switch */}
                        <button 
                            onClick={cambiarIdioma}
                            className="relative flex items-center justify-between w-16 h-8 px-1 bg-gray-700 rounded-full transition-colors hover:bg-gray-600 focus:outline-none"
                        >
                            <div className={`absolute left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 transform ${i18n.language === 'en' ? 'translate-x-8' : 'translate-x-0'}`}></div>
                            <span className="text-[10px] font-bold text-white z-10 ml-1">ES</span>
                            <span className="text-[10px] font-bold text-white z-10 mr-1">EN</span>
                        </button>

                        {/* logout */}
                        <button onClick={logout} className="text-white/70 hover:text-white"><LogOut size={24} /></button>

                    </div>
                </div>
            </nav>

            {/* MODAL CREAR DESTINO */}
            <ModalCrearDestino 
                isOpen={modalAbierto} 
                onClose={() => setModalAbierto(false)} 
            />
        </>
    );
};