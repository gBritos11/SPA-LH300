import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MapPinOff } from 'lucide-react';

const Error = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">

            {/* ÍCONO */}
            <div className="p-5 bg-orange-50 rounded-full mb-6">
                <MapPinOff size={36} className="text-orange-400" />
            </div>

            {/* TEXTO */}
            <h1 className="text-6xl font-bold text-gray-900 tracking-tight mb-2">
                404
            </h1>
            <p className="text-lg font-semibold text-gray-700 mb-2">
                {t('error.titulo')}
            </p>
            <p className="text-gray-400 text-sm mb-8 max-w-sm">
                {t('error.parrafo')}
            </p>

            {/* BOTÓN */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-6 py-3 bg-[#0a1628] text-white text-sm font-medium rounded-xl hover:bg-[#0a1628]/80 transition-colors duration-200"
            >
                {t('detalles.volver')}
            </button>
        </div>
    );
};

export default Error;