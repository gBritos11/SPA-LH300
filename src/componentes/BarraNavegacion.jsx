import { Link } from "react-router-dom";

const BarraNavegacion = () => {
    return (
        <nav className="sticky top-0 z-10 w-full bg-grey shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2" >
                 {/* <img src="/logo.png" alt="Logo" className="h-8" /> */}
                    <span className="text-xl font-bold text-slate-800">
                        Destinos
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="text-slate-600 hoover:text-slate-900 transition-colors"> 
                        Inicio
                    </Link>
                    <Link to="/" className="text-slate-600 hoover:text-slate-900 transition-colors">
                        Favoritos
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default BarraNavegacion;