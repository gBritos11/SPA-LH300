import { useState, useCallback } from 'react';
import useDestinos  from '../hooks/useDestinos';
import useScrollInfinito from '../hooks/useScrollInfinito';
import Tarjeta from './../componentes/Tarjeta/Tarjeta'
import { useNavigate } from "react-router-dom";
import MensajesApp from "../componentes/MensajesApp/MensajesApp"
import Boton from '../componentes/Boton/Boton';
import Busqueda from '../componentes/Busqueda/Busqueda';
import Ranking from '../componentes/Ranking/Ranking';
import { useTranslation } from 'react-i18next';

{/* Diccionario que traduce el valor del campo a texto legible para el usuario. Vive fuera del componente porque nunca cambia */}

const NOMBRES_CAMPO = {
    search: 'todos los campos',
    pais: 'País',
    ubicacion: 'Ubicación',
    descripcion: 'Descripción'
}

const Inicio = () => {
    const [filtro, setFiltro] = useState('');
    const [campoFiltro, setCampoFiltro] = useState('search')
    const {destinos, loading, cargandoMas, error, setPagina, tieneMas} = useDestinos(filtro, campoFiltro);
    const navigate = useNavigate();
    const {t} = useTranslation();
    
    //el useCallback evita que la funcion se recree en cada render, sino el useScrollInfinito se dispararia en loop
    const cargarMas = useCallback(() => {
        setPagina(prev => prev + 1)
    }, [setPagina])

    /* El observador se activa cuando: 1. tieneMas = true(hay mas pag) 2. !loading= no esta cargando (evita doble fetch) */
    const refObservador = useScrollInfinito(cargarMas, tieneMas && !loading && !cargandoMas)

    if (loading && destinos.length === 0 && !filtro){
        return <MensajesApp tipo="cargando" />;

    }

    if (error) return (
        <MensajesApp tipo="error" detalle={error}>
            <Boton onClick={() => window.location.reload()}>{t('detalles.reintentar')}</Boton>
        </MensajesApp>
    )

    {/* Mensaje vacio con el campo Nombres campo */}
    const mensajeVacio = filtro
        ? `${t('mensajes.sin_resultados')} ${NOMBRES_CAMPO[campoFiltro] || campoFiltro} para "${filtro}"`
        : t('mensajes.vacio')

    return (
        <div className='p-8'>
        <h1 className="text-3xl font-bold mb-6">{t('inicio.titulo')}</h1>
        <div className='mb-8 flex justify-center'>
            <Busqueda
                valor={filtro}
                onChange={setFiltro}
                campo={campoFiltro}
                onCampoChange={setCampoFiltro}
            />
        </div>

        <div className='flex flex-col lg:flex-row gap-8 items-start'>

            {/* COL IZQ: grilla de destinos */}
            <div className='flex-1'>
                {destinos.length === 0 && !loading && !cargandoMas ? (
                    <MensajesApp tipo="vacio" mensaje={mensajeVacio} />
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                        {destinos.map((destino) => (
                            <Tarjeta
                                key={destino.id}
                                destino={destino}
                                action={() => navigate(`/destino/${destino.id}`)}
                            />
                        ))}
                    </div>
                )}

                <div className="h-20 flex items-center justify-center">
                    {cargandoMas && (
                        <div className='flex items-center gap-3'>
                            <div className='animate-spin rounded-full h-8 w-8 border-4 border-orange-200 border-t-orange-500' />
                            <p className='text-orange-500 text-sm font-medium'>
                                {t('inicio.cargando_mas')}
                            </p>
                        </div>
                    )}
                    {!tieneMas && !cargandoMas && destinos.length > 0 && (
                        <p className='text-gray-400 text-sm'>
                            {t('inicio.fin_lista')}
                        </p>
                    )}
                </div>

                <div ref={refObservador} className="h-4" />
            </div>

            {/* COL DER: ranking sticky */}
            <Ranking />

        </div>
    </div>

    )
    
}

export default Inicio;