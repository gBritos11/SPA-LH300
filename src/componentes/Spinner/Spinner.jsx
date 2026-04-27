const Spinner = () => {
    return (
        <div className="flex flex-col items-center junstify-center min-h-64 gap-4">

            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500"/>
            <p className="text-orange-600 font-medium">Cargando destinos..</p>
        </div>
    )
}

export default Spinner