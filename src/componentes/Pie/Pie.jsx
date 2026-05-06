import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useTranslation } from 'react-i18next';

const Pie = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-[#0a1628] text-gray-500 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

                {/* LOGO + NAV */}
                <div className="flex items-center gap-6">
                    <img src={logo} alt="TravelHub" className="h-7 w-auto opacity-80" />
                    <nav className="flex gap-5 text-xs">
                        <Link to="/" className="hover:text-white transition-colors duration-200">
                            {t('navbar.inicio')}
                        </Link>
                        <Link to="/favoritos" className="hover:text-white transition-colors duration-200">
                            {t('navbar.favoritos')}
                        </Link>
                    </nav>
                </div>

                {/* COPYRIGHT */}
                <p className="text-xs text-gray-600 text-center">
                    © {new Date().getFullYear()} TravelHub — {t('pie.derechos')}
                </p>

                {/* REDES */}
                <div className="flex items-center gap-5 text-xs">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                       className="hover:text-white transition-colors duration-200">Facebook</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                       className="hover:text-white transition-colors duration-200">Instagram</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                       className="hover:text-white transition-colors duration-200">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Pie;