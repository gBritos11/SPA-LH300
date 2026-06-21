import { useState, useCallback, useMemo } from 'react';
import useDestinos from '../hooks/useDestinos';
import useScrollInfinito from '../hooks/useScrollInfinito';
import Tarjeta from './../componentes/Tarjeta/Tarjeta';
import { useNavigate } from "react-router-dom";
import MensajesApp from "../componentes/MensajesApp/MensajesApp";
import Boton from '../componentes/Boton/Boton';
import Busqueda from '../componentes/Busqueda/Busqueda';
import Ranking from '../componentes/Ranking/Ranking';
import { useTranslation } from 'react-i18next';
import BannerCarrusel from "../componentes/BannerCarrusel/BannerCarrusel";

const NOMBRES_CAMPO = {
    search: 'todos los campos',
    country: 'país',
    location: 'ubicación',
    description: 'descripción'
};

const Inicio = () => {
    const [filtro, setFiltro] = useState('');
    const [campoFiltro, setCampoFiltro] = useState('search');
    
    // Consumo directo y limpio hacia el Hook (usa los valores nativos en inglés)
    const { destinos, loading, cargandoMas, error, setPagina, tieneMas } = useDestinos(filtro, campoFiltro);
    
    const navigate = useNavigate();
    const { t } = useTranslation();

    const imagenesBanner = useMemo(() => [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"
    ], []);

    const cargarMas = useCallback(() => {
        setPagina(prev => prev + 1);
    }, [setPagina]);

    const refObservador = useScrollInfinito(cargarMas, tieneMas && !loading && !cargandoMas);

    if (loading && destinos.length === 0 && !filtro) {
        return <MensajesApp tipo="cargando" />;
    }

    if (error) return (
        <MensajesApp tipo="error" detalle={error}>
            <Boton onClick={() => window.location.reload()}>
                {t('detalles.reintentar')}
            </Boton>
        </MensajesApp>
    );

    const mensajeVacio = filtro
        ? `${t('mensajes.sin_resultados')} ${NOMBRES_CAMPO[campoFiltro] || campoFiltro} para "${filtro}"`
        : t('mensajes.vacio');

    return (
        <div className="w-full">
            <BannerCarrusel imagenes={imagenesBanner} />
            
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* ENCABEZADO */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                        {t('inicio.titulo')}
                    </h1>
                    <p className="text-gray-400 mt-2">
                        {t('inicio.encabezado')}
                    </p>
                </div>

                {/* BUSCADOR */}
                <div className="mb-10 flex justify-center">
                    <Busqueda
                        valor={filtro} 
                        onChange={setFiltro} 
                        campoFiltro={campoFiltro}
                        onCampoChange={setCampoFiltro}
                    />
                </div>

                {/* CONTENIDO */}
                <div className="flex flex-col lg:flex-row gap-10 items-start">

                    {/* GRILLA */}
                    <div className="flex-1">
                        {destinos.length === 0 && !loading && !cargandoMas ? (
                            <MensajesApp tipo="vacio" mensaje={mensajeVacio} />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {destinos.map((destino) => (
                                    <Tarjeta
                                        key={destino.id}
                                        destino={destino}
                                        action={() => navigate(`/destino/${destino.id}`)}
                                    />
                                ))}
                            </div>
                        )}

                        {/* SCROLL INFINITO */}
                        <div className="h-20 flex items-center justify-center mt-4">
                            {cargandoMas && (
                                <div className="flex items-center gap-3">
                                    <div className="animate-spin rounded-full h-5 w-5 border-4 border-orange-100 border-t-orange-500" />
                                    <p className="text-gray-400 text-sm">{t('inicio.cargando_mas')}</p>
                                </div>
                            )}
                            {!tieneMas && !cargandoMas && destinos.length > 0 && (
                                <p className="text-gray-300 text-sm tracking-wide">
                                    {t('inicio.fin_lista')}
                                </p>
                            )}
                        </div>

                        {/* CENTINELA */}
                        <div ref={refObservador} className="h-4" />
                    </div>

                    {/* RANKING */}
                    <Ranking />
                </div>
            </div>
        </div>
    );
};

export default Inicio;