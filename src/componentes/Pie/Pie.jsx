import { Link } from "react-router-dom";
import Boton from "../Boton/Boton"; 
import logo from "../../assets/logo.png"; // Logo de la tienda
import { useTranslation } from 'react-i18next';


const Pie = () => {
    const {t} = useTranslation();
  return (
    <footer className="bg-[#004080] text-white mt-10 shadow-inner">

        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-around md:items-center gap-2">    
            {/* Logo + Navegación */}
            <div className="flex flex-col items-center md:items-center">
                <img src={logo} alt="Logo tienda" className="w-20 h-auto" />
                <nav className="flex md:flex-row gap-3">
                <Link to="/">{t('navbar.inicio')}</Link>
                <Link to="/favoritos">{t('navbar.favoritos')}</Link>
                </nav>
            </div>

            {/* Redes Sociales */}
            <div className="flex flex-col items-center gap-3">
                <span className="font-semibold">{t('pie.siguenos')}</span>
                <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-naranja">
                    Facebook
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-naranja">
                    Instagram
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-naranja">
                    Twitter
                </a>
                </div>
            </div>
        </div>


        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center">
            {/* Copyright */}
            <div className="text-center text-sm text-gray-100">
            © {new Date().getFullYear()} TravelHub. {t('pie.derechos')}.
            </div>
        </div>
    </footer>
  );
};

export default Pie;
