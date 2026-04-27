import { NavLink } from "react-router-dom";
import { Heart, User } from "lucide-react"; // User para perfil(nombre)
import Boton from "../Boton/Boton"; // Importo el componente por si a futuro agregarmos botones al navbar
import logoImg from "./../../assets/logo.png";

const estiloNavLink = ({ isActive }) => 
    isActive 
        ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 flex items-center gap-2 transition-all'
        : 'text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors';

export const BarraNavegacion = () => {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
                
                <NavLink to="/" className="flex items-center">
                    <img 
                        src={logoImg} 
                        alt="TravelHub Logo" 
                        className="h-15 w-auto object-contain hover:opacity-80 transition-opacity" 
                    />
                </NavLink>

                <div className="flex items-center gap-8">
                    
                    <NavLink to="/favoritos" className={estiloNavLink}>
                        <Heart size={20} />
                        <span className="hidden sm:inline">Favoritos</span>
                    </NavLink>

                </div>
            </div>
        </nav>
    );
};