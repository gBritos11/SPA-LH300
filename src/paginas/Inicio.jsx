import useDestinos from "../hooks/useDestinos";


const Inicio = () => {
    const {destinos, loading, error} = useDestinos();

    console.log('destinos:', destinos);

    if (loading) return <p className="p-8">Cargando..</p>;
    if (error) return <p className="p-8 text-red-500">Error: {error} </p>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Pagina de Inicio</h1>
        </div>
    )
    
}

export default Inicio;