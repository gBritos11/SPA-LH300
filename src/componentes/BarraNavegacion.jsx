import { NavLink } from "react-router-dom";

//Funcion para estilos 
const estiloNavLink = ({isActive}) => 
    isActive ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
    : 'text-slate-600 hover:text-slate-900 transition-colors';

export const BarraNavegacion = () => {
    return (
        <nav className="sticky top-0 z-10 w-full bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between intems-center">
                <NavLink to="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-slate-800">
                        Destinos
                    </span>
                </NavLink>
                <div className="flex items-center gap-6">
                    <NavLink to="/" className={estiloNavLink} end>
                        Inicio
                    </NavLink>
                    <NavLink to="/favoritos" className={estiloNavLink}>
                        Favoritos
                    </NavLink>

                </div>
            </div>
        </nav>
    );
}

